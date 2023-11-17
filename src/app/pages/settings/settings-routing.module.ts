import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordComponent } from './password/password.component';
import { SettingsComponent } from './settings.component';
import { EmptyComponent } from './empty/empty.component';
import { StatisticComponent } from './statistic/statistic.component';

const routes: Routes = [
    { 
      path: '', component: SettingsComponent,
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
          component: StatisticComponent
        },
        {
          path: 'empty',
          component: EmptyComponent
        }
      ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
