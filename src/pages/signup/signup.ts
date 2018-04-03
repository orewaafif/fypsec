import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ToastController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { AuthService } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  responseData: any;
  responseVar: any;
  confirmPassword: any;
  userData = {"student_id": "",
              "password": "",
              "name":"",
              "email":"",
              "phoneNumber":"",
              "block":"",
              "room_no":"",
              "kuliyyah":"",
            };

  regExp = { "student_id":true,
              "password":true,
              "name":true,
              "email":true,
              "phoneNumber":true,
              "room_no":true
            };
  tap = "password";

  constructor(public navCtrl: NavController,
              public authService: AuthService,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController) {
              }

  signup(){
    //SignupAPI
    localStorage.clear();

    if(this.userData.student_id && this.userData.password && this.userData.name && this.userData.email && this.userData.phoneNumber && this.userData.block && this.userData.room_no && this.userData.kuliyyah){

      if(this.regExp.student_id && this.regExp.email && this.regExp.password && this.regExp.phoneNumber && this.regExp.room_no){
        this.authService.postData(this.userData, 'signup').then((result) => {
          this.responseData = result;
          console.log(this.responseData);

          if(this.responseData.error){
            console.log(this.responseData.error);
            this.responseVar = this.responseData.error;
            this.presentToast(this.responseVar.text);
          } else {
            localStorage.setItem('userData', JSON.stringify(this.responseData));
            this.navCtrl.push(TabsPage);
          }

        }, (err) => {
              // Error log
        }); //end of API call
      } else {
        this.presentToast("Data is not valid. Please double check the formatting");
      }

    } else {
      this.presentToast("Please fill all the fields");
    }
  }

  back(){
    this.navCtrl.pop();
  }

  presentConfirm(){
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Have you got the right information in the form?',
      buttons:  [
        {
        text: 'Edit',
        role: 'cancel',
        handler: () => {
          console.log('Edit clicked');
        }
      },
      {
        text: 'Yes',
        handler: () => {
          this.signup();
          console.log('Yes clicked');
        }
      }
      ]
    });
    alert.present();
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
    let regEmail = new RegExp(/^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm);
    let regRoom = new RegExp(/[1-4]\.([1][\d]?)?([2][0]?)?/g);
    let regPhone = new RegExp(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g);

    this.regExp.student_id = regId.test(this.userData.student_id);
    this.regExp.password = regPass.test(this.userData.password);
    this.regExp.email = regEmail.test(this.userData.email);
    this.regExp.room_no = regRoom.test(this.userData.room_no);
    this.regExp.phoneNumber = regPhone.test(this.userData.phoneNumber);

  }

  tapPassword(){

    if(this.tap == "text"){
      this.tap = "password";
    } else {
      this.tap = "text";
    }
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
