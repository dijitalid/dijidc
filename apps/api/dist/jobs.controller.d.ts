export declare class JobsController {
    create(body: {
        userId: string;
        url: string;
        format: string;
        resolution?: number;
    }): Promise<{
        jobId: string | undefined;
    }>;
}
