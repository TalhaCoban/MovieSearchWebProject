import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserSubject } from "../services/user.subject";


export const AuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const router = inject(Router);
    const userService = inject(UserSubject);

    if (!!userService.user()) {
        return true;
    } else {
        return router.navigate(['/auth/login'])
    }
};