import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";
import {SnackbarData} from "../../modals/snackbar-data";

@Component({
  selector: 'gt-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data:SnackbarData,public snackRef:MatSnackBarRef<SnackbarComponent>) {
  }

  closeSnackbar(){
    this.snackRef.dismiss();
  }

}
