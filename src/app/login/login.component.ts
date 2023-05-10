import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { user,UserService } from '../users';
import { CartService } from '../cart.service';
import { SessionStorageService } from 'ngx-webstorage';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private userService: UserService,private cartService: CartService,private sessionStorage: SessionStorageService,private router: Router,private location: Location){}
  email: string='';
  password: string='';
  errorMessageN='';
  errorMessageLo='';
  errorLogin='';
  user: user = {
    id: 0,
    nom: '',
    prenom: '',
    email: '',
    password: ''
  };

  ngOnInit() {
   
  }

  loadData() {
    const user = this.sessionStorage.retrieve('user');
    console.log("load data ********************************************* "+user.prenom);
  }
 
  onSubmit() {
    console.log('ggggggggggggggggggggggggggggggggggggg')
    const email = this.email;
    const password = this.password;
    if(this.sessionStorage.retrieve('user')!=null)this.router.navigateByUrl('/Home', { skipLocationChange: false }).then(() => {window.location.reload();});
    if(this.email!='' && this.password!=''){
    this.userService.FindAdmin(this.email, this.password).subscribe((user) => {
      this.user = user;
      if(typeof user == 'undefined'){
        this.errorLogin='email ou password est incorrecte !!!';
      }else{
        this.errorLogin='';
        this.sessionStorage.store('user', this.user);
        this.loadData();
        const currentUrl = this.router.url;
        if(currentUrl=='/' || currentUrl==''){
          this.router.navigateByUrl('/Home', { skipLocationChange: false }).then(() => {
            window.location.reload(); 
          });
        }else{
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigateByUrl(currentUrl);
        });
        window.location.reload();
      }
      } 
    }, (error) => {
      console.error("Erroroooooooooooooooooooooooooooooooooooooooooooooooooooooo: ", error);
    });
  }else{
    this.updateErrorMessagee();
  }
  }
  
  updateErrorMessagee() {
    console.log("rrrrr")
    if(this.email=='') this.errorMessageN='Le champ email est obligatoire';
    else this.errorMessageN='';
    if(this.password=='') this.errorMessageLo='Le champ Password est obligatoire';
    else this.errorMessageLo='';
  }
  

  /*login(){
    window.alert("connexion "+this.user.email)
    this.userService.FindAdmin(this.user.email, this.user.password).subscribe((user) => {
      this.user = user;
    }, (error) => {
      console.error("Error: ", error);
      // Traitez l'erreur ici, par exemple en affichant un message d'erreur à l'utilisateur
    });
    
    console.log('gffffrf '+this.user.prenom)
    this.addToCart(this.user);
    }*/
    
}
