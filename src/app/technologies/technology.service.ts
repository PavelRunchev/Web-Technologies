import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Technology } from './technology.model';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {
  private dbPath = '/Technologies';
  dbTechnologies: AngularFireList<Technology>;

  constructor(private db: AngularFireDatabase) {
    this.dbTechnologies = db.list(this.dbPath);
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
