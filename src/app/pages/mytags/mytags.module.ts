import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MytagsPageRoutingModule } from './mytags-routing.module';

import { MytagsPage } from './mytags.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MytagsPageRoutingModule,
  ],
  declarations: [MytagsPage]
})
export class MytagsPageModule {}
