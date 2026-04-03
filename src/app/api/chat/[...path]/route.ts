/**
 * Catch-all proxy for /api/chat/* → Odoo /api/v1/chat/*
 *
 * Eliminates CORS issues by keeping the API key server-side.
 * Supports GET, POST, and SSE streaming.
 */

const ODOO_URL = process.env.ODOO_URL || process.env.NEXT_PUBLIC_ODOO_URL || "";
const API_KEY = process.env.ODOO_CHAT_API_KEY || process.env.NEXT_PUBLIC_ODOO_CHAT_API_KEY || "";

export const dynamic = "force-dynamic";

async function proxy(
  req: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const subpath = path.join("/");
  const target = `${ODOO_URL}/api/v1/chat/${subpath}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (API_KEY) headers["X-API-Key"] = API_KEY;

  // Forward visitor info headers if present
  const origin = req.headers.get("origin") || req.headers.get("referer") || "";
  if (origin) headers["Origin"] = origin;

  const isStream = subpath === "stream";
  const fetchOpts: RequestInit = {
    method: req.method,
    headers,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    fetchOpts.body = await req.text();
  }

  const res = await fetch(target, fetchOpts);

  // For SSE streaming, pipe the response body through
  if (isStream && res.body) {
    return new Response(res.body, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("Content-Type") || "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }

  // Normal JSON response
  const body = await res.text();
  return new Response(body, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}

export const GET = proxy;
export const POST = proxy;
