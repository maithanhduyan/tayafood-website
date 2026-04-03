"use client";

// Chat widget for Taya Food website

import { useState, useRef, useEffect, useMemo } from "react";
import type { Dictionary } from "@/i18n";

const ODOO_URL = process.env.NEXT_PUBLIC_ODOO_URL || "";
const API_KEY = process.env.NEXT_PUBLIC_ODOO_CHAT_API_KEY || "";

/** Use same-origin proxy (/api/chat/*) to avoid CORS, fall back to direct Odoo URL */
const CHAT_API = ODOO_URL ? "/api/chat" : "";

function apiHeaders(): Record<string, string> {
  return { "Content-Type": "application/json" };
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

/** Suggested action buttons returned by the AI */
interface SendResponse {
  response: string;
  products?: ProductCard[];
  suggested_actions?: string[];
  visitor_name?: string;
  visitor_email?: string;
  visitor_phone?: string;
  lead_created?: boolean;
  coupon?: string;
  tokens_used?: number;
  response_time_ms?: number;
  error?: string;
}

interface ProductCard {
  id: number;
  name: string;
  price: string;
  image: string;
  url: string;
  saleable: boolean;
  availability_label: string;
}

/* ── Strip [ACTIONS] blocks from AI response ───────────────────────── */
const ACTIONS_RE = /\[ACTIONS\].*?\[\/?ACTIONS\]/gs;
const ACTIONS_INCOMPLETE_RE = /\[ACTIONS\][\s\S]*$/g;

function stripActions(text: string): string {
  return text.replace(ACTIONS_RE, "").replace(ACTIONS_INCOMPLETE_RE, "").trim();
}

function extractActions(text: string): string[] {
  const match = text.match(/\[ACTIONS\](.+?)\[\/?ACTIONS\]/s);
  if (!match) return [];
  try {
    const parsed = JSON.parse(match[1].trim());
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch { /* ignore parse errors */ }
  return [];
}

/* ── Lightweight markdown → HTML (no deps) ──────────────────────────── */
function renderMarkdown(md: string): string {
  let html = stripActions(md)
    // escape HTML entities
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // bold: **text** or __text__
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/__(.+?)__/g, "<strong>$1</strong>")
    // italic: *text* or _text_  (not inside bold)
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>")
    .replace(/(?<!_)_(?!_)(.+?)(?<!_)_(?!_)/g, "<em>$1</em>");

  // Split into lines for block-level processing
  const lines = html.split("\n");
  const result: string[] = [];
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();
    // unordered list: - item or * item (at start of line)
    if (/^[-*]\s+/.test(trimmed)) {
      if (!inList) { result.push('<ul class="ml-4 list-disc space-y-0.5">'); inList = true; }
      result.push(`<li>${trimmed.replace(/^[-*]\s+/, "")}</li>`);
    } else {
      if (inList) { result.push("</ul>"); inList = false; }
      if (trimmed === "") {
        result.push("<br/>");
      } else {
        result.push(`<p>${trimmed}</p>`);
      }
    }
  }
  if (inList) result.push("</ul>");

  return result.join("");
}

/* ── Visitor UID ─────────────────────────────────────────────────────── */
function getVisitorUid(): string {
  const stored = localStorage.getItem("taya_visitor_uid");
  if (stored) return stored;
  const uid = "v_" + Date.now().toString(36) + "_" + crypto.randomUUID().slice(0, 8);
  localStorage.setItem("taya_visitor_uid", uid);
  return uid;
}

/* ── Saved visitor context ──────────────────────────────────────────── */
interface VisitorContext {
  name?: string;
  email?: string;
  phone?: string;
}

