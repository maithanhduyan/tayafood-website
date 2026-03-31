"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import type { Dictionary } from "@/i18n";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface Message {
  role: "user" | "assistant";
  content: string;
}

/* ── Lightweight markdown → HTML (no deps) ──────────────────────────── */
function renderMarkdown(md: string): string {
  let html = md
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

/* ── Fingerprint ────────────────────────────────────────────────────── */
function generateFingerprint(): string {
  const stored = localStorage.getItem("taya_fp");
  if (stored) return stored;
  const fp = crypto.randomUUID();
  localStorage.setItem("taya_fp", fp);
  return fp;
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const visitorCtx = useMemo(() => loadVisitorContext(), []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      const ctx = loadVisitorContext();
      const res = await fetch(`${API_URL}/api/v1/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fingerprint: generateFingerprint(),
          message: text,
          session_id: sessionId,
          visitor_name: ctx.name || undefined,
          visitor_email: ctx.email || undefined,
          visitor_phone: ctx.phone || undefined,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      if (data.session_id) setSessionId(data.session_id);

      // Save any visitor info returned by the API (AI-extracted)
      if (data.visitor_name || data.visitor_email || data.visitor_phone) {
        saveVisitorContext({
          name: data.visitor_name || undefined,
          email: data.visitor_email || undefined,
          phone: data.visitor_phone || undefined,
        });
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.error
            ? (data.rate_limited ? t.chat.errorRate : t.chat.errorReply)
            : data.message,
        },
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
        onClick={() => setOpen(!open)}
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
