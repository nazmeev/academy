import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PanelStyle } from '../../../../enum/style-messages';
import { URL_ROUTES } from '../../../../model/url-routes';
import { MessageService } from '../../../../service/message.service';
import { UserService } from '../../../../service/user/user.service';

@Component({
  selector: 'app-verify-password',
  templateUrl: './verify-password.component.html',
  styleUrls: ['../../../../../assets/scss/user.module.scss']
})
export class VerifyPasswordComponent {
  verified: boolean = false
  verifyPasswordForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.verifyPasswordForm = this.formBuilder.group({
      code: ['', Validators.required]
    })
  }

  get code() {
    return this.verifyPasswordForm.get('code')
  }

  verifyPassword() {
    if (this.verifyPasswordForm.valid) {
      const code = this.verifyPasswordForm.value.code
      
      this.userService.verifyPassword(code).then(
        verifyResult => {
          if(verifyResult == this.userService.verifiedEmail){
            this.router.navigate([URL_ROUTES.newpassword])
          }else{
            this.messageService.openSnackBar('Something wrong. Try again', '×', PanelStyle.error, false)
          }
        }
      ).catch(error => this.messageService.openSnackBar(error.message, '×', PanelStyle.error, false)
    )
    } else {
      this.messageService.openSnackBar('Login form no valid', '×', PanelStyle.error, false)
    }
  }

}
