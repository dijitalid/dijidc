import { Queue } from "bullmq";
import { connection } from "./redis";

export const downloadQueue = new Queue("downloads", { connection });
