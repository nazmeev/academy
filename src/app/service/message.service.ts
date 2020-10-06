import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })

export class MessageService {
  private duration: number = 2000
  private horizontalPosition: MatSnackBarHorizontalPosition = 'start'
  private verticalPosition: MatSnackBarVerticalPosition = 'top'

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(
    message: string,
    action: string,
    panelClass: string,
    hide: boolean = true
  ) {
    let options = {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [panelClass]
    }

    if (hide) { options['duration'] = this.duration }

    this._snackBar.open(message, action, options)
  }
}
