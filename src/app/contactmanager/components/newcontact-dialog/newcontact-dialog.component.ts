import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { User } from '../../models/user';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-newcontact-dialog',
  templateUrl: './newcontact-dialog.component.html',
  styleUrls: ['./newcontact-dialog.component.scss']
})
export class NewcontactDialogComponent implements OnInit {
  user: User;
  avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4'];
  name = new FormControl('', [Validators.required, Validators.email]);

  constructor(private dialogRef: MatDialogRef<NewcontactDialogComponent>, private userService: UserService) {
    this.user = new User();
   }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }

  save() {
    this.userService.addUser(this.user).then((user) => {
      this.dialogRef.close(user);
    });
  }

  dismiss() {
    this.dialogRef.close();
  }

}
