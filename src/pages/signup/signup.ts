
import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { MainPage } from '../../pages/pages';

import { TranslateService } from '@ngx-translate/core';

import { AuthServiceProvider } from '../../providers/auth-service';

import { WelcomePage } from './../welcome/welcome';
import { ResetpwdPage } from '../resetpwd/resetpwd';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  public signupForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  constructor(public navCtrl: NavController,
    public authService: AuthServiceProvider,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public translate: TranslateService) {

    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signupForm = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.required])]
    });
  }
  register() {
    this.navCtrl.push(SignupPage);
  }

  resetPwd() {
    this.navCtrl.push(ResetpwdPage);
  }
  loginUser() {

    if (!this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      this.authService.signInWithEmail(this.signupForm.value.email, this.signupForm.value.password).then(authService => {
        this.navCtrl.setRoot(MainPage);
      }, error => {
        this.loading.dismiss().then(() => {
          var messageErrorTranslated: string;
          this.translate.get([
            "AUTH_INVALID_EMAIL", "AUTH_USER_DISABLED", "AUTH_USER_NOT_FOUND", "AUTH_WRONG_PASSWORD"
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
                  messageErrorTranslated = values.AUTH_USER_NOT_FOUND;
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

  doSignup() {

    if (!this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      this.authService.registerWithEmail(this.signupForm.value.email, this.signupForm.value.password).then(authService => {
        this.loading.dismiss().then(() => {
          this.translate.get("AUTH_SUCCESS_SIGNIN").subscribe(
            (messageOk) => {
              let toast = this.toastCtrl.create({
                message: messageOk,
                duration: 3000,
                position: 'top',
              });
              toast.present();
              this.loginUser();
            });
        });
      }, error => {
        this.loading.dismiss().then(() => {
          var messageErrorTranslated: string;
          this.translate.get([
            "AUTH_INVALID_EMAIL", "AUTH_EMAIL_ALREADY_IN_USE", "AUTH_OPERATION_NOT_ALLOWED", "AUTH_WEAK_PASSWORD"
          ]).subscribe(
            (values) => {
              switch (error.code) {
                case 'auth/invalid-email':
                  messageErrorTranslated = values.AUTH_INVALID_EMAIL;
                  break;
                case 'auth/email-already-in-use':
                  messageErrorTranslated = values.AUTH_EMAIL_ALREADY_IN_USE;
                  break;
                case 'auth/operation-not-allowed':
                  messageErrorTranslated = values.AUTH_OPERATION_NOT_ALLOWED;
                  break;
                case 'auth/weak-password':
                  messageErrorTranslated = values.AUTH_WEAK_PASSWORD;
                  break;
              }

              let toast = this.toastCtrl.create({
                message: messageErrorTranslated,
                duration: 3000,
                position: 'top'
              });
              toast.present();

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
            });
        });
      });

      this.loading = this.loadingCtrl.create({
      });
      this.loading.present();
    }
  }



}