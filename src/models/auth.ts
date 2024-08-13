export interface MAuth {
    id?: string;
    userName?: string;
    email?: string;
    roles?: [string];
    jwToken?: string;
    refreshToken?: string;
}
