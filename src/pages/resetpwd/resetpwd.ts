import { SignupPage } from './../signup/signup';
import { TranslateService } from '@ngx-translate/core';
import { AuthServiceProvider } from './../../providers/auth-service';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

/*
  Generated class for the Resetpwd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-resetpwd',
  templateUrl: 'resetpwd.html'
})
export class ResetpwdPage {

  public resetpwdForm;
  emailChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  constructor(public navCtrl: NavController, 
    public modalCtrl: ModalController, 
    public authService: AuthServiceProvider, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,    
    public translate: TranslateService) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.resetpwdForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])]
    });
  }
  register(){
    this.navCtrl.pop();
    this.modalCtrl.create(SignupPage).present();
  }

  login(){
    this.navCtrl.pop();
    this.modalCtrl.create(LoginPage).present();
  }
  resetPwd() {
    if (!this.resetpwdForm.valid){
      console.log(this.resetpwdForm.value);
    } else {
      this.authService.resetPassword(this.resetpwdForm.value.email).then( authService => {
        
        this.loading.dismiss().then(() => {
          this.translate.get(["AUTH_SUCCESS_RESET_PASSWORD",  "OK_BUTTON_TEXT"]).subscribe(
            (values) => {
              let toast = this.toastCtrl.create({
                message: values.AUTH_SUCCESS_RESET_PASSWORD,
                duration: 6000,
                position: 'top',
                showCloseButton: true,
                closeButtonText: values.OK_BUTTON_TEXT
              });
              toast.present();
              this.navCtrl.setRoot(LoginPage);
            });
        });        
      }, error => { 
        this.loading.dismiss().then(() => {
          var messageErrorTranslated: string;
          this.translate.get([
            "AUTH_INVALID_EMAIL", "AUTH_USER_DISABLED", "AUTH_USER_NOT_FOUND_RESET", "AUTH_WRONG_PASSWORD"
          ]).subscribe(
            (values) => {
              switch (error.code) {
                case 'auth/invalid-email':
                  messageErrorTranslated = values.AUTH_INVALID_EMAIL;
                  break;
                case 'auth/user-disabled':
                  messageErrorTranslated = values.AUTH_USER_DISABLED;
                  break;
                case 'auth/user-not-found':
                  messageErrorTranslated = values.AUTH_USER_NOT_FOUND_RESET;
                  break;
                case 'auth/wrong-password':
                  messageErrorTranslated = values.AUTH_WRONG_PASSWORD;
                  break;
              }
              // let alert = this.alertCtrl.create({
              //   message: messageErrorTranslated,
              //   buttons: [
              //     {
              //       text: "Ok",
              //       role: 'cancel'
              //     }
              //   ]
              // });
              // alert.present();
              let toast = this.toastCtrl.create({
                message: messageErrorTranslated,
                duration: 3000,
                position: 'top'
              });
              toast.present();
            });

        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }
}