import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LayoutModule } from './component/layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { IMAGE_UPLOADER_PROVIDERS } from './component/user-profile/components/image-uploader/image-uploader.utils';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    LayoutModule,
    HttpClientModule,
    HammerModule,
  ],
  providers: [
      ...IMAGE_UPLOADER_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
