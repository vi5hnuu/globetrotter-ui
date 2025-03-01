import {ComponentFactoryResolver, Injectable, TemplateRef} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {ComponentType} from "@angular/cdk/overlay";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SnackbarComponent} from "../../components/snackbar/snackbar.component";
import {SnackbarData} from "../../modals/snackbar-data";
import {DialogData} from "../../models/dialog-data";

@Injectable()
export class UtilityService {

  constructor(private _snackBar: MatSnackBar,
              private dialog: MatDialog,
              private snackbar: MatSnackBar) { }

  openDialogModel<T, M = any, D = any>(component: ComponentType<T> | TemplateRef<T>, config: MatDialogConfig & { data?: DialogData } = {}) {
    return this.dialog.open<T, M, D>(component, {
      disableClose: true,
      width: "40rem",
      componentFactoryResolver: config.viewContainerRef?.injector?.get(ComponentFactoryResolver),
      ...config,
    });
  }

  openDefaultSnackbar(config: MatSnackBarConfig & { data: SnackbarData }) {
    return this.openSnackbar(SnackbarComponent, config);
  }

  openSnackbar<T>(component: ComponentType<T>, config: MatSnackBarConfig & { data: SnackbarData }) {
    return this.snackbar.openFromComponent(component, {
      duration: 3000,
      announcementMessage: config.data.title,
      verticalPosition: "top",
      horizontalPosition: "center",
      ...config,
      // panelClass: `mat-snack-reset${config.panelClass ? ` ${config.panelClass}` : ""}`,
    });
  }
}
