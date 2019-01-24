import { Component } from '@angular/core';
import { NavController,AlertController, ToastController, MenuController, LoadingController  } from 'ionic-angular';

import { NavParams } from 'ionic-angular/navigation/nav-params';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../app/models/user';
import { Item } from '../../app/models/item';
import { Service } from '../../app/services/service';
import { BudgettingPage } from '../budgetting/budgetting';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  birthItems: any;
  christItems: any;
  wedItems: any;

  user = {} as User;
  items: Item[];

  isSearchbarOpened = false;

  constructor(public navCtrl: NavController,
              public service:Service,
              private alertCtrl: AlertController,
              private authAf: AngularFireAuth,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public menu: MenuController,
              public loadCtrl: LoadingController) {
                
                //to disable side-menu on login page 
                this.menu.enable(false, 'myMenu');

                this.service.getBirthItems().subscribe(birthItems => {
                  this.birthItems = birthItems;
                  console.log(this.birthItems);
                });

                // this.service.getChristItems().subscribe(christItems => {
                //   this.christItems = christItems;
                //   console.log(this.christItems);
                // });

                // this.service.getWedItems().subscribe(wedItems => {
                //   this.wedItems = wedItems;
                //   console.log(this.wedItems);
                // });
              }

  async login(user: User){
    console.log(this.authAf.auth.currentUser.uid);

    try{
      this.authAf.auth.signInWithEmailAndPassword(user.email, user.password)
        .then(data=>{

          let alert = this.alertCtrl.create({
      
            title: 'Input Token',
            inputs: [
              {
                name: 'token',
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
                  this.navCtrl.setRoot(BudgettingPage,{
                    birthItems: this.birthItems
                  });
        
                  this.toast('Welcome! ');
                  this.alert('Select an inclusion(s) that you want to update.');
                }
              }
            ]
          });
          alert.present();

        })
        .catch(error =>{
          let alert = this.alertCtrl.create({
            title: error.message,
            buttons: ['Ok']
          });
          alert.present();
        })
    }
    catch(e){
      let alert = this.alertCtrl.create({
        title: e,
        buttons: ['Ok']
      });
      alert.present();
    }
  }

  forgotPass(){
    let alert = this.alertCtrl.create({
      title: 'Enter Your Email',
      message: 'A new password will be sent to you.',
      inputs: [
        {
          name: 'recoverEmail',
          placeholder: 'you@gmail.com'
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
              content: 'Reseting your password..'
            });
            loading.present();

            this.service.forgotPasswordUser(inputData.recoverEmail).then(()=>{
              loading.dismiss().then(()=>{
                this.alertCtrl.create({
                  title: 'Check you email.',
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

  alert(message: string){
    this.alertCtrl.create({
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  toast(message: string){
    this.toastCtrl.create({
      message: message + this.user.email,
      duration: 3000
    }).present();
  }

  register(){
    this.navCtrl.setRoot(RegisterPage)
  }

}
