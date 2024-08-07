import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../services/fn/auth/TokenService";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  constructor(private tokenServ:TokenService){}
  isManager=false;
  ngOnInit(){
    this.isManager=this.tokenServ.userRoles.includes('Manager');
  }
}
