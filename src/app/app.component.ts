import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';
import { User } from './models/user';
import { Service } from './services/service';
import { BudgettingPage } from '../pages/budgetting/budgetting';
import { ProfilePage } from '../pages/profile/profile';

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
  advertisers:any;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              private authAf: AngularFireAuth,
              public toastCtrl: ToastController,
              public service: Service,
              public alertCtrl: AlertController,
              public loadCtrl: LoadingController
              ) {
      platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      // this.birthItems = this.token.pipe(
    //   switchMap(token => 
    //     this.afs
    //       .collection<Item>('birthItems', ref=> ref.where('userId', '==', token))
    //       .valueChanges()
    //     )
    // );
    });

    this.service.getBirthItems().subscribe(birthItems => {
      this.birthItems = birthItems;
    });

    this.service.getAdvertisers().subscribe(advertisers => {
      this.advertisers = advertisers;
    });

    // Populate logout for the application
    this.logout = [
      { title: 'Logout', component: HomePage },
    ];

    // Populate pages for the application
    this.pages = [
      { title: 'My Products', component: BudgettingPage, icon: 'basket' },
      { title: 'My Profile', component: ProfilePage, icon: 'man' },
    ];
    this.activePage = this.pages;
  }

  changePass(){
    let alert = this.alertCtrl.create({
      title: 'Enter First Your Email',
      message: 'A new password will be sent to you.',
      inputs: [
        {
          name: 'recoverEmail',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            const toast = this.toastCtrl.create({
              message: 'Cancelled!',
              duration: 3000
            });
            toast.present();
          }
        },
        {
          text: 'Submit',
          handler: (inputData) => {

            let loading = this.loadCtrl.create({
              dismissOnPageChange: true,
              content: 'Resetting your password..'
            });
            loading.present();

            this.service.forgotPasswordUser(inputData.recoverEmail).then(()=>{
              loading.dismiss().then(()=>{
                this.alertCtrl.create({
                  title: 'Check your email.',
                  subTitle: 'Password reset successful',
                  buttons: ['OK']
                }).present();  
              })
            },error => {
              loading.dismiss().then(()=>{
                this.alertCtrl.create({
                  title: 'Error resetting password.',
                  subTitle: error.message,
                  buttons: ['OK']
                }).present();
              })
            })
          }
        }
      ]
    });
    alert.present();
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
    this.nav.push(page.component,{
      birthItems: this.birthItems,
      advertisers: this.advertisers,
      // christItems: this.christItems,
      // wedItems: this.wedItems
    });
    this.activePage = page;
  }
  checkActive(page){
    return page == this.activePage;
  }
}

