import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/authentication/auth.guard';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PropertyManagerComponent } from './components/property-manager/property-manager.component';
import { IsAdminGuard } from './guards/is-admin/is-admin.guard';
import { DataManagerComponent } from './components/generics/data-manager/data-manager.component';

const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'properties', component: PropertyManagerComponent, canActivate: [AuthGuard, IsAdminGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'archive', component: DataManagerComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
