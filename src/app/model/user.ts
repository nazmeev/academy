import { DynamicField } from './dynamic-field';

export class User {
    displayName: string;
    companyName?: string;
    email: string;
    uid: string;
    photoURL: string;
    fields?: DynamicField[];

    constructor(
        displayName: string,
        companyName: string,
        photoURL: string,
        email: string,
        uid: string,
        fields?: DynamicField[]
    ) {
        this.displayName = displayName;
        this.companyName = companyName;
        this.photoURL    = photoURL;
        this.email       = email;
        this.uid         = uid;
        this.fields      = fields;
    }
}
