import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { UserActions } from '../../../../enum/user-actions';
import { PanelStyle } from '../../../../enum/style-messages';
import { URL_ROUTES } from '../../../../model/url-routes';
import { MessageService } from '../../../../service/message.service';
import { getLocalStorage, setLocalStorage } from '../../../../utils/localstorage.utils';

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
    const params = activateRoute.snapshot.queryParams
    this.action = params.mode
    this.code = params.oobCode
    
    if(this.action == UserActions.resetPassword && this.code){
      this.verifyPassword()
    }
  }

  verifyPassword(){
    this.firebaseAuth.verifyPasswordResetCode(this.code).then(
      verifyResult => {
        setLocalStorage('resetcode', this.code)
        let resetpassword = getLocalStorage('resetpassword');

        (verifyResult == resetpassword)
        ? this.router.navigate([URL_ROUTES.newpassword])
        : this.messageService.openSnackBar('Something wrong. Try again', '×', PanelStyle.error, false)
      }
    ).catch(error => this.messageService.openSnackBar(error.message, '×', PanelStyle.error, false))
  }
}
