import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Observable, Subject } from 'rxjs';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { map, takeUntil } from 'rxjs/operators';
import { NiceTextService } from 'src/app/services/nice-text.service';
import { Router } from '@angular/router';
import { DataManagerComponent } from '../generics/data-manager/data-manager.component';
import { AuthGuard } from 'src/app/guards/authentication/auth.guard';
import { CreateComponent } from '../generics/create/create.component';
import { EditComponent } from '../generics/edit/edit.component';
import { AvailableAssetGuard } from 'src/app/guards/available-asset/available-asset.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public collections: Observable<any>;
  public enabled = false;

  private unSubscribe = new Subject();
  
  constructor(
    public authService: AuthService,
    public textify: NiceTextService,
    private router: Router,
    private store: DatastoreService) { }

  ngOnInit() {
    this.authService.userLogged.pipe(takeUntil(this.unSubscribe)).subscribe(x => this.enabled = x.isAdmin);
    const object = this.store.getAllCollections('properties');
    this.collections = object.pipe(map(actions => {
      return actions.map(a => {
        const uid = a.payload.doc.id;
        return { uid };
      });
    }));
    this.collections.subscribe(routes => this.populateRoutes(routes));
  }

  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  populateRoutes(routes: any[]) {
    routes.forEach(route => {
      let canAdd = true;
      this.router.config.forEach(configRoute => {
        if (configRoute.path === route.uid) {
          canAdd = false;
        }
      });
      if (canAdd) { this.router.config.unshift(this.createPath(route.uid)); }
    });
  }

  createPath(objectName: any) {
    return {
      path: objectName, component: DataManagerComponent, canActivate: [AuthGuard],
      children: [
        { path: 'add', component: CreateComponent, canActivate: [AuthGuard] },
        { path: ':id', component: EditComponent, canActivate: [AuthGuard, AvailableAssetGuard] }
      ]
    };
  }
}
