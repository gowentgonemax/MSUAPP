import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {NavController} from '@ionic/angular'


@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.page.html',
  styleUrls: ['./faculties.page.scss'],
})
export class FacultiesPage implements OnInit {

  uid:string;
  constructor(private activatedRoute:ActivatedRoute, private navCtrl:NavController) { }

  ngOnInit() {
    
  }
  btnAddClass(){
    this.navCtrl.navigateForward(['addclass'])
  }
  btnViewClass(){
    this.navCtrl.navigateForward(['viewclass'])

  }
}
