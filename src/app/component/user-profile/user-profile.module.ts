import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
/** Angular */
import { HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/** Alyle UI */
import { LY_THEME, LY_THEME_GLOBAL_VARIABLES, LY_THEME_NAME, LyHammerGestureConfig, LyTheme2, StyleRenderer } from '@alyle/ui';
import { MinimaDark, MinimaLight } from '@alyle/ui/themes/minima';
import { LyImageCropperModule } from '@alyle/ui/image-cropper';
import { LySliderModule } from '@alyle/ui/slider';
import { LyButtonModule } from '@alyle/ui/button';
import { LyIconModule } from '@alyle/ui/icon';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { GlobalVariables } from '../../utils/image-cropper.utils';

@NgModule({
    declarations: [ProfileComponent, ImageUploaderComponent],
    providers   : [
        [LyTheme2],
        [StyleRenderer],
        {
            provide : LY_THEME_NAME,
            useValue: 'minima-light'
        },
        {
            provide : LY_THEME,
            useClass: MinimaLight,
            multi   : true
        },
        {
            provide : LY_THEME,
            useClass: MinimaDark,
            multi   : true
        },
        {
            provide : LY_THEME_GLOBAL_VARIABLES,
            useClass: GlobalVariables
        },
        {
            provide : HAMMER_GESTURE_CONFIG,
            useClass: LyHammerGestureConfig
        }
    ],
    imports     : [
        CommonModule,
        UserProfileRoutingModule,
        HttpClientModule,
        AngularFireStorageModule,
        HammerModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        LyImageCropperModule,
        LySliderModule,
        LyButtonModule,
        LyIconModule,
        MatIconModule,
        MatButtonModule,
        MatDividerModule,
        MatMenuModule,
        MatInputModule
    ]
})
export class UserProfileModule {
}
