import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ToastController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { AuthService } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  responseData: any;
  userData = {"student_id": "", "password": ""};
  regExp = { "student_id":true,
              "password":true
            };

  constructor(public navCtrl: NavController,
              public authService: AuthService,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController) {

    // localStorage.clear(); //IN CASE THERE'S AN ERROR WITH CACHE
    if(localStorage.getItem('userData')){
      this.navCtrl.setRoot(TabsPage);
    }
  }

  login(){
    // Login API
    localStorage.clear(); //clears previous login just in case
    this.isValid();

      if(this.userData.student_id && this.userData.password){
        if(this.regExp.student_id && this.regExp.password){
        this.authService.postData(this.userData, 'login').then((result) => {
        this.responseData = result;
        console.log(this.responseData);

        if(this.responseData.userData){
          localStorage.setItem('userData', JSON.stringify(this.responseData));
          this.navCtrl.push(TabsPage);
        } else{
          this.presentToast("Wrong matric number/password. Have you registered?");
        }
      }, (err) => {
          // Error log
        }); //end of api access
      } else {
      this.presentToast("Matric number/password is not valid");
    }

    } else {
      this.presentToast("Please fill all the fields");
    }

  }

  signup(){
    // Redirects to registration page
    this.navCtrl.push('SignupPage');
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  isValid(){

    let regId = new RegExp(/(^G\d{7}$|^(\d{7})$)/m);
    let regPass = new RegExp(/(?!^[0-9]*$)(?!^[a-zA-Z!@#$%^&*()_+=<>?]*$)^([a-zA-Z!@#$%^&*()_+=<>?0-9]{6,15})$/g);

    this.regExp.student_id = regId.test(this.userData.student_id);
    this.regExp.password = regPass.test(this.userData.password);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}
