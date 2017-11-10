import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ProcessComponent } from '../components/process/process';
import { DataProvider } from '../providers/data/data';
import { SocketProvider } from '../providers/socket/socket';
import { HttpClientModule } from '@angular/common/http';
import { ProcessProvider } from '../providers/process/process';
import { NetworkProvider } from '../providers/network/network';
import { ServiceManager } from './control/service.manager';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProcessComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    SocketProvider,
    ProcessProvider,
    NetworkProvider,
    ProcessProvider,
    NetworkProvider,
    ServiceManager
  ]
})
export class AppModule {}
