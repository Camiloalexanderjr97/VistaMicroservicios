import { authorities } from "./authorities";

export class JwtDTO{
    token: string;
    type: string;
    username: string;
    authorities: authorities[];
}