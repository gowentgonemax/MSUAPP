import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { NavController} from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from 'src/app/data.service';



@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {

  user:String;
  userID:any
  
  constructor(
              private router:Router,
              private navCtrl:NavController,
              private ds:DataService,
              private afStore:AngularFirestore
               ){ }

  ngOnInit() {
   
    this.userID =  this.ds.getUserId
    //console.log(this.ds.getUserDetails(this.userID))
    
    
  }
  btnRegisterClass() {
    this.router.navigate(['registerclass'], { queryParams: this.userID });
  }
  btnViewSchedule(){
    this.router.navigate(['schedule'], { queryParams: this.userID});
  }
  
}

