import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaitedPageRoutingModule } from './waited-routing.module';

import { WaitedPage } from './waited.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaitedPageRoutingModule
  ],
  declarations: [WaitedPage]
})
export class WaitedPageModule {}
