import { Injectable } from "@angular/core";
import { ActivatedRoute, RouterStateSnapshot, Router, CanActivate, ActivatedRouteSnapshot, UrlTree } from '@angular/router'
import { TokenService } from "app/Services/JWT/token.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProdGuardService implements CanActivate{
    realRol: string;

    constructor(private tokenService: TokenService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const expectedRol =route.data.expectedRol;
        const roles = this.tokenService.getAuthorities();
        this.realRol='user';

        // roles.forEach(rol => {
        //     if(rol==='ROLE_ADMIN'){
        //         this.realRol='admin';
        //     }
        //     });
        //     if(!this.tokenService.getToken() || expectedRol.indexOf(this.realRol)=== -1){
        //         this.router.navigate(['/login']);
                
        //     }
            return true;
    }
}