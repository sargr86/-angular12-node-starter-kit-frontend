import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MatDrawerMode, MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public router: Router
  ) {

  }

  getMode(sidenav: MatSidenav): MatDrawerMode {
    return screen.width <= 991? 'over': 'side';
  }
}
