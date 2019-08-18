import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AngularMaterialModule } from './angular-material.module';
import { WizardComponent } from './components/wizard/wizard.component';
import { DataTableComponent } from './components/generics/data-table/data-table.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DataDetailComponent } from './components/generics/data-detail/data-detail.component';
import { DataManagerComponent } from './components/generics/data-manager/data-manager.component';
import { CreateComponent } from './components/generics/create/create.component';
import { EditComponent } from './components/generics/edit/edit.component';
import { ChartComponent } from './components/chart/chart.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PropertyManagerComponent } from './components/property-manager/property-manager.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    WizardComponent,
    DataTableComponent,
    SignInComponent,
    PageNotFoundComponent,
    DataDetailComponent,
    DataManagerComponent,
    CreateComponent,
    EditComponent,
    ChartComponent,
    KanbanBoardComponent,
    PropertyManagerComponent
  ],
  entryComponents: [
    DataManagerComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AngularFireModule.initializeApp(environment.firebase, 'BIRA-web-app'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AppRoutingModule,
    DragDropModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
