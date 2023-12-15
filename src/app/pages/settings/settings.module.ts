import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { PasswordComponent } from './password/password.component';
import { EmptyComponent } from './empty/empty.component';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { StatisticComponent } from './statistic/statistic.component';
import { TableModule } from 'primeng/table';
import { TourComponent } from './tour/tour.component'



@NgModule({
  declarations: [
    SettingsComponent,
    PasswordComponent,
    EmptyComponent,
    StatisticComponent,
    TourComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    ToastModule,
    TableModule
  ],
  providers: [MessageService]
})
export class SettingsModule { }
