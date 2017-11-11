import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ContactPage } from '../pages/contact/contact';
import { PostsPage } from '../pages/posts/posts';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AccordionComponent } from '../components/accordion/accordion';
import { DeletePostComponent } from '../components/delete-post/delete-post';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

var config = {
  apiKey: "AIzaSyAqj0Dl6TTVlBJ37xiq36B77qkFVbK47xU",
  authDomain: "blogdb-58d1b.firebaseapp.com",
  databaseURL: "https://blogdb-58d1b.firebaseio.com",
  projectId: "blogdb-58d1b",
  storageBucket: "",
  messagingSenderId: "252069799206"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ContactPage,
    PostsPage,
    AccordionComponent,
    DeletePostComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ContactPage,
    PostsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
