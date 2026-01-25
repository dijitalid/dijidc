FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx tsc index.ts --outDir dist
CMD ["node", "dist/index.js"]
