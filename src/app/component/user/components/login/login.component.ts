import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { PanelStyle } from '../../../../enum/style-messages';
import { URL_ROUTES } from '../../../../model/url-routes';
import { CloudService } from '../../../../service/cloud.service';
import { UserService } from '../../../../service/user/user.service';
import { MessageService } from '../../../../service/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../../../assets/scss/user.module.scss']
})
export class LoginComponent {
  loginForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
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
              this.userService.setLocalStorage(JSON.stringify(userData))
              this.router.navigate([URL_ROUTES.dashboard]).then(
                () => this.messageService.openSnackBar('Logged in', '×', PanelStyle.success)
              )
            } else {
              this.messageService.openSnackBar('Not found userID', '×', PanelStyle.error, false)
            }
          }
        )
      }
    ).catch(error => this.messageService.openSnackBar(error.message, '×', PanelStyle.error, false))
  }

  googleAuth() {
    const provider = new auth.GoogleAuthProvider()
    
    this.firebaseAuth.signInWithPopup(provider).then(
      signedInUser => {
        this.cloudService.getDataById(signedInUser.user.uid, 'users').subscribe(userData => {
          if (userData) {
            this.userService.setLocalStorage(JSON.stringify(userData))
            this.router.navigate([URL_ROUTES.dashboard]).then(
              () => this.messageService.openSnackBar('Logged in by Google', '×', PanelStyle.success)
            )
          } else {
            this.cloudService.setDocDataByID(signedInUser['uid'], signedInUser, 'users').then(
              () => {
                this.userService.setLocalStorage(JSON.stringify(signedInUser))
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
