import { Component } from '@angular/core';
import { StyleRenderer } from '@alyle/ui';
import { ROOT_LYL_STYLES } from './component/user-profile/components/image-uploader/image-uploader.utils';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
    providers  : [StyleRenderer]
})
export class AppComponent {
    readonly classes = this.sRenderer.renderSheet(ROOT_LYL_STYLES, true);

    constructor(readonly sRenderer: StyleRenderer) { }

}
