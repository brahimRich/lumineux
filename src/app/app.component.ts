import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { user,UserService } from './users';
import { userTech,UserTechService } from './userTech';
import { CartService } from './cart.service';
import { SessionStorageService } from 'ngx-webstorage';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { Router } from '@angular/router';

import { environment } from "../environments/environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'projet_Lumineux';
  admin : number =0;
  tech : number =0;
  constructor(private userService: UserService,private cartService: CartService,private sessionStorage: SessionStorageService,private router: Router){
    //this.message='ghn'
  }
  user = this.sessionStorage.retrieve('user');
  userTech = this.sessionStorage.retrieve('userTech');


  ngOnInit(): void {
    console.log("zalat 11")
    const currentUrl = this.router.url;
    if(currentUrl=='/login'){
    this.router.navigateByUrl('/login').then(() => {
      this.admin=10;
    });
  }

  if(currentUrl=='/LoginTech' ){
    this.router.navigateByUrl('/LoginTech').then(() => {
      this.admin=0;
    });
  }
  
}


}



