import { Body, Controller, Post } from "@nestjs/common";
import { downloadQueue } from "./queue";

@Controller("jobs")
export class JobsController {
  @Post()
  async create(@Body() body: {
    userId: string;
    url: string;
    format: string;
    resolution?: number;
  }) {
    const job = await downloadQueue.add("download", body);
    return { jobId: job.id };
  }
}
