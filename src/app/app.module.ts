import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { SessionStorageService } from 'ngx-webstorage';

import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddPointLumineuxComponent } from './add-point-lumineux/add-point-lumineux.component';
import { AddArmoireComponent } from './add-armoire/add-armoire.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
//import { MessagingService } from './service/messaging.service';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { environment } from "../environments/environment";
import { initializeApp } from "firebase/app";
initializeApp(environment.firebase);

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddDepartComponent } from './add-depart/add-depart.component';
import { AddInterventionComponent } from './add-intervention/add-intervention.component';
import { AddTechniciennesComponent } from './add-techniciennes/add-techniciennes.component';
import { DetailTechComponent } from './detail-tech/detail-tech.component';
import { ListeArmoireComponent } from './liste-armoire/liste-armoire.component';
import { LoginTechComponent } from './login-tech/login-tech.component';
import { NgxWebsocketModule } from 'ngx-websocket';
import { NotificationComponent } from './notification/notification.component';
import { HomeTechComponent } from './home-tech/home-tech.component';
import { TopBarTechComponent } from './top-bar-tech/top-bar-tech.component';
import { ListInterTTechComponent } from './list-inter-t-tech/list-inter-t-tech.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';


@NgModule({
  imports: [
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    NgxWebsocketModule,
    NgxWebstorageModule.forRoot({prefix: 'my-app', separator: '-', caseSensitive: true}),
    HttpClientModule,
    FormsModule,
    AngularFireDatabaseModule,
      AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    RouterModule.
    forRoot([
      { path: 'products/:productId', component: ProductDetailsComponent },
      { path: 'ListeProducts', component: ProductListComponent },
      { path: 'ListeProducts/:productId', component: ProductListComponent },
      { path: 'AddPointLumineux', component: AddPointLumineuxComponent },
      { path: 'product-update/:pointLumineux', component: AddPointLumineuxComponent },
      { path: 'Login', component: LoginComponent },
      { path: 'Home', component: HomeComponent },
      { path: 'Homet', component: HomeTechComponent },
      { path: '', component: HomeComponent },
      { path: '', component: ProductListComponent },
      { path: 'ListInterT', component: ListInterTTechComponent },

      { path: 'AddArmoire', component: AddArmoireComponent }, 
      { path: 'AddDepart', component: AddDepartComponent },  
      { path: 'ListeArmoire', component: ListeArmoireComponent }, 
      { path: 'armoire-update/:armoire', component: AddArmoireComponent },
      { path: 'depart-update/:depart', component: AddDepartComponent },
      { path: 'Intervention', component: AddInterventionComponent }, 
      { path: 'Addtechnicienne', component: AddTechniciennesComponent }, 
      { path: 'technicienne-update/:technicienne', component: AddTechniciennesComponent },
      {path : 'technicien/:id',component : DetailTechComponent},
      {path : 'LoginTech',component : LoginTechComponent},
      {path : 'notification',component : NotificationComponent},
    ]),
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    AddPointLumineuxComponent,
    LoginComponent,
    HomeComponent,  
    AddArmoireComponent,
    AddDepartComponent,
    AddInterventionComponent,
    AddTechniciennesComponent,
    DetailTechComponent,
    ListeArmoireComponent,
    LoginTechComponent,
    NotificationComponent,
    HomeTechComponent,
    TopBarTechComponent,
    ListInterTTechComponent,
    DetailsDialogComponent,
  ],
   providers: [AsyncPipe,DatePipe],

  bootstrap: [
    AppComponent
  ], 
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/