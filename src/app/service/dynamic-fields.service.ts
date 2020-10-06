import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {DynamicField} from '../model/dynamic-field';
import {map} from 'rxjs/operators';
import {CloudService} from './cloud.service';


@Injectable({
  providedIn: 'root'
})
export class DynamicFieldsService {

  constructor(
    private firestore: AngularFirestore,
    private cloudService: CloudService
  ) {}

  getFields() {
    const user = this.getUserDetails();
    return this.firestore.collection('users')
      .doc(user.uid).get().pipe(map(item => item.data().fields));
  }

  saveFields(fields: DynamicField[]) {
    const user = {
      ...this.getUserDetails(),
      fields
    };

    return this.cloudService.setDocDataByID(user.uid, user, 'users');
  }

  getUserDetails() {
    return JSON.parse(sessionStorage.getItem('user'));
  }
}
