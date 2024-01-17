import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CustomalertComponent } from 'src/app/components/customalert/customalert.component';
import { LoadingscreenComponent } from 'src/app/components/loadingscreen/loadingscreen.component';
import { SidetoastnotiComponent } from 'src/app/components/sidetoastnoti/sidetoastnoti.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar,
    private overlay: Overlay, private overlayref: OverlayRef, private overlayRouteRef: OverlayRef,


  ) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: 'snackBarTheme'

    });
  }
  closeExistingSnacks() {
    this.snackBar.dismiss();
  }
  openTopSideToast(message: any) {
    let horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    let verticalPosition: MatSnackBarVerticalPosition = 'top';
    this.snackBar.openFromComponent(SidetoastnotiComponent, {
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      panelClass: 'snackBarThemeTopSide',
      data: message
    });
    this.snackBar._openedSnackBarRef?.afterDismissed().subscribe((res) => {
      if (res && res.dismissedByAction === true) {
        return true;
      }
      return false;
    })
  }
  openWarningAlert(message: any) {
    return new Promise((resolve, reject) => {
      let horizontalPosition: MatSnackBarHorizontalPosition = 'end';
      let verticalPosition: MatSnackBarVerticalPosition = 'top';
      this.snackBar.openFromComponent(CustomalertComponent, {
        // horizontalPosition: horizontalPosition,
        verticalPosition: verticalPosition,
        panelClass: 'snackBarThemeWarning',
        data: message
      });

      this.snackBar._openedSnackBarRef?.afterDismissed().subscribe((res) => {
        if (res && res.dismissedByAction === true) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      })
    })

  }





  overlayDefault(msgtoshow: string) {
    return new Promise((resolve, reject) => {
      this.overlayref = this.overlay.create({
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
        hasBackdrop: true,
        backdropClass: 'loadingScreenClass',
        disposeOnNavigation: true,
      });
      const componentRef = this.overlayref.attach(new ComponentPortal(LoadingscreenComponent));
      componentRef.instance.myInput = msgtoshow;
      setTimeout(() => {
        this.overlayref.dispose();
        resolve(true)
      }, 3000);
    })
  }
  async showRoutingOverlay(msgtoshow: string) {
    this.overlayRouteRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
      backdropClass: 'loadingScreenClass',
      disposeOnNavigation: true,
    });
    const componentRef = this.overlayRouteRef.attach(new ComponentPortal(LoadingscreenComponent));
    componentRef.instance.myInput = msgtoshow;
  }
  async closeRoutingOverlay() {
    if (this.overlayRouteRef && this.overlayRouteRef.hasAttached()) {

      this.overlayRouteRef.detach();
      this.overlayRouteRef.dispose();
    }
  }

  async showOverlay(msgtoshow: string) {
    console.log(new Date(),msgtoshow);
    this.overlayref = this.overlay.create({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
      backdropClass: 'loadingScreenClass',
      disposeOnNavigation: true,
    });
    const componentRef = this.overlayref.attach(new ComponentPortal(LoadingscreenComponent));
    componentRef.instance.myInput = msgtoshow;
  }
  closeOverlay() {
    console.log(new Date(),'closeoverlayy');
    setTimeout(() => {
      this.overlayref.dispose();
    }, 3000);
    // this.overlayref.dispose();
  }


  instantCloseOverlay() {
    console.log(new Date(),'instantclose');
    
    this.overlayref.dispose();

  }

}
