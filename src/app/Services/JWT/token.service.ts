import { Injectable } from '@angular/core';
import { authorities } from 'app/Modelos/JWT/authorities';


const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';
@Injectable({
    providedIn: "root"
})
export class TokenService {

    roles: Array<string> = [];
    constructor() { }
    auth: authorities[];
    public setToken(token: string): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string {
        return sessionStorage.getItem(TOKEN_KEY);
    }

    public setUserName(username: string): void {

        window.sessionStorage.removeItem(USERNAME_KEY);
        window.sessionStorage.setItem(USERNAME_KEY, username);
    }
    public getUserName(): string {
        return sessionStorage.getItem(USERNAME_KEY);
    }

    public setAuthorities(authorities: authorities[]): void {
        window.sessionStorage.removeItem(AUTHORITIES_KEY);
        window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
    }

    public getAuthorities(): authorities[] {
        // console.log(sessionStorage.getItem(AUTHORITIES_KEY));
        if (sessionStorage.getItem(AUTHORITIES_KEY)) {
           
            this.auth=JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY));
               
        }
        return this.auth;
    }

    public logOut(): void{
    window.sessionStorage.clear();
}
    
}