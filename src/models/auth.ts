export interface MAuth{
    id?:string;
    userName?:string;
    email?:string;
    role?:[string];
    jwToken?:string;
    refreshToken?:string;
}