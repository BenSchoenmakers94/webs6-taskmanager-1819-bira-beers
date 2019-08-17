import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Observable } from 'rxjs';
import { DatastoreService } from 'src/app/services/datastore/datastore.service';
import { map } from 'rxjs/operators';
import { NiceTextService } from 'src/app/services/nice-text.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  public collections: Observable<any>;
  public enabled = false;

  constructor(
    public authService: AuthService,
    public textify: NiceTextService,
    private store: DatastoreService ) { }

  ngOnInit() {
    this.authService.userLogged.subscribe(x => this.enabled = x.isAdmin);
    const object = this.store.getAllCollections();
    this.collections = object.pipe(map(actions => {
      return actions.map(a => {
        const uid = a.payload.doc.id;
        return { uid };
      });
    }));
  }
}
