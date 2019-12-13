import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import {NavController} from '@ionic/angular'
import {ActivatedRoute} from '@angular/router'
import {AuthGuard} from '../../services/user/auth.guard'
import * as firebase from 'firebase/app'
import { LoadingController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { element } from 'protractor';



interface USER{
  username:string;
  password:string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {} as USER
  userID:string
  userIDList: any[] =[]

  constructor(public router:Router,
              private afStore:AngularFirestore,
              private afAuth:AngularFireAuth,
              public aCtrl: AlertController,
              public navCtrl:NavController,
              private activatedRoute:ActivatedRoute,
              private loading:LoadingController,
              public storage:Storage){}
          
  ngOnInit() {    
 
   
  }

  async btnLogin(){
    this.user.username = this.user.username.replace(/\s/g, "").toLowerCase()
    this.user.password= this.user.password.replace(/\s/g, "")
   try{
    
    const response = await this.afAuth.auth.signInWithEmailAndPassword(this.user.username + '@murraystate.edu', this.user.password)
    this.userID = firebase.auth().currentUser.uid //get the userID for current User
    
    //const ref = this.afStore.collection('Faculty').doc(this.userID)
    const db = firebase.firestore()
    db.collection('Faculty').get().then((snapshot)=>{
     snapshot.docs.forEach(element => {
      if (!this.userIDList.includes(element.id)){
        this.userIDList.push(element.id)  
      }
    });
    })

   if (this.userIDList.includes(this.userID)==true)
   {
     console.log(true)
     console.log(this.userID)
     console.log(this.userIDList)
    this.navCtrl.navigateRoot(['students'])
   }
   else{
     console.log(false)
     console.log(this.userID)
     console.log(this.userIDList)
    this.navCtrl.navigateRoot(['students'])
   }
    
   

     
   }catch(err){
    if (err.code == "auth/user-not-found"){
      const notFound = await this.aCtrl.create({
        header: 'Invalid user',
        message: 'User '+this.user.username+ ' is not found',
        buttons: ['OK']
      });
      await notFound.present()
      }
      else if (err.code == "auth/wrong-password"){
        const invalidPassword = await this.aCtrl.create({
          header: 'Invalid password',
          message: 'The password is invalid or the user does not have a password',
          buttons: ['OK']
        });
        await invalidPassword.present()
        }
    }
  }
  
  btnSignUp(){
    this.navCtrl.navigateForward(['/signup'])
  }
}
