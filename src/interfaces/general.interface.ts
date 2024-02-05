export interface generalResponsePromise {
    data: any;
    message: string;
    toast: boolean;
}

export interface returnData {
    data: any;
    message: string;
    toast: boolean;
    values: generalResponsePromise;
}