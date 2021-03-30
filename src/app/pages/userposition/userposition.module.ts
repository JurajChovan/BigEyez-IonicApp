import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserpositionPageRoutingModule } from './userposition-routing.module';

import { UserpositionPage } from './userposition.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserpositionPageRoutingModule
  ],
  declarations: [UserpositionPage]
})
export class UserpositionPageModule {}
