import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LeftSidebarComponent} from './components/layout/left-sidebar/left-sidebar.component';
import {NavbarComponent} from './components/layout/navbar/navbar.component';
import {MaterialModule} from './modules/material.module';


@NgModule({
  declarations: [
    LeftSidebarComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    LeftSidebarComponent,
    NavbarComponent
  ]
})
export class CoreModule {
}
