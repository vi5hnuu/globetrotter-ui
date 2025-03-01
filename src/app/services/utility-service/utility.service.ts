import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class UtilityService {

  constructor(private snackbar:MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    return this.snackbar.open(message, action);
  }
}
