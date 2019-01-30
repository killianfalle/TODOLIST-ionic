import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { User } from '../../app/models/user';

import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private afAuth: AngularFireAuth,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController) {
  }

  login(){
    this.navCtrl.setRoot(HomePage)
  }

  async register(user: User){
    try{
      let result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      if(result){
        let toast = this.toastCtrl.create({
          message: 'You can now setup your profile.',
          duration: 1500
        });
        toast.present();
      }
    }
    catch(e){
      let alert = this.alertCtrl.create({
        title: e,
        buttons: ['Ok']
      });
      alert.present();
    }
  }

}
