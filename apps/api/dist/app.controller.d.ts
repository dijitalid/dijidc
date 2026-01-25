export declare class AppController {
    root(): {
        name: string;
        status: string;
        endpoints: string[];
    };
    health(): {
        ok: boolean;
    };
}
