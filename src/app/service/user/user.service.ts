import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { availableFields } from '../../utils/dynamic-fields.utils';
import { User } from '../../model/user';

@Injectable({ providedIn: 'root' })

export class UserService {
  verifiedEmail: string = ''
  verifyCode: string = ''

  constructor(private firebaseAuth: AngularFireAuth) { }

  resetPassword(email: string) {
    this.verifiedEmail = email
    return this.firebaseAuth.sendPasswordResetEmail(email)
  }
  verifyPassword(code: string) {
    this.verifyCode = code
    return this.firebaseAuth.verifyPasswordResetCode(code)
  }
  sendNewPassword(password: string) {
    return this.firebaseAuth.confirmPasswordReset(this.verifyCode, password).then(
      () => {
        this.verifiedEmail = ''
        this.verifyCode = ''
      }
    )
  }

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
