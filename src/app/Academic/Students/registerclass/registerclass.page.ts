import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { NavController } from '@ionic/angular'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registerclass',
  templateUrl: './registerclass.page.html',
  styleUrls: ['./registerclass.page.scss'],
})
export class RegisterclassPage implements OnInit {


  userId: string;
  Student: any;
  Students = [];
  Classes = [];
  selectedClasses = [];
  User: any;
  classToBeChanged = null;

  constructor(
    private ds: DataService,
    private navCtrl: NavController,
    private altCtrl: AlertController) {

  }
  ngOnInit() {
    this.getUserId();
  }

  getUserId() {
    this.User = this.ds.getUserId();

    this.userId = this.User.uid;



    this.getStudentById();
    this.getClasses();
  }


  getStudents() {
    this.ds.getStudents().subscribe((data) => {
      this.Students = data;

    })
  }

  getStudentById() {
    this.ds.getStudentById(this.userId).subscribe((data) => {
      this.Student = data;
      let tempData: any = data;
      if (tempData.ClassDetails) {
        for (let i = 0; i < tempData.ClassDetails.length; i++) {
          this.selectedClasses.push(tempData.ClassDetails[i].Code);
        }
      }
    })
  }

  getClasses() {
    this.ds.getClasses().subscribe((data) => {
      this.Classes = data;
    })
  }

  handleChanges(newClass: any) {
    if (this.Student.ClassDetails) {
      let tempData = this.Student.ClassDetails;
      tempData = tempData.filter(x => x.Code === newClass.Code);
      if (tempData.length > 0) {
        this.Student.ClassDetails = this.Student.ClassDetails.filter(x => x.Code !== newClass.Code);
      } else {
        const tempnewClass = Object.assign({}, newClass);
        delete tempnewClass.id;
        this.Student.ClassDetails.push(tempnewClass);
      }
    } else {
      this.Student.ClassDetails = [];
      const tempnewClass = Object.assign({}, newClass);
      delete tempnewClass.id;
      this.Student.ClassDetails.push(tempnewClass);
    }
    this.classToBeChanged = newClass;
  }

  async handleSubmit() {
    console.log(this.userId, this.Student);
    this.ds.updateUser(this.userId, this.Student).then((data) => {

      const tempClass: any = this.Classes.filter(x => x.Code === this.classToBeChanged.Code);
      tempClass[0].Remaining = tempClass[0].Remaining - 1;
      console.log('look here... the class which needs to be updated');
      console.log(tempClass[0]);
      this.ds.updateClass(tempClass[0].id, tempClass[0]).then((success) => {
        console.log('successfully updated');
      }).catch((e) => {
        console.log('error updating class');
        console.log(e);
      })
      //console.log('Updating user: ' + data);
    })
      .catch((e) => {
        //console.log(e);
      });
    const alert = await this.altCtrl.create({
      header: 'Success',
      message: 'You have registered successfully.',
      buttons: ['OK']
    });
    await alert.present();
    this.navCtrl.navigateRoot(['students'])

  }

}
