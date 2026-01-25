"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadQueue = void 0;
const bullmq_1 = require("bullmq");
const redis_1 = require("./redis");
exports.downloadQueue = new bullmq_1.Queue("downloads", { connection: redis_1.connection });
//# sourceMappingURL=queue.js.map