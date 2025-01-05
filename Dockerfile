# Base stage
FROM node:18.8-alpine as base

# Builder stage
FROM base as builder

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /home/node/app

# Copy package files and install dependencies
COPY package*.json pnpm-lock.yaml ./
COPY .env ./
RUN pnpm install

# Copy application code and build
COPY . .
RUN pnpm build

# Runtime stage
FROM base as runtime

# Set environment to production
ENV NODE_ENV=production

# Set working directory
WORKDIR /home/node/app

# Copy production dependencies
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install --production

# Copy built artifacts from builder stage
COPY --from=builder /home/node/app/dist ./dist

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/server.js"]
