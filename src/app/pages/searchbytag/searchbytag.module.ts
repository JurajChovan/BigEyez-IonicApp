import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchbytagPageRoutingModule } from './searchbytag-routing.module';

import { SearchbytagPage } from './searchbytag.page';
// JCHO: pridané:
import { ReactiveFormsModule } from '@angular/forms';
// JCHO: pridané

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchbytagPageRoutingModule,
    // JCHO: pridané:
    ReactiveFormsModule
    // JCHO: pridané
  ],
  declarations: [SearchbytagPage]
})
export class SearchbytagPageModule {}
