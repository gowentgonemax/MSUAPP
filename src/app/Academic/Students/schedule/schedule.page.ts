import { Component, OnInit, ɵConsole, ɵsetCurrentInjector } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app'
import { element } from 'protractor';
import { JsonPipe } from '@angular/common';




@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  public userName: string;
  userID: any;
  classList: any = [];
  firebaseData: any;
  details:any[] =[]
  
  
  constructor(public navCtrl: NavController,
    private afStore: AngularFirestore,
    public aCtrl: AlertController,
    public storage: Storage
  ) { 
  }

  async ngOnInit() {
   
    this.userID = firebase.auth().currentUser.uid
    const ref = this.afStore.collection('Students').doc(this.userID)
    ref.valueChanges().subscribe(object=>{
    
      this.firebaseData = object
      this.details = this.firebaseData.ClassDetails
      
    })
  }
  delete(item){
    const ref = this.afStore.collection('Students').doc(this.userID)
    console.log(item)
    var deleteClass = ref.update({
      item:firebase.firestore.FieldValue.delete()
    }) 
   
  
  }
}
