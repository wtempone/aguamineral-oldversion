// Modulos Base
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';

//Modulos Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyAu6rPfxKN5Rdef1NUIoeE7BCjQid9G8sQ",
  authDomain: "aguamineral-f4e5f.firebaseapp.com",
  databaseURL: "https://aguamineral-f4e5f.firebaseio.com",
  projectId: "aguamineral-f4e5f",
  storageBucket: "aguamineral-f4e5f.appspot.com",
  messagingSenderId: "259485126796"
};

// Modulos do Aplicativo
import { MyApp } from './app.component';
import { MenuPage } from '../pages/menu/menu';
import { ContentPage } from '../pages/content/content';

import { ItemCreatePage } from '../pages/item/item-create/item-create';
import { ItemDetailPage } from '../pages/item/item-detail/item-detail';
import { ListMasterPage } from '../pages/item/list-master/list-master';
import { SearchPage } from '../pages/item/search/search';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { WelcomePage } from '../pages/welcome/welcome';
import { SettingsPage } from '../pages/settings/settings';

import { Api } from '../providers/api';
import { Settings } from '../providers/settings';
import { User } from '../providers/user';

// Databases providers
import { ItemService } from '../providers/database/items';

import { Camera } from '@ionic-native/camera';
import { GoogleMaps } from '@ionic-native/google-maps';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp,
    ItemCreatePage,
    ItemDetailPage,
    ListMasterPage,
    LoginPage,
    MenuPage,
    ContentPage,   
    SearchPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    SettingsPage,   
    WelcomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, 
    AngularFireAuthModule, 
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemCreatePage,
    ItemDetailPage,
    ListMasterPage,
    LoginPage,
    MenuPage,
    ContentPage,   
    SearchPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    SettingsPage,   
    WelcomePage
  ],
  providers: [
    Api,
    ItemService,
    User,
    Camera,
    GoogleMaps,
    SplashScreen,
    StatusBar,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
