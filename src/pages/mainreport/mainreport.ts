import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ToastController, Events } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { AuthService } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the MainreportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mainreport',
  templateUrl: 'mainreport.html',
})
export class MainreportPage {
  responseData: any;
  userDetails: any; //important to read into the API reply
  reportData = {
    "student_id":"",
    "token":"",
    "picture_url":"",
    "category":"civil/electrical",
    "reportitle":"",
    "reportdetails":""
  };
  pictureData = {"base64image":"",
                "preview":"",
                "uploading":""}; //this will receive picture from ionic native and send the base64image
  picture: any; //this will receive the url and then move it into reportData.picture_url
  pictureDetails: any; //important to read into the API reply

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public authService: AuthService,
              public toastCtrl: ToastController,
              private camera: Camera,
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
    this.reportData.picture_url = "";

    // this.pictureData.stat = "";
    this.pictureData.preview = "";
    this.pictureData.uploading = "";
  }

  reportSubmit(){
    if(this.reportData.reportitle && this.reportData.reportdetails){
        if(this.reportData.picture_url){

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
                  this.clear()

                  this.presentToast("Report submitted. Thank you!");
                  this.events.publish('functionCall:reportSubmit');
                }, (err) => {
                      //Error log
                }); //end of API connection

                console.log('Yes clicked');
              }
            }
            ]
          }); //end of alert controller
          alert.present();

        } else {
          this.presentToast("Oops! Have you taken/upload the photo?");
        }
    } else {
      this.presentToast("Please type in the Report Title");
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

  uploadPicture(){
    this.presentToast("Uploading.. Please wait");
    this.pictureData.uploading = 'true';

    //THIS PART RIGHT HERE CONNECTS WITH FYP-SLIM-RESTFUL WHICH THEN CONNECT TO IMGUR API
    this.authService.postData(this.pictureData, 'imageSubmit').then((result) => {
      this.responseData = result;
      console.log(this.responseData);

      this.pictureDetails = this.responseData.data;
      this.reportData.picture_url = this.pictureDetails.link;

      //checks if upload finish
      if(this.reportData.picture_url){
      this.presentToast("Uploaded");
      } else {
        console.log("Upload failed");
      }

    }, (err) => {
          //Error log
    });
  }

  takePhoto(){ //THIS WILL RETRIEVE PICTURE URL FROM API THAT GOES THROUGH IMGUR API
    this.pictureData.preview = "";
    this.reportData.picture_url = "";

    //TURN THE DUMMY BELOW TO TEST IN WEB BROWSER
    // this.picture = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    // this.pictureData.preview = this.picture;

    const options: CameraOptions = {
      allowEdit: true,
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = imageData;
     this.pictureData.base64image = base64Image;
     this.pictureData.preview = "data:image/jpeg;base64," + base64Image;
     // this.pictureData.stat = "Saved";
    }, (err) => {
     // Handle error
    });
  }


  takePicture(){ //THIS WILL RETRIEVE PICTURE URL FROM API THAT GOES THROUGH IMGUR API
    this.pictureData.preview = "";
    this.reportData.picture_url = "";

    //TURN THE DUMMY BELOW TO TEST IN WEB BROWSER
    // this.picture = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    // this.pictureData.preview = this.picture;

    const options: CameraOptions = {
      allowEdit: true,
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = imageData;
     this.pictureData.base64image = base64Image;
     this.pictureData.preview = "data:image/jpeg;base64," + base64Image;
     // this.pictureData.stat = "Saved";
    }, (err) => {
     // Handle error
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainreportPage');
  }

}
