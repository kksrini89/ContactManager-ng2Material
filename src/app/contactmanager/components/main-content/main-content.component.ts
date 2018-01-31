import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { MatTableDataSource } from '@angular/material';
import { Note } from '../../models/note';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  user: User;
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      let id = data['id'];
      if (!id) {
        id = 1;
      }
      this.user = null;
      this.userService.Users.subscribe((users) => {
        if (users.length == 0) { return; }
        setTimeout(() => {
          this.user = this.userService.getUserById(id);
        }, 500);
      });
    });
  }

}
