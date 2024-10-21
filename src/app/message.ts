import { ServerResponse } from "http";

export const showResponse = (res: ServerResponse, code: number, message: string): void => {
    res.writeHead(code);
    res.end(JSON.stringify({code: code, message: message}));
}
