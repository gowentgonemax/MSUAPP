import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { NavController} from '@ionic/angular'
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage:Storage,
    private navCtrl:NavController,
    private afAuth: AngularFireAuth,
    private altCtrl:AlertController
  ) {
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
 async  logout(){
    this.afAuth.auth.signOut()

    this.storage.remove('USERNAME').then(() => { })
    this.navCtrl.navigateRoot(['/home'])
    
   
    const logout = await this.altCtrl.create({
      header: 'logged out',
      message: 'You have been logged out',
      buttons: ['OK']
    });
    await logout.present()
    
  }
}
