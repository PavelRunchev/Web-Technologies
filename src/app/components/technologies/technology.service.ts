import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireAuth,  } from '@angular/fire/compat/auth';

import { Technology } from './technology.model';

//import 'firebase/compat/auth';
//import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {
  private dbPath = '/Technologies';
  dbTechnologies: AngularFireList<Technology>;

  constructor(
    private db: AngularFireDatabase, 
    private auth: AngularFireAuth,
  ) {
    this.dbTechnologies = this.db.list(this.dbPath);
    //firebase.auth().reauthenticateWithCredential;
  }

  login(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        localStorage.setItem('token', 'true');
      }, err => console.log(err));
  }

  register(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then((data) => {
        localStorage.setItem('token', 'true');
        console.log(data);
      }, err => console.log(err));
  }

  getAll(): AngularFireList<Technology> {
    return this.dbTechnologies;
  }

  create(tutorial: Technology): any {
    return this.dbTechnologies.push(tutorial);
  }

  update(key: string, value: any): Promise<void> {
    return this.dbTechnologies.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.dbTechnologies.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.dbTechnologies.remove();
  }
}
