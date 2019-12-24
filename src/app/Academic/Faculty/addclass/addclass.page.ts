import { Component, OnInit } from '@angular/core';
import {classInfo} from '../../classInfo.interface'
import {NavController} from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-addclass',
  templateUrl: './addclass.page.html',
  styleUrls: ['./addclass.page.scss'],
})
export class AddclassPage implements OnInit {

  dptCode:string
  code:string
  classInfo={} as classInfo;
  constructor(public navCtrl: NavController,
              private afStore: AngularFirestore,
              public aCtrl: AlertController,
              ) {}           
  ngOnInit() {
  }
  async btnSubmit(){
    this.code = this.dptCode+this.classInfo.code
    this.classInfo.remaining = this.classInfo.capacity
    
    try{
      const res = this.afStore.collection('/class').doc(this.code).set
      ({
        Code: this.code,
        Name: this.classInfo.name,
        Instructor: this.classInfo.instructor,
        Capacity: this.classInfo.capacity,
        Location: this.classInfo.location,
        Remaining: this.classInfo.remaining,
        
      });
      const sucess = await this.aCtrl.create({
        header: 'Class added',
        message: this.classInfo.name +' saved sucessfully!',
        buttons: ['OK']
      });
      await sucess.present();
      this.navCtrl.navigateRoot('/faculties')
      
    }catch(err){
        const error = await this.aCtrl.create({
        header: 'Error',
        message: err.code,
        buttons: ['OK']
      });
      await error.present();
    }    
  }
  btnTesting(){
    console.log(this.dptCode)
  }
  btnCancel(){
    this.navCtrl.navigateRoot('/faculties')
  }
}
