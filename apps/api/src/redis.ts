import { Redis } from "ioredis";

const url = process.env.UPSTASH_REDIS_URL;

if (!url) {
  // Hızlı teşhis için: env yoksa zaten patlayalım
  throw new Error("UPSTASH_REDIS_URL is missing");
}

export const connection = new Redis(url, {
  // Fail-fast (serverless için önemli)
  connectTimeout: 5000,
  maxRetriesPerRequest: 1,
  enableReadyCheck: false,

  // TLS: Upstash için çoğu zaman gerekmez (rediss:// zaten TLS)
  // Eğer redis:// + --tls mantığında gidiyorsan, aşağıyı aç:
  // tls: {},

  retryStrategy: () => null, // sonsuz retry yok
});
