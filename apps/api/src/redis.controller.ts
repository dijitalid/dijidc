import { Controller, Get } from "@nestjs/common";
import { getRedis } from "./redis";

function timeout<T>(ms: number, label: string) {
  return new Promise<T>((_, reject) =>
    setTimeout(() => reject(new Error(`TIMEOUT_${label}_${ms}ms`)), ms)
  );
}

@Controller("redis")
export class RedisController {
  @Get("ping")
  async ping() {
    const started = Date.now();
    try {
      const connection = getRedis();

      // Ensure connection is opened
      await Promise.race([connection.connect(), timeout<void>(6000, "CONNECT")]);

      const pong = await Promise.race([
        connection.ping(),
        timeout<string>(6000, "PING"),
      ]);

      return { ok: true, pong, ms: Date.now() - started };
    } catch (e: any) {
      return { ok: false, error: String(e?.message || e), ms: Date.now() - started };
    }
  }
}
