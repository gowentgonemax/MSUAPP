import { Component, OnInit } from '@angular/core';
import {CLASSINFO} from '../../classInfo.interface'
import { Router } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router'
import { NavController} from '@ionic/angular'
import { Storage } from '@ionic/storage';
import { merge } from 'rxjs';
import * as firebase from 'firebase/app'


@Component({
  selector: 'app-registerclass',
  templateUrl: './registerclass.page.html',
  styleUrls: ['./registerclass.page.scss'],
})
export class RegisterclassPage implements OnInit {

  classInfo={} as CLASSINFO;
  public classDescription:any
  public userName:string;
  public uID:string;
  collectionList: any[] = []
  classCodeList: any[] = []

  userID:any;
  remaining:number=0
  code:string;
  collection: [
      {
        Name:any,
        Code:any,
        Location:any,
        Capacity?:number,
        Remaining?:number
        Instructor:string

      }
  ]
  constructor(public router: Router,
              private afStore: AngularFirestore,
              public aCtrl: AlertController,
              private activatedRoute:ActivatedRoute,
              public storage:Storage,
              private navCtrl:NavController) {
               
              }

  ngOnInit() {
    
    this.userID = firebase.auth().currentUser.uid //get the userID for current User
    
    this.afStore.collection('class').valueChanges().subscribe(data=>{
      this.classDescription = data
    },error => {
      console.log(error);
    });
  }
 
 
  onChecked(event,item){
    
    if (event.target.checked){
      this.collection=[{
        Name:item.Name,
        Code:item.Code,
        Location:item.Location,
        Instructor:item.Instructor
        
      }]
      this.remaining = item.Remaining-1
      
      this.collectionList.push(this.collection)
    }
    else if (!event.target.checked){
      this.collection=[{
        Name:item.Name,
        Code:item.Code,
        Location:item.Location,
        Instructor:item.Instructor
      }]
      this.remaining =item.Remaining+1
      this.collectionList.splice( this.collectionList.indexOf(this.collection), 1 );
    }
    this.code =item.Code
  }

  async btnSubmit(){

    var tempList: any[] = []
     
    
      var docRef=this.afStore.collection('Students').doc(this.userID); //getting ref of data
      (docRef.get().subscribe(data=>{
        console.log('Data'+data[0])
      }))
      this.collectionList.forEach(element => {
        tempList.push(element[0])
      });
      
      this.afStore.collection('class').doc(this.code).update({
        Remaining:this.remaining
      })
      
      docRef.update({
          ClassDetails: tempList,
      })

      
      const notFound = await this.aCtrl.create({
      header: 'Success',
      message: 'You have registered successfully',
      buttons: ['OK']
    });
    await notFound.present()
    this.router.navigate(['students'])
  }
}
