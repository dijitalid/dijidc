import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root() {
    return { name: "dijidc-api", status: "running", endpoints: ["/health", "/redis/ping", "/jobs"] };
  }

  @Get("health")
  health() {
    return { ok: true };
  }

  @Get("version")
  version() {
    return { sha: process.env.VERCEL_GIT_COMMIT_SHA || "unknown" };
  }
}
