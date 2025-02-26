# Use Node.js 18 Alpine as builder
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package.json and install dependencies first (for better caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the production-ready React app
RUN npm run build:prod

# Use a lightweight NGINX image for serving static files
FROM nginx:stable-alpine AS runner
WORKDIR /usr/share/nginx/html

# Remove default NGINX static files
RUN rm -rf ./*

# Copy built React files from the builder stage
COPY --from=builder /app/build .

# Expose port 80 for HTTP server
EXPOSE 3000

# No need for CMD, as NGINX runs by default