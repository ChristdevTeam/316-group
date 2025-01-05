# Base stage
FROM node:lts as base

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

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /home/node/app
# Make sure the necessary files are copied from the builder stage
COPY --from=builder /home/node/app/package*.json /home/node/app/pnpm-lock.yaml ./
# Copy production dependencies
RUN pnpm install --production

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/server.js"]
