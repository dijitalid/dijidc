import { Queue } from "bullmq";
import { Redis } from "ioredis";

let queue: Queue | null = null;

function getRedis() {
  const url = process.env.UPSTASH_REDIS_URL;
  if (!url) throw new Error("UPSTASH_REDIS_URL is missing");

  return new Redis(url, {
    lazyConnect: true,
    enableReadyCheck: false,
    maxRetriesPerRequest: 1,
    connectTimeout: 8000,
    retryStrategy: () => null,
  });
}

export function getDownloadQueue() {
  if (queue) return queue;
  queue = new Queue("downloads", { connection: getRedis() });
  return queue;
}