function loadVisitorContext(): VisitorContext {
  try {
    const raw = localStorage.getItem("taya_visitor");
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveVisitorContext(ctx: VisitorContext) {
  const merged = { ...loadVisitorContext(), ...ctx };
  localStorage.setItem("taya_visitor", JSON.stringify(merged));
}

/* ── Component ──────────────────────────────────────────────────────── */
export default function ChatWidget({ t }: { t: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [suggestedActions, setSuggestedActions] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const visitorCtx = useMemo(() => loadVisitorContext(), []);
  const initRef = useRef(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  /* Init session when chat opens for the first time */
  const initSession = async () => {
    if (initRef.current) return;
    initRef.current = true;
    try {
      const res = await fetch(`${CHAT_API}/init`, {
        method: "POST",
        headers: apiHeaders(),
        body: JSON.stringify({
          visitor_uid: getVisitorUid(),
          page_url: window.location.href,
          session_id: sessionId,
        }),
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.session_id) setSessionId(data.session_id);
      if (data.visitor_name || data.visitor_email || data.visitor_phone) {
        saveVisitorContext({
          name: data.visitor_name || undefined,
          email: data.visitor_email || undefined,
          phone: data.visitor_phone || undefined,
        });
      }
      // Restore previous messages
      if (data.messages?.length) {
        const restored = data.messages.map((m: { role: string; content: string }) => ({
          role: m.role === "visitor" ? "user" : "assistant" as const,
          content: m.content,
        }));
        setMessages(restored);
        // Extract suggested actions from last assistant message
        const lastAssistant = [...restored].reverse().find((m: Message) => m.role === "assistant");
        if (lastAssistant) {
          const actions = extractActions(lastAssistant.content);
          if (actions.length) setSuggestedActions(actions);
        }
      }
    } catch {
      // silent — widget still works, will init on first send
    }
  };

  const handleOpen = () => {
    setOpen(true);
    initSession();
  };

  const sendMessage = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;

    setInput("");
    setSuggestedActions([]);
    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setLoading(true);

    try {
      // Ensure session exists
      let sid = sessionId;
      if (!sid) {
        const initRes = await fetch(`${CHAT_API}/init`, {
          method: "POST",
          headers: apiHeaders(),
          body: JSON.stringify({
            visitor_uid: getVisitorUid(),
            page_url: window.location.href,
          }),
        });
        if (initRes.ok) {
          const initData = await initRes.json();
          sid = initData.session_id;
          setSessionId(sid);
        }
      }

      if (!sid) throw new Error("No session");

      const res = await fetch(`${CHAT_API}/send`, {
        method: "POST",
        headers: apiHeaders(),
        body: JSON.stringify({
          session_id: sid,
          message: msg,
          visitor_uid: getVisitorUid(),
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data: SendResponse = await res.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: t.chat.errorReply },
        ]);
        return;
      }

      // Save visitor info returned by AI
      if (data.visitor_name || data.visitor_email || data.visitor_phone) {
        saveVisitorContext({
          name: data.visitor_name || undefined,
          email: data.visitor_email || undefined,
          phone: data.visitor_phone || undefined,
        });
      }

      // Set suggested actions
      if (data.suggested_actions?.length) {
        setSuggestedActions(data.suggested_actions);
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t.chat.errorNetwork },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FAB — left side */}
      <button
        onClick={() => (open ? setOpen(false) : handleOpen())}
        className={`fixed left-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#D71920] text-white shadow-lg transition-all duration-300 hover:bg-[#b9151b] hover:scale-110 ${open ? "rotate-0" : "animate-bounce-slow"}`}
        aria-label={t.chat.ariaLabel}
      >
        <svg
          className={`h-6 w-6 transition-transform duration-300 ${open ? "rotate-90 scale-110" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          )}
        </svg>
      </button>

      {/* Chat panel — left side with slide-up animation */}
      <div
        className={`fixed left-5 bottom-22 z-50 flex h-[28rem] w-[calc(100vw-2.5rem)] max-w-96 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 origin-bottom-left ${
          open
            ? "scale-100 opacity-100 translate-y-0"
            : "pointer-events-none scale-95 opacity-0 translate-y-4"
        }`}
      >
        {/* Header */}
        <div className="bg-[#D71920] px-4 py-3 text-white">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-green-400" />
            <p className="text-sm font-semibold">{t.chat.title}</p>
          </div>
          <p className="text-xs text-red-200">{t.chat.subtitle}</p>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.length === 0 && (
            <p className="text-center text-xs text-gray-400">
              {visitorCtx.name
                ? t.chat.greeting.replace("!", `, ${visitorCtx.name}!`)
                : t.chat.greeting}
            </p>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                m.role === "user"
                  ? "ml-auto bg-[#D71920] text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {m.role === "assistant" ? (
                <div
                  className="chat-md space-y-1 [&_strong]:font-semibold [&_em]:italic [&_ul]:list-disc [&_ul]:pl-4 [&_li]:text-sm [&_p]:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }}
                />
              ) : (
                m.content
              )}
            </div>
          ))}
          {loading && (
            <div className="max-w-[80%] rounded-xl bg-gray-100 px-3 py-2 text-sm text-gray-500">
              <span className="inline-flex gap-1">
                <span className="animate-bounce [animation-delay:0ms]">.</span>
                <span className="animate-bounce [animation-delay:150ms]">.</span>
                <span className="animate-bounce [animation-delay:300ms]">.</span>
              </span>
            </div>
          )}
        </div>

        {/* Suggested actions */}
        {suggestedActions.length > 0 && !loading && (
          <div className="flex flex-wrap gap-1.5 border-t px-3 py-2">
            {suggestedActions.map((action, i) => (
              <button
                key={i}
                onClick={() => sendMessage(action)}
                className="rounded-full border border-[#D71920] px-3 py-1 text-xs text-[#D71920] transition hover:bg-[#D71920] hover:text-white"
              >
                {action}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex border-t p-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.chat.placeholder}
            maxLength={2000}
            className="flex-1 rounded-lg bg-gray-50 px-3 py-2 text-sm outline-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="ml-2 rounded-lg bg-[#D71920] px-3 py-2 text-sm text-white transition hover:bg-[#b9151b] disabled:opacity-50"
          >
            {t.chat.send}
          </button>
        </form>
      </div>
    </>
  );
}
