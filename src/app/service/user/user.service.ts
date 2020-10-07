import { Injectable } from '@angular/core';
import { availableFields } from '../../utils/dynamic-fields.utils';
import { User } from '../../model/user';

@Injectable({ providedIn: 'root' })

export class UserService {

  constructor() { }

  setLocalStorage(userInfo): void {
    localStorage.setItem('user', userInfo)
  }
  getLocalStorage(): string {
    return localStorage.getItem('user')
  }
  removeLocalStorage(): void {
    localStorage.removeItem('user')
  }

  createUserInstance(
    {
      uid,
      email,
      displayName,
      companyName = '',
      photoURL = 'https://firebasestorage.googleapis.com/v0/b/inventorsoft-academy-crm-45f71.appspot.com/o/uploads%2Fdefault?alt=media&token=e7a00e02-b3ab-4b97-8ad8-07f44954c808',
      fields = availableFields
    }: User) {
    return new User(
      displayName,
      companyName,
      photoURL,
      email,
      uid,
      fields
    )
  }

}
