import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, Events } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the FeedbackModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback-modal',
  templateUrl: 'feedback-modal.html',
})
export class FeedbackModal {
  responseData: any;
  userDetails: any;
  reportData = {
    "student_id":"",
    "token":"",
    "id":"",
    "feedback":""
  };

  feedbackData = {
    "comment":"",
    "happy":"1",
    "time":"1"
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public authService: AuthService,
              public toastCtrl: ToastController,
              public events: Events) {

    this.reportData.id = this.navParams.get('id');

    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.reportData.student_id = this.userDetails.student_id;
    this.reportData.token = this.userDetails.token;
  }

  submitFeedback(){
    if(this.feedbackData.comment){

      this.reportData.feedback = "Happy: [" + this.feedbackData.happy + "]\r\n" +
                                 "Timeliness: [" + this.feedbackData.time + "]\r\n" +
                                 "Comments: " + this.feedbackData.comment;

      this.authService.postData(this.reportData, 'reportFeedback').then((result) => {
        this.responseData = result;
        console.log(this.responseData);

        this.presentToast("Feedback submitted. Thank you!");
        this.events.publish('functionCall:reportSubmit');
        this.dismiss();
      }, (err) => {
            //Error log
      });

    } else {
      this.presentToast("Please leave a comment :)");
    }
  }

  dismiss(){
    this.viewCtrl.dismiss();
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
    console.log('ionViewDidLoad FeedbackModalPage');
  }

}
