# Use the official Node.js 14 image as the base image
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
# Install dependencies
RUN npm install && npm run build


# Use the official Node.js 14 image as the base image
FROM node:18-alpine AS runner
WORKDIR /app
COPY . .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./package*.json

EXPOSE 3000
CMD ["npm","start"]