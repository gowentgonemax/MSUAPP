import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
//import { Router } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import {NavController} from '@ionic/angular';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { LoadingController} from '@ionic/angular';

interface USERINFO {
  username: string;
  password?: string;
  cpassword?: string;
  fName: string;
  lName: string;
  major: string;

}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  userInfo = {} as USERINFO
  domain:string="@murraystate.edu"
  constructor(public navCtrl: NavController,
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth,
    public aCtrl: AlertController,
    private loading:LoadingController) {
  }
  ngOnInit() {
  }
  signupUser():Promise<any>{
    return firebase
          .auth()
          .createUserWithEmailAndPassword(this.userInfo.username+this.domain,this.userInfo.password)
          .then((newUserCredential:firebase.auth.UserCredential)=>{firebase
          .firestore()
          .doc(`/Students/${newUserCredential.user.uid}`)
          .set({
              PersonalDetials:{
              FName:this.userInfo.fName,
              LName:this.userInfo.lName,
              Major:this.userInfo.major,
              Email:this.userInfo.username+this.domain,
              Role : 'student'
              }
              })
            
          })
  }
  async btnSignup() {

  //----------------------------------To remove white space and change in case accordinlgy--------------
    this.userInfo.username = this.userInfo.username.replace(/\s/g, "").toLowerCase()
    this.userInfo.fName=this.userInfo.fName.replace(/\s/g, "")
    this.userInfo.major =  this.userInfo.major.replace(/\s/g, "").toUpperCase()
    this.userInfo.lName=this.userInfo.lName.replace(/\s/g, "")
    this.userInfo.password=this.userInfo.password.replace(/\s/g, "")
    this.userInfo.cpassword=this.userInfo.cpassword.replace(/\s/g, "")
//-------------------------------------------To Check if password and comfirm password-------------------------------------
    if (this.userInfo.password != this.userInfo.cpassword){
      const Password = await this.aCtrl.create({
        message: 'Your password and confirmation password do not match',
        header: "Password do not match.",
        buttons: ['OK']
      })
      await Password.present();
    }
    else if (this.userInfo.password.length <= 5){
      const weak = await this.aCtrl.create({
        message: "your password is too weak. and Must be atleast 6 characters",
        header: 'Weak password',
        buttons: ['OK']
      })
      await weak.present();
    }
    else {
      try {
        this.signupUser();
        const success = await this.aCtrl.create({
          header: 'Successful',
          message: 'Congratulations ' + this.userInfo.fName + ', your account has been created!',
          buttons: ['OK']
        });
        await success.present();
        this.navCtrl.navigateRoot('/login')

      } catch (err) {
        if (err.code == "auth/email-already-in-use") {
          const alreadyUse = await this.aCtrl.create({
            header: 'Already exists',
            message: 'User '+this.userInfo.username+' already Exists,Please choose another.',
            buttons: ['OK']
          });
          await alreadyUse.present()
        }
       
      }
      
    }
  
  
  }
  btnCancel() {
      this.userInfo.fName="",
      this.userInfo.lName="",
      this.userInfo.major="",
      this.userInfo.password="",
      this.userInfo.cpassword=""
      this.navCtrl.navigateRoot('/login')
    }
}