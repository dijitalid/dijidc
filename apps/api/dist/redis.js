"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const ioredis_1 = require("ioredis");
exports.connection = new ioredis_1.Redis(process.env.UPSTASH_REDIS_REST_URL, {
    password: process.env.UPSTASH_REDIS_REST_TOKEN,
    tls: {}
});
//# sourceMappingURL=redis.js.map