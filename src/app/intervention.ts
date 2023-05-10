import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { PointLumineux } from './products';
import { techniciennes } from './techniciennes';

import { environment } from "./../environments/environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { NotificationService,Notification } from './../app/notification/notification';
import { Message } from '@stomp/stompjs';
import { SessionStorageService } from 'ngx-webstorage';
import { NotificationComponent } from './notification/notification.component';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};  

export interface Intervention {
    id_Intervention: number;
    type : string,
    intitule_Intervention : string;
    dure_Intervention : number;
    etat_intervention : number;
    date_intervention : Date;
    techniciennes : techniciennes[];
    pointLumineuxList : PointLumineux[];
}


@Injectable({
    providedIn: 'root'
})

export class InterventionService {
    constructor(private http: HttpClient) {}

    private getURL = 'http://localhost:4200/api/intervention/getAll';
    private deleteURL= 'http://localhost:4200/api/intervention/delete';
    private AddURL= 'http://localhost:4200/api/intervention/add';
    private UpdateURL= 'http://localhost:4200/api/intervention/update';
    private AddNotiURL= 'http://localhost:4200/api/notification/data';
    private currentToken = "eXk5pREGuloIcopRIS6kCn:APA91bEVoRb4Mci5C6jv7hiHxA7toDScbZAwUJwcAHp3oB1Bra8jpEQwHSVxqNLyPuCLeFjkYAV-9KHlckbNXIk6hx4r6PCpOox5i94Et57iJAL2C6aN5IdQx9KvCXB8x-wGZDKKaP8Z";
    
    Notification : Notification ={
      topic: "Topic",
      title: "zaaaab fin",
      message: "zaaaaaaaaaaaaaaaaaaaaab fin",
      createdAt: new Date(),
      token: "",
      technicienne: {
        id : 0
      },
      intervention :{
        id_Intervention : 0,
        type : '',
        intitule_Intervention : '',
        dure_Intervention : 0,
        etat_intervention : 0,
        date_intervention : new Date(2023, 3, 30),
        techniciennes : [
          
        ],
        pointLumineuxList : [
          
        ]
    }
  }



      getAllIntervention(): Observable<any> {
        return this.http.get<any>(this.getURL);
      } 

     getAllInterventions(idTech: number): Observable<any> {
  return this.getAllIntervention().pipe(
    map(Interventions => Interventions.filter((intervention: Intervention) => intervention.techniciennes.some(tech => tech.id === idTech)))
  );
}

      
      deleteIntervention(id: number) {
        const url = `${this.deleteURL}/${id}`;
        return this.http.delete(url); 
      }

      requestPermission(Intervention: Intervention) {
        const messaging = getMessaging();
        getToken(messaging, 
         { vapidKey: environment.firebase.vapidKey}).then(
           (currentToken) => {
             if (currentToken) {
               console.log("Hurraaa!!! we got the token.....");
               console.log(currentToken);
               this.currentToken=currentToken;
               this.Notification.intervention=Intervention;
               this.Notification.token="eXk5pREGuloIcopRIS6kCn:APA91bEVoRb4Mci5C6jv7hiHxA7toDScbZAwUJwcAHp3oB1Bra8jpEQwHSVxqNLyPuCLeFjkYAV-9KHlckbNXIk6hx4r6PCpOox5i94Et57iJAL2C6aN5IdQx9KvCXB8x-wGZDKKaP8Z";
             } else {
               console.log('No registration token available. Request permission to generate one.');
             }
         }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        });
      }
    
       AddIntervention(Intervention: Intervention) {
        this.requestPermission(Intervention);
         let InterventionJson = JSON.stringify(Intervention);
        console.log('ajout de j ********************'+InterventionJson);
         this.http.post<Intervention>(this.AddURL, InterventionJson ,httpOptions)
        .subscribe(
          (response) => {
            console.log('Réponse de la requête POST intervention:', response);

            for (let i = 0; i < Intervention.techniciennes.length; i++) {
              this.Notification.technicienne.id=Intervention.techniciennes[i].id;
              let NotificationJson = JSON.stringify(this.Notification);
              console.log('notification ******************** '+NotificationJson);
              this.http.post<Notification>(this.AddNotiURL, NotificationJson ,httpOptions)
              .subscribe(
                (response) => {
                  console.log('Réponse de la requête POST notification :', response);
                },
                (error) => {
                  console.error('Erreur lors de la requête POST :', error);
                }
              );
            }  
          }
          ,
          (error) => {
            console.error('Erreur lors de la requête POST :', error);
          }
        );
   

      }
  
      
      FindById(id: number): Observable<Intervention> {  
        return this.getAllIntervention().pipe(
          map(Interventions => Interventions.find((Intervention: Intervention) => Intervention.id_Intervention === id))
        );
      }

      updateArmoire(Intervention: Intervention){
        const url = `${this.UpdateURL}/${Intervention.id_Intervention}`;
         this.http.put<Intervention>(url, Intervention)
         .subscribe(
          (response) => {
            console.log('Réponse de la requête put :', response);
          },
          (error) => {
            console.error('Erreur lors de la requête put :', error);
          }
        );
      }


      

}





