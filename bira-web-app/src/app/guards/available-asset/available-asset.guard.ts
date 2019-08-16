import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AvailableAssetGuard implements CanActivate {

  constructor(private router: Router , private store: DatastoreService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const id = next.params.id;
      const type = next.parent.routeConfig.path;
      return this.store.checkIfObjectExists(type, id).then(doc => {
        if (doc.exists) {
          return true;
        } else {
          this.router.navigateByUrl('/AssetNotAvailable' );
          return false;
        }
      });
  }
}
