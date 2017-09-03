import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { MainPage } from '../../pages/pages';

import { TranslateService } from '@ngx-translate/core';

import { AuthServiceProvider } from '../../providers/auth-service';

import { WelcomePage } from './../welcome/welcome';
import { SignupPage } from '../signup/signup';
import { ResetpwdPage } from '../resetpwd/resetpwd';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loginForm;
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

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }
  register(){
    this.navCtrl.push(SignupPage);
  }

  resetPwd() {
    this.navCtrl.push(ResetpwdPage);
  }
  facebookLogin() {
    this.authService.signInWithFacebook();
      
  }
  loginUser() {
    this.submitAttempt = true;

    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      this.authService.signInWithEmail(this.loginForm.value.email, this.loginForm.value.password).then(authService => {
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

}