import { Redis } from "ioredis";

let connection: Redis | null = null;

export function getRedis() {
  if (connection) return connection;

  const url = process.env.UPSTASH_REDIS_URL;
  if (!url) {
    throw new Error("UPSTASH_REDIS_URL is missing (set it in .env.local for local, and Vercel env for production)");
    }

  // Upstash + serverless safe config
  connection = new Redis(url, {
    lazyConnect: true,
    enableReadyCheck: false,
    maxRetriesPerRequest: 1,
    connectTimeout: 8000,
    retryStrategy: () => null, // no infinite retries
  });

  return connection;
}
