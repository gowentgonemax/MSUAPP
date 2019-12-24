import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { DataService } from 'src/app/data.service';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  user = {
    username: null,
    password: null
  };

  constructor(
    private router: Router,
    private ds: DataService,
    private altCtrl:AlertController,
    
  ) { }

  ngOnInit() {

  }


 async btnLogin() {
    this.user.username = this.user.username.replace(/\s/g, "").toLowerCase()
    this.user.password= this.user.password.replace(/\s/g, "")
    this.ds.signIn(this.user.username + '@murraystate.edu', this.user.password)
      .then((success) => {
        console.log(success.user.uid);
        this.getUserById(success.user.uid);
      })
      .catch(async (err) => {
        if (err.code == "auth/user-not-found"){
          const notFound = await this.altCtrl.create({
            header: 'Invalid user',
            message: 'User '+this.user.username+ ' is not found',
            buttons: ['OK']
          });
          await notFound.present()
        }
        else if (err.code == "auth/wrong-password"){
          const invalidPassword = await this.altCtrl.create({
            header: 'Invalid password',
            message: 'The password is invalid or the user does not have a password',
            buttons: ['OK']
          });
          await invalidPassword.present()
        }
    });  
  }
btnSignUp(){
  this.router.navigate(['/signup'])
}
  
  

  getUserById(id) {
    this.ds.getStudentById(id).subscribe((student: any) => {
      if (student.PersonalDetials.Role === 'faculty') {
        this.router.navigate(['/faculties']);
      } else {
        this.router.navigate(['/students']);
      }

    });
  }



}
