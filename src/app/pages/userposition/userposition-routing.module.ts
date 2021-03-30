import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserpositionPage } from './userposition.page';

const routes: Routes = [
  {
    path: '',
    component: UserpositionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserpositionPageRoutingModule {}
