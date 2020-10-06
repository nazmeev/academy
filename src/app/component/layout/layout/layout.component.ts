import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../../service/user/user-data.service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  userData: User | undefined = new User('', '', '', '', '');

  constructor(
      private userDataService: UserDataService
  ) { }

  ngOnInit(): void {
    this.userDataService.userDataChange$.subscribe(user => this.userData = user);
  }

}
