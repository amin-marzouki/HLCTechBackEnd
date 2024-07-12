import { Component } from '@angular/core';
import {AuthenticationService} from "../../services/auth/authentication.service";
import {Router} from "@angular/router";
import {AuthenticationRequest} from "../../models/auth/AuthenticateRequest";
import {TokenService} from "../../services/fn/auth/TokenService";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {
  }

  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
        this.router.navigate(['Formation'])
        //this.redirectUser(this.tokenService.userRoles)

      },
      error: (err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.errorMsg);
        }
      }
    });
  }
redirectUser(role:String[]):void{
  if (role.includes('ROLE_ADMIN') ) {
    this.router.navigate(['/admin-dashboard']);
  } else if (role.includes('USER')) {
    this.router.navigate(['Formation']);
  } else {
    this.router.navigate(['Formation']);
  }
}

  register() {
    this.router.navigate(['register']);
  }
}
