import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { AlertController } from '@ionic/angular';






@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  StudentId: string;
  Student: any;
  details = [];
  isDeleted = false;
  User: any;
  Classes = [];
  result:boolean;

  constructor(
    private ds: DataService,
    private altCtrl:AlertController
  ) {

  }

  ngOnInit() {
    this.getStudentId();
  }


  getStudentId() {
    this.User = this.ds.getUserId();
    this.StudentId = this.User.uid;
    this.getStudentById();
    this.getClasses();
  }
  getStudentById() {
    this.ds.getStudentById(this.StudentId).subscribe((Student) => {
      this.Student = Student;
      this.details = this.Student.ClassDetails;
    });
  }

  async UpdateStudent(item) {
    if (confirm('Are you sure?')) {
      this.isDeleted = true;
      this.Student.ClassDetails = this.Student.ClassDetails.filter(x => x.Code !== item.Code);
      this.ds.updateUser(this.StudentId, this.Student);
      this.updateClass(item);
    }
    setTimeout(() => {
      this.isDeleted = false;
    }, 5000);
  }

  getClasses() {
    this.ds.getClasses().subscribe((classes) => {
      this.Classes = classes;
    })
  }

  updateClass(classname) {
    const tempClass = this.Classes.filter(x => x.Code === classname.Code);
    tempClass[0].Remaining = tempClass[0].Remaining + 1;
    this.ds.updateClass(tempClass[0].id, tempClass[0]);
  }


}



