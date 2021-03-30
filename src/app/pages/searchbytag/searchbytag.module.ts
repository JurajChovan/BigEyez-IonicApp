import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchbytagPageRoutingModule } from './searchbytag-routing.module';

import { SearchbytagPage } from './searchbytag.page';
// JCHO: pridan�:
import { ReactiveFormsModule } from '@angular/forms';
// JCHO: pridan�

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchbytagPageRoutingModule,
    // JCHO: pridan�:
    ReactiveFormsModule
    // JCHO: pridan�
  ],
  declarations: [SearchbytagPage]
})
export class SearchbytagPageModule {}
