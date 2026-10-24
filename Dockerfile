#syntax=docker/dockerfile:1

# Stage 1: Base
FROM node:24-alpine AS base
WORKDIR /app

# Stage 2: Install all dependencies (for build)
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Stage 3: Build application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build

# Stage 4: Production dependencies only
FROM base AS prod-deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Stage 5: Final runtime image
FROM base AS runner
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=4321

USER node

COPY --from=prod-deps --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --chown=node:node package.json ./

EXPOSE 4321

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:4321/ || exit 1

CMD ["node", "./dist/server/entry.mjs"]
