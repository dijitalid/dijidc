import "dotenv/config";
import { Worker } from "bullmq";
import { Redis } from "ioredis";
import { Client } from "pg";

const redisUrl = process.env.UPSTASH_REDIS_URL;
if (!redisUrl) throw new Error("UPSTASH_REDIS_URL missing");

const connection = new Redis(redisUrl, {
  lazyConnect: true,
  enableReadyCheck: false,
  maxRetriesPerRequest: 1,
  connectTimeout: 8000,
  retryStrategy: () => null,
});

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) throw new Error("DATABASE_URL missing");

const pg = new Client({ connectionString: dbUrl });

async function main() {
  await pg.connect();
  console.log("✅ worker connected to Postgres");

  const worker = new Worker(
    "downloads",
    async (job) => {
      console.log("🧩 job received:", job.id, job.data);

      // DB: status=processing
      await pg.query(
        `update public.jobs set status='processing', progress=10, updated_at=now() where id=$1`,
        [job.data.jobDbId || null]
      ).catch(() => {});

      // ŞİMDİLİK sadece simüle
      await new Promise((r) => setTimeout(r, 1500));

      console.log("✅ job done:", job.id);

      // DB: status=done
      await pg.query(
        `update public.jobs set status='done', progress=100, updated_at=now() where id=$1`,
        [job.data.jobDbId || null]
      ).catch(() => {});

      return { ok: true };
    },
    { connection }
  );

  worker.on("failed", (job, err) => {
    console.error("❌ job failed:", job?.id, err?.message);
  });

  console.log("🚀 worker listening on queue: downloads");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
