import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/authentication/auth.guard';
import { SprintManagerComponent } from './components/sprint-manager/sprint-manager.component';
import { UserManagerComponent } from './components/user-manager/user-manager.component';
import { TeamManagerComponent } from './components/team-manager/team-manager.component';
import { StoryManagerComponent } from './components/story-manager/story-manager.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DataManagerComponent } from './components/generics/data-manager/data-manager.component';

const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'sprints', component: DataManagerComponent, canActivate: [AuthGuard] },
  { path: 'users', component: DataManagerComponent, canActivate: [AuthGuard] },
  { path: 'teams', component: DataManagerComponent, canActivate: [AuthGuard] },
  { path: 'userStories', component: DataManagerComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
