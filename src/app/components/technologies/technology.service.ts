import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireAuth,  } from '@angular/fire/compat/auth';

import { TechnologyModel } from './technology.model';

//import 'firebase/compat/auth';
//import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {
  private dbPath = '/Technologies';
  dbTechnologies: AngularFireList<TechnologyModel>;

  constructor(
    private db: AngularFireDatabase, 
    private auth: AngularFireAuth,
  ) {
    this.dbTechnologies = this.db.list(this.dbPath);
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

  getAll(): AngularFireList<TechnologyModel> {
    return this.dbTechnologies;
  }

  create(newObject: TechnologyModel): any {
    return this.dbTechnologies.push(newObject);
  }

  update(key: string, newObject: TechnologyModel): Promise<void> {
    return this.dbTechnologies.update(key, newObject);
  }

  delete(key: string): Promise<void> {
    return this.dbTechnologies.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.dbTechnologies.remove();
  }
}
