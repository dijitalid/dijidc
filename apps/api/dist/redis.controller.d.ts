export declare class RedisController {
    ping(): Promise<{
        ok: boolean;
        pong: string;
        ms: number;
        error?: undefined;
    } | {
        ok: boolean;
        error: string;
        ms: number;
        pong?: undefined;
    }>;
}
