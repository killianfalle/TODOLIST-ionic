import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
              public alertCtrl: AlertController) {
  }

  login(){
    this.navCtrl.setRoot(HomePage)
  }

  async register(user: User){
    try{
      await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      let alert = this.alertCtrl.create({
        title: 'Successfully Registered!',
        subTitle: 'You can now go back to Login and Sign-In',
        buttons: ['Ok']
      });
      alert.present();
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
