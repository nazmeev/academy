import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { CloudService } from '../../../../service';
import { Router } from '@angular/router';
import { MessageService } from '../../../../service/message.service';
import { User } from '../../../../model/user';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImgCropperConfig, ImgCropperErrorEvent, ImgCropperEvent, LyImageCropper } from '@alyle/ui/image-cropper';
import { StyleRenderer, WithStyles } from '@alyle/ui';
import { Platform } from '@angular/cdk/platform';
import { PanelStyle } from '../../../../enum/style-messages';
import { UserDataService } from '../../../../service/user/user-data.service';
import { imageCropperConfig, scaleConfig } from '../../../../utils/image-cropper.utils';
import { UPLOADER_LYL_STYLES } from './image-uploader.utils';

@Component({
    selector: 'app-image-uploader',
    templateUrl: './image-uploader.component.html',
    styleUrls: ['./image-uploader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageUploaderComponent implements OnInit, WithStyles, AfterViewInit {
    userFirestore = {
        photoURL: ''
    };
    showImgName: string;
    userData: User | null;
    form: FormGroup;
    classes = this.sRenderer.renderSheet(UPLOADER_LYL_STYLES);
    croppedImage?: string;
    scale: number;
    ready: boolean;
    minScale: number;
    @ViewChild(LyImageCropper, {static: true}) readonly cropper: LyImageCropper;
    myConfig: ImgCropperConfig = imageCropperConfig;

    constructor(private storage: AngularFireStorage,
                private cloudService: CloudService,
                private router: Router,
                private messageService: MessageService,
                private userDataService: UserDataService,
                private dialogRef: MatDialogRef<ImageUploaderComponent>,
                private dialog: MatDialog,
                private builder: FormBuilder,
                readonly sRenderer: StyleRenderer,
                private platform: Platform,
                @Inject(MAT_DIALOG_DATA) data) {
        dialogRef.disableClose = true;
        this.form = this.builder.group({
            files: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.getUserData();
    }

    ngAfterViewInit() {
        if (this.platform.isBrowser) {
            this.cropper.setImageUrl(
                '',
                () => {
                    this.cropper.setScale(scaleConfig.scale, true);
                    this.cropper.updatePosition(scaleConfig.position.x, scaleConfig.position.y);
                }
            );
        }
    }

    closeModal() {
        this.dialog.closeAll();
    }

    onCropped(e: ImgCropperEvent) {
        const id = this.userData.uid;
        const filePath = `uploads/profile_${id}`;
        this.croppedImage = e.dataURL;
        this.storage.ref(filePath).putString(this.croppedImage, 'data_url')
            .then(res => {
                res.ref.getDownloadURL().then(imageUrl => {
                    this.userFirestore.photoURL = imageUrl;
                    this.cloudService.updateData(id, this.userFirestore, 'users')
                        .then(() => {
                            this.userDataService.updateUserProperty('photoURL', imageUrl);
                            this.messageService.openSnackBar('Image successfully uploaded', '×', PanelStyle.success);
                        })
                        .catch(() => this.messageService.openSnackBar('Failed to upload image', '×', PanelStyle.error));
                });
            });
        this.dialog.closeAll();
    }

    onLoaded(e: ImgCropperEvent) {
        this.showImgName = e.name;
        this.cropper.fitToScreen();
    }

    onError(e: ImgCropperErrorEvent) {
        console.warn(`'${e.name}' is not a valid image`, e);
    }

    getUserData() {
        this.userData = this.userDataService.getParsedUserData();
    }
}
