import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MytagsPage } from './mytags.page';

const routes: Routes = [
  {
    path: '',
    component: MytagsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MytagsPageRoutingModule {}
