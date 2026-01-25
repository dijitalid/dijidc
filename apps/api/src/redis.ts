import { Redis } from "ioredis";

const url = process.env.UPSTASH_REDIS_URL;
if (!url) throw new Error("UPSTASH_REDIS_URL is missing");

// Upstash + serverless safe config
export const connection = new Redis(url, {
  lazyConnect: true,
  enableReadyCheck: false,
  maxRetriesPerRequest: 1,
  connectTimeout: 8000,
  retryStrategy: () => null, // no infinite retries
});
