import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';
import { MatDrawer } from '@angular/material';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

const SMALL_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width : ${SMALL_WIDTH_BREAKPOINT}px)`);
  users: Observable<User[]>;
  @ViewChild(MatDrawer) sideNav: MatDrawer;
  constructor(zone: NgZone, private userService: UserService, private router: Router) {
    // Triggering change detection manually using zone environment
    this.mediaMatcher.addListener(msql => zone.run(() => this.mediaMatcher = msql));
  }

  ngOnInit() {
    this.users = this.userService.Users;
    this.userService.loadAll();
    this.users.subscribe(data => {
      // console.log(data);
      if (data.length > 0) {
        this.router.navigate(['/contactmanager', data[0].id]);
      }
    });
    this.router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sideNav.close();
      }
    });
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}
