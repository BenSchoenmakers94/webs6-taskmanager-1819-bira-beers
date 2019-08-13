import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/authentication/auth.guard';
import { SprintManagerComponent } from './components/sprint-manager/sprint-manager.component';
import { UserManagerComponent } from './components/user-manager/user-manager.component';
import { TeamManagerComponent } from './components/team-manager/team-manager.component';
import { StoryManagerComponent } from './components/story-manager/story-manager.component';

const routes: Routes = [
  { path: 'profile', component: UserProfileComponent },
  { path: 'sprints', component: SprintManagerComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserManagerComponent, canActivate: [AuthGuard] },
  { path: 'teams', component: TeamManagerComponent, canActivate: [AuthGuard] },
  { path: 'backlog', component: StoryManagerComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
