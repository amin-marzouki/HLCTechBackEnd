import {CanActivateFn, Router} from '@angular/router';
import {TokenService} from "../fn/auth/TokenService";
import {inject} from "@angular/core";
import {RedirectService} from "../redirection";

export const authGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (tokenService.isTokenNotValid()) {
    router.navigate(['login']);
    return false
  }
  return true;
};
