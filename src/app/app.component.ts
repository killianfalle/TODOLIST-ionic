import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';
import { User } from './models/user';
import { Service } from './services/service';
import { BudgettingPage } from '../pages/budgetting/budgetting';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  logout: Array<{title: string, component: any}>;

  pages: Array<{title: string, component: any, icon: string}>;

  rootPage:any = HomePage;
  user = {} as User;
  activePage: any;
  birthItems: any;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              private authAf: AngularFireAuth,
              public toastCtrl: ToastController,
              public service: Service,
              ) {
      platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.service.getBirthItems().subscribe(birthItems => {
      this.birthItems = birthItems;
    });

    // Populate logout for the application
    this.logout = [
      { title: 'Logout', component: HomePage },
    ];

    // Populate pages for the application
    this.pages = [
      { title: 'My Products', component: BudgettingPage, icon: 'basket' },
    ];
    this.activePage = this.pages;
  }

  logoutPage(page : any) : void
   {
      // Ensure we can log out of Firestore and reset the root page
      if(page == 'Logout')
      {
         this.authAf
          this.nav.setRoot(page.component);
      }
      // Otherwise reset the content nav to have just this page
      else
      {
         this.nav.setRoot(page.component);
      }

      const toast = this.toastCtrl.create({
        message: 'Thank You Advertiser!',
        duration: 3000
      });
      toast.present();
   }

   openPage(page){
    this.nav.setRoot(page.component,{
      birthItems: this.birthItems,
      // christItems: this.christItems,
      // wedItems: this.wedItems
    });
    this.activePage = page;
  }
  checkActive(page){
    return page == this.activePage;
  }
}

