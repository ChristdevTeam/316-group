# Base stage
FROM node:lts-alpine as base

# Set working directory
WORKDIR /app

# Install pnpm globally (using corepack is more efficient)
RUN corepack enable

# Builder stage
FROM base as builder

# Copy package files
COPY package*.json pnpm-lock.yaml ./

# Install dependencies (using --frozen-lockfile is crucial)
RUN pnpm install --frozen-lockfile

# Copy application code
COPY . .

# Build the application
RUN pnpm build

# Runtime stage
FROM base as runtime

# Set environment to production
ENV NODE_ENV=production

# Copy built application from builder stage
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/.env /app/.env

# Expose the application port (this is still needed internally)
EXPOSE 3000

# Start the application
CMD ["node", "dist/server.js"]