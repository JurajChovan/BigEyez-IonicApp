import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MypositionPage } from './myposition.page';

const routes: Routes = [
  {
    path: '',
    component: MypositionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MypositionPageRoutingModule {}
