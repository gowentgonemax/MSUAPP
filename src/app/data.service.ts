import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth
  ) { }


  getClasses() {
    return this.db.collection('class').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getStudents() {
    return this.db.collection('Students').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getStudentById(id) {
    return this.db.collection('Students').doc(id).valueChanges();
  }

  getUserId() {
    return this.auth.auth.currentUser;
  }

  updateUser(id, newValue) {
    return this.db.collection('Students').doc(id).update(newValue);
  }

  getUserDetails(id) {
    return this.db.collection('Students').doc(id).valueChanges().subscribe(data => {

    })
  }
  updateClass(id: string, newValue: any) {
    return this.db.collection('class').doc(id).update(newValue);

  }

  signIn(email: string, password: string) {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

}
