import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchbynamePageRoutingModule } from './searchbyname-routing.module';

import { SearchbynamePage } from './searchbyname.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchbynamePageRoutingModule
  ],
  declarations: [SearchbynamePage]
})
export class SearchbynamePageModule {}
