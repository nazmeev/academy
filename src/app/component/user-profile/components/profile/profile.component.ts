import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CloudService } from '../../../../service';
import { MessageService } from '../../../../service/message.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageUploaderComponent } from '../image-uploader/image-uploader.component';
import { PanelStyle } from '../../../../enum/style-messages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { UserDataService } from '../../../../service/user/user-data.service';
import { User } from '../../../../model/user';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
    @ViewChild('displayNameMenuTrigger', {read: MatMenuTrigger}) trigger: MatMenuTrigger;
    userData: User | null;
    editUserForm: FormGroup;
    private userDataChangesSub: Subscription;

    constructor(private cloudService: CloudService,
                private messageService: MessageService,
                private userDataService: UserDataService,
                private dialog: MatDialog,
                private fb: FormBuilder) {
        this.editUserForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required]
        });
    }

    get getFirstName() {
        return this.editUserForm.get('firstName');
    }

    get getLastName() {
        return this.editUserForm.get('lastName');
    }

    ngOnInit() {
        this.listenUserDataChanges();
        this.patchEditForm();
    }

    patchEditForm() {
        const [firstName, lastName] = this.userData.displayName.split(' ');
        this.editUserForm.patchValue({
            ...this.userData,
            firstName,
            lastName
        });
    }

    openModal(): void {
        this.dialog.open(ImageUploaderComponent, {
            width: '450px',
            panelClass: 'image-uploader-dialog'
        });
    }

    onDisplayNameChange() {
        const displayName = `${this.getFirstName.value} ${this.getLastName.value}`;
        this.updateUserData(
            {displayName},
            () => {
                this.messageService.openSnackBar('Success Your name was successfully updated.', '×', PanelStyle.success);
                this.closeEdit();
            },
            () => this.messageService.openSnackBar('Failed to upload name', '×', PanelStyle.error)
        );
    }

    closeEdit() {
        this.trigger.closeMenu();
    }

    setDefaultImg() {
        const photoURL = this.userDataService.getDefaultUserImage;
        this.updateUserData(
            {photoURL},
            () => this.messageService.openSnackBar('Success Your photo was successfully updated.', '×', PanelStyle.success),
            () => this.messageService.openSnackBar('Failed to upload photo', '×', PanelStyle.error)
        );
    }

    ngOnDestroy() {
        if (this.userDataChangesSub) {
            this.userDataChangesSub.unsubscribe();
        }
    }

    private listenUserDataChanges() {
        this.userDataChangesSub = this.userDataService.userDataChange$.subscribe(user => this.userData = user);
    }

    private updateUserData(partialUserData, successCb: () => any, errorCb: () => any) {
        this.cloudService.updateData(this.userData.uid, partialUserData, 'users')
            .then(() => {
                this.cloudService.getDataById(this.userData.uid, 'users')
                    .pipe(first())
                    .subscribe(userData => this.userDataService.updateUserData(userData));
                successCb();
            })
            .catch(() => errorCb());
    }
}
