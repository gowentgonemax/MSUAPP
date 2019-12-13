import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { Router } from '@angular/router'
import { Storage } from '@ionic/storage';
import { NavController} from '@ionic/angular'
import * as firebase from 'firebase/app'
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {

  user:String;
  userID:any
  tempData :any
  userData :any[]= []
  constructor(private activatedRoute:ActivatedRoute,
              private router:Router,
              private storage:Storage,
              private navCtrl:NavController,
              private afStore:AngularFirestore
               ){ }

  ngOnInit() {
   
    this.userID = firebase.auth().currentUser.uid//get the userID for current User
    //var user = firebase.auth().currentUser;
    const ref = this.afStore.collection('Students').doc(this.userID)
    ref.valueChanges().subscribe(object=>{
      this.tempData = object
      this.userData = this.tempData.PersonalDetials
      
    })
   
    
  }
  btnRegisterClass() {
    this.router.navigate(['registerclass'], { queryParams: this.userID });
  }
  btnViewSchedule(){
    this.router.navigate(['schedule'], { queryParams: this.userID});
  }
  
}

