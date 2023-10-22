import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import { HeaderComponent } from './header/header.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { FooterComponent } from './footer/footer.component';
import { AsideComponent } from './aside/aside.component';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms'
import { BlockStyleDirective } from 'src/app/directives/block-style.directive';



@NgModule({
  declarations: [
    TicketsComponent, 
    HeaderComponent,
    TicketListComponent,
    FooterComponent,
    AsideComponent,
    BlockStyleDirective
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    MenubarModule,
    DropdownModule,
    FormsModule

  ]
})
export class TicketsModule { }
