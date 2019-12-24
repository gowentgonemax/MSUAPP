import { Component, OnInit } from '@angular/core';
import {classInfo} from '../Academic/classInfo.interface'
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  classInfo={} as classInfo;
  public classDescription:any

  
  constructor(private afStore: AngularFirestore)
  {
    this.afStore.collection('class').valueChanges().subscribe(data=>{
      this.classDescription = data
    },error => {
      console.log(error);
    });
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
