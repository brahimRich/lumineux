import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { userTech,UserTechService } from '../userTech'; 
import { CartService } from '../cart.service';
import { SessionStorageService } from 'ngx-webstorage';
import { Location } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-tech',
  templateUrl: './login-tech.component.html',
  styleUrls: ['./login-tech.component.css']
})
export class LoginTechComponent implements OnInit {

  constructor(private UserTechService: UserTechService,private cartService: CartService,private sessionStorage: SessionStorageService,private router: Router,private location: Location){}
  email: string='';
  password: string='';
  errorMessageN='';
  errorMessageLo='';
  errorLogin='';


  userTech: userTech = {
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
  }

  
  onSubmit() {
        this.sessionStorage.store('userTech', this.userTech);
        this.loadData();
        const currentUrl = this.router.url;
        if(currentUrl=='/' || currentUrl==''){
          this.router.navigateByUrl('/Home', { skipLocationChange: false }).then(() => {
            window.location.reload(); 
          });
        }
  }

  submitProduct() {
    //this.productAdded.emit(newProduct);
    this.UserTechService.AddAdminTechnicien(this.userTech);
    this.onSubmit();
  }
  
  updateErrorMessagee() {
    console.log("rrrrr")
    if(this.email=='') this.errorMessageN='Le champ email est obligatoire';
    else this.errorMessageN='';
    if(this.password=='') this.errorMessageLo='Le champ Password est obligatoire';
    else this.errorMessageLo='';
  }
 
}
   