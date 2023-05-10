
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { techniciennes,techniciennesService} from '../techniciennes';
import { ActivatedRoute } from '@angular/router';

import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { SessionStorageService } from 'ngx-webstorage';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { Injectable } from '@angular/core';

import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

/*const socket = new SockJS('ws://localhost:8080/my-websocket');
const stompClient = Stomp.over(socket);

stompClient.connect({}, (frame) => {
  console.log('Connected: ' + frame);

  stompClient.subscribe('/topic/notification', (notification) => {
    console.log('Received notification: ' + notification.body);
    // Traitez la notification ici, par exemple en affichant une alerte
  });
}, (error) => {
  console.log('Error during connection to WebSocket server: ' + error);
});
*/


















@Component({
  selector: 'app-add-techniciennes',
  templateUrl: './add-techniciennes.component.html',
  styleUrls: ['./add-techniciennes.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class AddTechniciennesComponent implements OnInit {
  Mofifer : boolean = false;
  boutonDesactive: boolean = true;
  errorMessageMarque='';
  public message: any;

  private socket$: WebSocketSubject<string>;


  techniciennes : techniciennes = 
    {
      id: 0,
      nom : '',
      prenom : '' ,
      cin : '',
    }

  ngOnInit() {
   /* const routeParams = this.route.snapshot.paramMap;
    const technicienne = Number(routeParams.get('technicienne'));
    if(technicienne){
      this.Mofifer=true;
      this.boutonDesactive = false;
    this.techniciennesService.FindtechniciennesById(technicienne).subscribe(
      technicienne => {
        this.techniciennes = technicienne;
      },
      error => {
        console.error(error);
      }
    );
    }*/
    console.log("slm ");

    // Initialize the WebSocket connection
    this.socket$ = WebSocketSubject.create('ws://localhost:8090/stomp-endpoint');

    // Subscribe to the message event
    this.socket$.subscribe(
      (msg) => {
        this.message = msg;
        console.log("message "+msg)
      },
      (err) => {
        console.log("errrrreeeur "+ err);
      },
      () => {
        console.log('WebSocket connection closed');
      }
    );
  }
  
 
    constructor(private techniciennesService: techniciennesService,private route: ActivatedRoute,private formBuilder: FormBuilder,private cartService: CartService,private sessionStorage: SessionStorageService,private router: Router,private location: Location) { 
      this.socket$ = new WebSocketSubject('ws://localhost:8090/stomp-endpoint');

    this.socket$.subscribe(
      (message) => console.log('Received message: ' + message),
      (error) => console.error(error),
      () => console.warn('Completed!')
    );
    }

    sendMessage() {
      this.socket$.next('Hello, World!');
    }

    loadData() {
      const techniciennes = this.sessionStorage.retrieve('techniciennes');
    }
    
    onSubmit() {
          this.sessionStorage.store('techniciennes', this.techniciennes);
          this.loadData();
          const currentUrl = this.router.url;
          if(currentUrl=='/techniciennes' || currentUrl==''){
            this.router.navigateByUrl('/Home', { skipLocationChange: false }).then(() => {
              window.location.reload(); 
            });
          }

          this.techniciennesService.Addtechniciennes(this.techniciennes);
    }

    submitProduct(){
      this.techniciennesService.Addtechniciennes(this.techniciennes);
    }

    updatePoint(){
      this.techniciennesService.updatetechniciennes(this.techniciennes);
    }


    updateErrorMessagee() {
      if (this.errorMessageMarque=='') {
        console.log('erreur vide')
        this.boutonDesactive = false; 
      } else {
        this.boutonDesactive = true; 
      }
    }
}
 