import { Body, Controller, Post } from "@nestjs/common";
import { downloadQueue } from "./queue";
import { db } from "./db";

@Controller("jobs")
export class JobsController {
  @Post()
  async create(@Body() body: {
    userId: string;
    url: string;
    format: string;
    resolution?: number;
    platform?: string;
  }) {
    // 1) DB’ye job kaydı aç
    const pg = await db();
    const source_platform = body.platform || "unknown";

    const inserted = await pg.query(
      `insert into public.jobs
        (user_id, source_platform, source_url, requested_format, requested_resolution, status, progress)
       values
        ($1, $2, $3, $4, $5, 'queued', 0)
       returning id`,
      [body.userId, source_platform, body.url, body.format, body.resolution ?? null]
    );

    const jobDbId = inserted.rows[0].id as string;

    // 2) Redis kuyruğa job bırak
    const job = await downloadQueue.add("download", {
      ...body,
      jobDbId
    });

    // 3) Kullanıcıya her ikisini döndür
    return { jobId: job.id, jobDbId };
  }
}
