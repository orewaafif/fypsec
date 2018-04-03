import { Component } from '@angular/core';
import { IonicPage,
         NavController,
         ToastController,
         AlertController,
         App,
         Events,
         ModalController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})

export class AccountPage {

  userDetails : any;
  responseData: any;
  accToken = {
    "student_id":"",
    "token":"",
    "id":""
  };
  reportTotal : any;
  reportData: any;
  reports: boolean = false;
  list: any[] = []; //THIS WILL TAKE THE VALUE IN RESPONSE DATA TO BE LOOPED BY NGFOR


  constructor(public navCtrl: NavController,
              public authService:AuthService,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public app: App,
              public events: Events,
              public modalCtrl: ModalController) {

    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.accToken.student_id = this.userDetails.student_id;
    this.accToken.token = this.userDetails.token;

    this.loadReports();

    this.events.subscribe('functionCall:reportSubmit', eventData => {
      this.loadReports();
      });

    this.events.subscribe('functionCall:updateAccount', eventData =>{
      this.logout();
    });
  }


loadReports(){
    this.list.length = 0;

    this.authService.postData(this.accToken, 'reportView').then((result) => {
    this.responseData = result;
    console.log(this.responseData);

    if(this.responseData){
      this.list = this.responseData;
    }

    this.reportTotal = this.list.length;

  }, (err) => {
        //Error log
  });
}

presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 2000,
    position: 'top',
  });
  toast.present();
}

backToWelcome(){
  // this.navCtrl.setRoot('WelcomePage');
  this.app.getRootNav().setRoot('WelcomePage');
  // this.navCtrl.popAll();
  // root.popToRoot();
}

logout(){
     localStorage.clear();
     setTimeout(() => this.backToWelcome(), 1000);
}

categoryIcon(category){
  if(category == "civil/electrical" || category == "civil" || category == "electrical"){
    return "hammer";
  }
  else if(category == "hygiene"){
    return "star";
  } else {
    return "alert";
  }
}

deleteReport(id){

  this.accToken.id = id;

  let alert = this.alertCtrl.create({
    title: 'Delete',
    message: 'Are you sure you want to delete this report?<br>',
    buttons:  [
      {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Edit clicked');
      }
    },
    {
      text: 'Yes',
      handler: () => {
        this.authService.postData(this.accToken, 'reportDelete').then((result) => {
            this.responseData = result;
            console.log(this.responseData);

            this.presentToast("Report "+ id +" deleted");

            this.loadReports();
          }, (err) => {
                //Error log
          });
        console.log('Yes clicked');
      }
    }
    ]
  });
  alert.present();
}

openFeedback(id){
  let feedbackModal = this.modalCtrl.create('FeedbackModal', {id});
  feedbackModal.present();
}

openAccModal(){
  let accModal = this.modalCtrl.create('AccountModal');
  accModal.present();
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

}
