import { Component, OnInit , EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';
import { MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { NewcontactDialogComponent } from '../newcontact-dialog/newcontact-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav: EventEmitter<void> = new EventEmitter<void>();

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
  }

  openNewContactDialog() {
    const dialogRef = this.dialog.open(NewcontactDialogComponent, {
      width: '400px'
    });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('The dialog was closed', result);
          this.openSnackBar('Contact Added', 'Navigate').onAction().subscribe(() => {
            this.router.navigate(['/contactmanager', result.id]);
          });
        }
      });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000
    });
  }

}
