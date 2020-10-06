import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { PanelStyle } from '../../../../enum/style-messages';
import { URL_ROUTES } from '../../../../model/url-routes';
import { UserService } from '../../../../service';
import { MessageService } from '../../../../service/message.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private firebaseAuth: AngularFireAuth,
    private messageService: MessageService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.firebaseAuth.signOut().then(
      () => {
        this.userService.removeLocalStorage()

        this.router.navigate([URL_ROUTES.login]).then(
          () => this.messageService.openSnackBar('Logged Out', '×', PanelStyle.success)
        )

      }
    )
  }

}
