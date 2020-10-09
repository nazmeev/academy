import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PanelStyle } from '../../../../enum/style-messages';
import { URL_ROUTES } from '../../../../model/url-routes';
import { MessageService } from '../../../../service/message.service';
import { getLocalStorage, removeLocalStorage } from '../../../../utils/localstorage.utils';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['../../../../../assets/scss/user.module.scss']
})
export class NewPasswordComponent {
  newPasswordForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private firebaseAuth: AngularFireAuth
  ) {
    this.newPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get password() {
    return this.newPasswordForm.get('password')
  }

  newPassword() {
    const verifyCode = getLocalStorage('resetcode')
    const password = this.newPasswordForm.value.password

    this.firebaseAuth.confirmPasswordReset(verifyCode, password).then(
      () => {
        removeLocalStorage('resetcode')
        removeLocalStorage('resetpassword')

        this.router.navigate([URL_ROUTES.login]).then(
          () => this.messageService.openSnackBar('Log In', '×', PanelStyle.success)
        )
      }
    ).catch(error => this.messageService.openSnackBar(error.message, '×', PanelStyle.error, false))
  }

}
