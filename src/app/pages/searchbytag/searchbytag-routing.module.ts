import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchbytagPage } from './searchbytag.page';

const routes: Routes = [
  {
    path: '',
    component: SearchbytagPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchbytagPageRoutingModule {}
