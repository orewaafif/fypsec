import { Component } from '@angular/core';
import { IonicPage, AlertController, ViewController, Events } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the AccountModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-modal',
  templateUrl: 'account-modal.html',
})
export class AccountModal {
  userDetails: any;
  userData = {"student_id": "",
              "token": "",
              "name":"",
              "email":"",
              "phoneNumber":"",
              "block":"",
              "room_no":"",
              "kuliyyah":"",
            };
  tempData: any;
  responseData: any;

  constructor(public authService: AuthService,
              public events: Events,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController) {
    const data = JSON.parse(localStorage.getItem('userData'));

    this.userDetails = data.userData;

    this.userData.student_id = this.userDetails.student_id;
    this.userData.token = this.userDetails.token;
    this.userData.name = this.userDetails.name;
    this.userData.email = this.userDetails.email;
    this.userData.phoneNumber = this.userDetails.phoneNumber;
    this.userData.block = this.userDetails.block;
    this.userData.room_no = this.userDetails.room_no;
    this.userData.kuliyyah = this.userDetails.kuliyyah;

    this.tempData = this.userData;

  }

  updateAccount(){

    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Would you like to apply the changes? The app will logout for the changes to take effect.',
      buttons:  [
        {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Yes',
        handler: () => {
          this.authService.postData(this.userData, 'userUpdate').then((result) => {
          this.responseData = result;
          console.log(this.responseData);

          this.events.publish('functionCall:updateAccount');

          }, (err) => {
              //Error log
            });
          this.viewCtrl.dismiss()

          console.log('Yes clicked');
        }
      }
      ]
    }); //end of alert controller
    alert.present();

  }//end of update account

  back(){
      this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountModalPage');
  }

}
