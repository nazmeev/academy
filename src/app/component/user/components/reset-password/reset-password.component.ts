import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PanelStyle } from '../../../../enum/style-messages';
import { URL_ROUTES } from '../../../../model/url-routes';
import { UserService } from '../../../../service';
import { MessageService } from '../../../../service/message.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../../../../../assets/scss/user.module.scss']
})
export class ResetPasswordComponent{
  resetPasswordForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]]
    })
  }

  get email() {
    return this.resetPasswordForm.get('email')
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const email = this.resetPasswordForm.value.email

      this.userService.resetPassword(email).then(
        () => 
          this.router.navigate([URL_ROUTES.verifypassword]).then(
            () => this.messageService.openSnackBar('A password reset link has been sent to your email address', '×', PanelStyle.notice, false)
          )
      ).catch((error) => this.messageService.openSnackBar(error.message, '×', PanelStyle.error, false))
    } else {
      this.messageService.openSnackBar('Login form no valid', '×', PanelStyle.error, false)
    }
  }
}
