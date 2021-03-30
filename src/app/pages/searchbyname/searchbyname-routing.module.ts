import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchbynamePage } from './searchbyname.page';

const routes: Routes = [
  {
    path: '',
    component: SearchbynamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchbynamePageRoutingModule {}
