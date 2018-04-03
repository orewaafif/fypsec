import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ToastController, Events } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the HygreportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hygreport',
  templateUrl: 'hygreport.html',
})
export class HygreportPage {
  responseData: any;
  userDetails: any;
  reportData = {
    "student_id":"",
    "token":"",
    "category":"hygiene",
    "reportitle":"",
    "reportdetails":""
  };

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public authService: AuthService,
              public toastCtrl: ToastController,
              public events: Events) {

                //Retrieves the student_id and token from localStorage
                const data = JSON.parse(localStorage.getItem('userData'));
                this.userDetails = data.userData;
                this.reportData.student_id = this.userDetails.student_id;
                this.reportData.token = this.userDetails.token;
  }

  clear(){
    this.reportData.reportitle = "";
    this.reportData.reportdetails = "";
  }

  reportSubmit(){
    if(this.reportData.reportitle && this.reportData.reportdetails){
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

            this.authService.postData(this.reportData, 'reportSubmit').then((result) => {
              this.responseData = result;
              console.log(this.responseData);

              //localStorage.setItem('reportData', JSON.stringify(this.responseData));
              this.clear();

              this.presentToast("Report submitted. Thank you!");

              this.events.publish('functionCall:reportSubmit');
            }, (err) => {
                  //Error log
            });

            console.log('Yes clicked');
          }
        }
        ]
      });
      alert.present();

    } else {
      this.presentToast("Please fill all the report details");
    }

  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HygreportPage');
  }

}
