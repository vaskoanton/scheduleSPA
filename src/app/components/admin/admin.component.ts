import { Component, OnInit } from '@angular/core';
import { Routes } from '../../constants/routes';
import { AuthService } from '../../services/auth.service';
import { Jwt } from '../../models/jwt';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {
  userName: string;
  userLabel: string;
  routes: any;
  activeRoute: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute) {
      
    let token: Jwt = authService.decodeToken();
    this.userName = token.username;
    this.userLabel = this.getUserLabel(token.username);
    this.routes = Routes;
  }

  ngOnInit() {
    var childRoute = this.route.snapshot.children[0].url[0].path;
    this.setActiveRoute(childRoute);
  }

  private getUserLabel(username: string): string{
    let userName = username.split(' ');
    return userName[0].charAt(0) + userName[1].charAt(0); 
  }

  getClass(route:string): string{
    return this.activeRoute == route ? 'active': '';
  }
  setActiveRoute(route:string):void{
    this.activeRoute = route;
  }
}
