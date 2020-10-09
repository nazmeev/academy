import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../../model/user';

@Injectable({providedIn: 'root'})
export class UserDataService {

    private userDataChangedSubject = new BehaviorSubject(this.getParsedUserData());
    userDataChange$ = this.userDataChangedSubject.asObservable();
    private defaultUserImage = 'https://firebasestorage.googleapis.com/v0/b/inventorsoft-academy-crm-45f71.appspot.com/o/uploads%2Fdefault?alt=media&token=e7a00e02-b3ab-4b97-8ad8-07f44954c808';

    constructor(
        private userService: UserService
    ) { }

    get getDefaultUserImage() {
        return this.defaultUserImage;
    }

    updateUserData(userData: User) {
        this.saveUserToStorage(userData);
        this.userDataChangedSubject.next(userData);
    }

    updateUserProperty(property: string, value: any) {
        const user = this.getParsedUserData();
        if (user && property in user) {
            user[property] = value;
            this.updateUserData(user);
        }
    }

    getParsedUserData(): User | null {
        const userData = this.userService.getLocalStorage('user');
        return userData ? JSON.parse(userData) : null;
    }

    saveUserToStorage(userData: User) {
        if (userData) {
            this.userService.setLocalStorage('user', JSON.stringify(userData));
        }
    }
}
