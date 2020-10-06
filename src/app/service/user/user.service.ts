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

  createUserInstance({ uid, email, displayName, companyName = '', photoURL, fields = availableFields }: User) {
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
