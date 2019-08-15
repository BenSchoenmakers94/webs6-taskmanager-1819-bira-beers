import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/authentication/auth.guard';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DataManagerComponent } from './components/generics/data-manager/data-manager.component';
import { CreateComponent } from './components/generics/create/create.component';

const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'sprints', component: DataManagerComponent, canActivate: [AuthGuard], 
  children: [
    { path: 'add', component: CreateComponent, canActivate: [AuthGuard] },
  ] },
  { path: 'users', component: DataManagerComponent, canActivate: [AuthGuard], 
  children: [
    { path: 'add', component: CreateComponent, canActivate: [AuthGuard] },
  ] },
  { path: 'teams', component: DataManagerComponent, canActivate: [AuthGuard], 
  children: [
    { path: 'add', component: CreateComponent, canActivate: [AuthGuard] },
  ] },
  { path: 'userStories', component: DataManagerComponent, canActivate: [AuthGuard], 
  children: [
    { path: 'add', component: CreateComponent, canActivate: [AuthGuard] },
  ] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
