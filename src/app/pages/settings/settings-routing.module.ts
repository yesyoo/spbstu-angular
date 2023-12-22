import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordComponent } from './password/password.component';
import { SettingsComponent } from './settings.component';
import { EmptyComponent } from './empty/empty.component';
import { StatisticComponent } from './statistic/statistic.component';
import { TourComponent } from './tour/tour.component';
import { RoleGuard } from '../../guards/admin/role.guard';
import { AuthGuard } from '../../guards/auth/auth.guard';

const routes: Routes = [
    { 
      path: '', component: SettingsComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: '', 
          component: PasswordComponent
        },
        {
          path: 'password', 
          component: PasswordComponent
        },
        {
          path: 'statistic',
          component: StatisticComponent,
          canActivate: [RoleGuard]
        },
        {
          path: 'tour',
          component: TourComponent,
          canActivate: [RoleGuard]
        }
      ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
