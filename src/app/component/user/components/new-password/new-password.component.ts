import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PanelStyle } from '../../../../enum/style-messages';
import { URL_ROUTES } from '../../../../model/url-routes';
import { MessageService } from '../../../../service/message.service';
import { UserService } from '../../../../service/user/user.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['../../../../../assets/scss/user.module.scss']
})
export class NewPasswordComponent {
  newPasswordForm: FormGroup

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {
    this.newPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required]]
    })
  }

  get password() {
    return this.newPasswordForm.get('password')
  }

  newPassword() {
    if (this.newPasswordForm.valid) {
      const password = this.newPasswordForm.value.password
      
      this.userService.sendNewPassword(password).then(
        () => {
          this.router.navigate([URL_ROUTES.login]).then(
            () => this.messageService.openSnackBar('Log In', '×', PanelStyle.success)
          )
        }
      )
    } else this.messageService.openSnackBar('Login form no valid', '×', PanelStyle.error, false)
  }

}
