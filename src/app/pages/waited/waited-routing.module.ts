import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaitedPage } from './waited.page';

const routes: Routes = [
  {
    path: '',
    component: WaitedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaitedPageRoutingModule {}
