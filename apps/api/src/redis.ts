import { Redis } from "ioredis";

export const connection = new Redis(process.env.UPSTASH_REDIS_URL!, {
  tls: {},
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});
