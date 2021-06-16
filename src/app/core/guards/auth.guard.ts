import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '@core/services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  redirectUrl = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {

  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    if (this.auth.loggedIn()) {
      return true;
    } else {

      await this.router.navigate(['auth/login']);
      this.toastr.error('', 'You have to be logged in to view that page');

      // this is the url used for redirecting after login, if user wanted to access that first
      this.redirectUrl = state.url;
      return false;
    }
  }

}
