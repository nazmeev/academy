import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { PanelStyle } from '../../../../enum/style-messages';
import { URL_ROUTES } from '../../../../model/url-routes';
import { MessageService } from '../../../../service/message.service';

@Component({
  selector: 'app-verify-password',
  templateUrl: './verify-password.component.html'
})
export class VerifyPasswordComponent {
  action: string
  code: string

  constructor(
    private messageService: MessageService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private firebaseAuth: AngularFireAuth
  ) {

    this.action = activateRoute.snapshot.queryParams.mode
    this.code = activateRoute.snapshot.queryParams.oobCode
    
    if(this.action == 'resetPassword' && this.code){
      this.verifyPassword()
    }
    
  }

  verifyPassword(){
    this.firebaseAuth.verifyPasswordResetCode(this.code).then(
      verifyResult => {
        localStorage.setItem('resetcode', this.code)
        let resetpassword = localStorage.getItem('resetpassword');

        (verifyResult == resetpassword)
        ? this.router.navigate([URL_ROUTES.newpassword])
        : this.messageService.openSnackBar('Something wrong. Try again', '×', PanelStyle.error, false)
      }
    ).catch(error => this.messageService.openSnackBar(error.message, '×', PanelStyle.error, false))
  }
}
