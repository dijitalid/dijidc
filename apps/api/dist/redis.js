"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const ioredis_1 = require("ioredis");
const url = process.env.UPSTASH_REDIS_URL;
if (!url) {
    throw new Error("UPSTASH_REDIS_URL is missing");
}
exports.connection = new ioredis_1.Redis(url, {
    connectTimeout: 5000,
    maxRetriesPerRequest: 1,
    enableReadyCheck: false,
    retryStrategy: () => null,
});
//# sourceMappingURL=redis.js.map