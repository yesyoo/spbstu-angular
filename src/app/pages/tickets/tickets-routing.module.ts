import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent } from './tickets.component'
import { TicketListComponent } from './ticket-list/ticket-list.component';





const routes: Routes = [
  { path: '', 
    component: TicketsComponent,
    children: [
      {
        path: 'ticket-list',
        component: TicketListComponent
      },
      {
        path: 'ticket/:id',
        loadChildren:() => import('../ticket-info/ticket-info.module').then(m => m.TicketInfoModule)
      },
      {
        path: 'settings',
        loadChildren:() => import('../settings/settings.module').then(m => m.SettingsModule)
      },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
