import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { PanelStyle } from '../../../../enum/style-messages';
import { URL_ROUTES } from '../../../../model/url-routes';
import { CloudService } from '../../../../service/cloud.service';
import { MessageService } from '../../../../service/message.service';
import { setLocalStorage } from '../../../../utils/localstorage.utils';
import { User } from '..';
import { availableFields } from '../../../../utils/dynamic-fields.utils';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../../../assets/scss/user.module.scss']
})
export class LoginComponent {
  loginForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private cloudService: CloudService,
    private firebaseAuth: AngularFireAuth
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get email() {
    return this.loginForm.get('email')
  }
  get password() {
    return this.loginForm.get('password')
  }

  logIn() {
    const { email, password } = this.loginForm.value

    this.firebaseAuth.signInWithEmailAndPassword(email, password).then(
      signedInUser => {
        this.cloudService.getDataById(signedInUser.user.uid, 'users').
          subscribe(userData => {
            if (userData) {
              setLocalStorage('user', JSON.stringify(userData))
              this.router.navigate([URL_ROUTES.dashboard]).then(
                () => this.messageService.openSnackBar('Logged in', '×', PanelStyle.success)
                )
              } else {
                const signedInUserInfo = new User(
                  null,
                  null,
                  environment.defaultPhotoURL,
                  signedInUser.user.email,
                  signedInUser.user.uid,
                  availableFields
                )
              
                this.cloudService.setDocDataByID(signedInUserInfo.uid, { ...signedInUserInfo }, 'users').then(
                  () => {
                    setLocalStorage('user', JSON.stringify(signedInUserInfo))
                    this.router.navigate([URL_ROUTES.dashboard]).then(
                      () => this.messageService.openSnackBar('Information changed', '×', PanelStyle.success)
                    )
                  }
                ).catch(error => this.messageService.openSnackBar(error.message, '×', PanelStyle.error, false))
              }
            }
          )
      }
    ).catch(error => this.messageService.openSnackBar(error.message, '×', PanelStyle.error, false))
  }

  googleAuth() {
    const provider = new auth.GoogleAuthProvider()

    this.firebaseAuth.signInWithPopup(provider).then(
      userGoogle => {
        this.cloudService.getDataById(userGoogle.user.uid, 'users').subscribe(userData => {
          if (userData) {
            setLocalStorage('user', JSON.stringify(userData))
            this.router.navigate([URL_ROUTES.dashboard]).then(
              () => this.messageService.openSnackBar('Logged in by Google', '×', PanelStyle.success)
            )
          } else {
            const registeredUser = new User(
              userGoogle.user.displayName,
              null,
              userGoogle.user.photoURL,
              userGoogle.user.email,
              userGoogle.user.uid,
              availableFields
            )
            this.cloudService.setDocDataByID(registeredUser.uid, { ...registeredUser }, 'users').then(
              () => {
                setLocalStorage('user', JSON.stringify(registeredUser))
                this.router.navigate([URL_ROUTES.dashboard]).then(
                  () => this.messageService.openSnackBar('Registered by Google', '×', PanelStyle.success)
                )
              }
            ).catch(error => this.messageService.openSnackBar(error.message, '×', PanelStyle.error, false))
          }
        })
      }
    ).catch(error => this.messageService.openSnackBar(error.message, '×', PanelStyle.error, false))
  }
}
