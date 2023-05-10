import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Intervention} from '../../app/intervention';
import { map } from 'rxjs/operators';


export interface TechnNotifier {
  id : number
}

export interface InterNotifier {
  id : number,
  Date_intervention : Date,
  type : String ,
  intitule_Intervention : String
}

export interface Notification {
    topic: string;
    title: string;
    message: string;
    createdAt: Date;
    token: string;
    technicienne:TechnNotifier;
    intervention:Intervention;
  }
  

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private getUrl = 'http://localhost:4200/api/notification/getAll'; 

  constructor(private http: HttpClient) { }

  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.getUrl);
  }

  parseDate(dateString: string): Date {
    return new Date(dateString);
  }

  getNotificationByDate(date: Date): Observable<any> {
    const dateObj = new Date(date);
    console.log("get time "+dateObj.getTime())
    return this.getAllNotifications().pipe(
      map(Notifications => Notifications.find((Notification: Notification) =>
      Notification.createdAt.getTime()==date.getTime()
  ))
  );
  }
  
  


 /* this.getAllNotifications().subscribe(
    notifications => {
      let datae = JSON.stringify(notifications[2]);
      console.log("intervention by date *****"+datae)
    },
    error => {
      console.log('Error retrieving notifications:', error);
    }
  );*/
}
