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
import { UserStoryComponent } from './components/user-story/user-story.component';
import { SprintComponent } from './components/sprint/sprint.component';
import { SprintManagerComponent } from './components/sprint-manager/sprint-manager.component';
import { UserManagerComponent } from './components/user-manager/user-manager.component';
import { TeamManagerComponent } from './components/team-manager/team-manager.component';
import { StoryManagerComponent } from './components/story-manager/story-manager.component';
import { DataTableComponent } from './components/generics/data-table/data-table.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    WizardComponent,
    UserStoryComponent,
    SprintComponent,
    SprintManagerComponent,
    UserManagerComponent,
    TeamManagerComponent,
    StoryManagerComponent,
    DataTableComponent,
    SignInComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AngularFireModule.initializeApp(environment.firebase, 'BIRA-web-app'),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
