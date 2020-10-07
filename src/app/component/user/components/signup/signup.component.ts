import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PanelStyle } from '../../../../enum/style-messages';
import { URL_ROUTES } from '../../../../model/url-routes';
import { CloudService, UserService } from '../../../../service';
import { MessageService } from '../../../../service/message.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../../../../../assets/scss/user.module.scss']
})
export class SignupComponent {
  signupForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cloudService: CloudService,
    private router: Router,
    private messageService: MessageService,
    private firebaseAuth: AngularFireAuth
  ) {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      displayName: ['', Validators.required],
      companyName: ['', Validators.required]
    })
  }

  get email() {
    return this.signupForm.get('email')
  }
  get password() {
    return this.signupForm.get('password')
  }
  get displayName() {
    return this.signupForm.get('displayName')
  }
  get companyName() {
    return this.signupForm.get('companyName')
  }

  signUp() {
    const { email, password, displayName, companyName } = this.signupForm.value
    
    this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(createdUser => {
        const registeredUser = this.userService.createUserInstance({
          uid: createdUser.user.uid,
          email: email,
          displayName: displayName,
          companyName: companyName,
          photoURL: null
        })

        this.cloudService.setDocDataByID(registeredUser.uid, { ...registeredUser }, 'users').then(
          () => {
            this.userService.setLocalStorage(JSON.stringify(registeredUser))
            this.router.navigate([URL_ROUTES.dashboard]).then(
              () => this.messageService.openSnackBar('Registered', '×', PanelStyle.success)
            )
          }
        ).catch(error => this.messageService.openSnackBar(error.message, '×', PanelStyle.error, false))
      }
      ).catch(error => this.messageService.openSnackBar(error.message, '×', PanelStyle.error, false))
  }

  signUpGoogle() {
    const provider = new auth.GoogleAuthProvider()
    
    this.firebaseAuth.signInWithPopup(provider).then(
      userGoogle => {
        const registeredUser = this.userService.createUserInstance({
          uid: userGoogle.user.uid,
          email: userGoogle.user.email,
          displayName: userGoogle.user.displayName,
          photoURL: userGoogle.user.photoURL
        })

        this.cloudService.setDocDataByID(registeredUser.uid, { ...registeredUser }, 'users').then(
          () => {
            this.userService.setLocalStorage(JSON.stringify(registeredUser))
            this.router.navigate([URL_ROUTES.dashboard]).then(
              () => this.messageService.openSnackBar('Registered', '×', PanelStyle.success)
            )
          }
        ).catch(error => this.messageService.openSnackBar(error.message, '×', PanelStyle.error, false))
      }
    ).catch(error => this.messageService.openSnackBar(error.message, '×', PanelStyle.error, false))
  }
}
