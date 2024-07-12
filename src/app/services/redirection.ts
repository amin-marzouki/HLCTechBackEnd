import {Router} from "@angular/router";
import {TokenService} from "./fn/auth/TokenService";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(private tokenservice: TokenService, private router: Router) {}

  redirectBasedOnRole(): void {
    const role = this.tokenservice.userRoles;
console.log("pffffffffffff")
    if (role.includes('USER')) {
      this.router.navigate(['Formation']);
    } else if (role.includes('ADMIN')) {
      this.router.navigate(['/former']);
    } else if (role.includes('MANAGER')) {
      this.router.navigate(['/manager']);
    } else {
      this.router.navigate(['Formation']);
    }
  }

}
