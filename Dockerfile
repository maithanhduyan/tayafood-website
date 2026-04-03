# ── Build stage ──────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# .env.production is read by Next.js at build time (see .dockerignore allows it)
# Railway also passes service variables as Docker build args
ARG NEXT_PUBLIC_ODOO_URL=http://localhost:8069
ARG NEXT_PUBLIC_ODOO_CHAT_API_KEY=
ENV NEXT_PUBLIC_ODOO_URL=$NEXT_PUBLIC_ODOO_URL
ENV NEXT_PUBLIC_ODOO_CHAT_API_KEY=$NEXT_PUBLIC_ODOO_CHAT_API_KEY

RUN npm run build

# ── Production stage ────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Server-side env vars for API proxy (not baked into client bundle)
ARG NEXT_PUBLIC_ODOO_URL=http://localhost:8069
ARG NEXT_PUBLIC_ODOO_CHAT_API_KEY=
ENV ODOO_URL=$NEXT_PUBLIC_ODOO_URL
ENV ODOO_CHAT_API_KEY=$NEXT_PUBLIC_ODOO_CHAT_API_KEY
# Keep NEXT_PUBLIC_ vars for backward compatibility
ENV NEXT_PUBLIC_ODOO_URL=$NEXT_PUBLIC_ODOO_URL
ENV NEXT_PUBLIC_ODOO_CHAT_API_KEY=$NEXT_PUBLIC_ODOO_CHAT_API_KEY

RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# Copy standalone output
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
