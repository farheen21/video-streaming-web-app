import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'video-streaming-web-app-ui';
  
  
  constructor (private oidcSecurityService : OidcSecurityService) {

  }
  
  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
      console.log('app is authenticated' , isAuthenticated);
    });
  }

}
