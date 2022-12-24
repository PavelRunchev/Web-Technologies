import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { ThenableReference } from 'firebase/database';
import { TechnologyModel } from './technology.model';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {
  private dbPath = '/Technologies';
  dbTechnologies: AngularFireList<TechnologyModel>;

  constructor(
    private db: AngularFireDatabase, 
  ) {
    this.dbTechnologies = this.db.list(this.dbPath);
  }

  getAll(): AngularFireList<TechnologyModel> {
    return this.dbTechnologies;
  }
  
  getById(id: string): AngularFireObject<TechnologyModel> {
    return this.db.object(this.dbPath + '/' + id);
  }

  create(newObj: TechnologyModel): any {
    return this.dbTechnologies.push(newObj);
  }

  update(id: string, newObject: TechnologyModel): Promise<void> {
    return this.dbTechnologies.update(id, newObject);
  }

  delete(id: string): Promise<void> {
    return this.dbTechnologies.remove(id);
  }
}
