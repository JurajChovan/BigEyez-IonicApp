/* ------------------------------------------------------------------------------------------------------------ */
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
/* ------------------------------------------------------------------------------------------------------------ */
const routes: Routes = [
  /* ------------------------------------------------------------------------------------------------------------ */
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  /* ------------------------------------------------------------------------------------------------------------ */
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  /* ------------------------------------------------------------------------------------------------------------ */
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  /* ------------------------------------------------------------------------------------------------------------ */
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  /* ------------------------------------------------------------------------------------------------------------ */
  {
    path: 'mytags',
    loadChildren: () => import('./pages/mytags/mytags.module').then( m => m.MytagsPageModule)
  },
  /* ------------------------------------------------------------------------------------------------------------ */
  {
    path: 'myposition',
    loadChildren: () => import('./pages/myposition/myposition.module').then( m => m.MypositionPageModule)
  },
  /* ------------------------------------------------------------------------------------------------------------ */
  {
    path: 'accepted',
    loadChildren: () => import('./pages/accepted/accepted.module').then( m => m.AcceptedPageModule)
  },
  /* ------------------------------------------------------------------------------------------------------------ */
  {
    path: 'waited',
    loadChildren: () => import('./pages/waited/waited.module').then( m => m.WaitedPageModule)
  },
  /* ------------------------------------------------------------------------------------------------------------ */
  {
    path: 'removed',
    loadChildren: () => import('./pages/removed/removed.module').then( m => m.RemovedPageModule)
  },
  /* ------------------------------------------------------------------------------------------------------------ */
  {
    path: 'banned',
    loadChildren: () => import('./pages/banned/banned.module').then( m => m.BannedPageModule)
  },
  /* ------------------------------------------------------------------------------------------------------------ */
  {
    path: 'me',
    loadChildren: () => import('./pages/me/me.module').then( m => m.MePageModule)
  },
  /* ------------------------------------------------------------------------------------------------------------ */
  {
    path: 'buddy/:BuddyID',
    loadChildren: () => import('./pages/buddy/buddy.module').then( m => m.BuddyPageModule)
  },
  /* ------------------------------------------------------------------------------------------------------------ */
  {
    path: 'buddies',
    loadChildren: () => import('./pages/buddies/buddies.module').then( m => m.BuddiesPageModule)
  },
  /* ------------------------------------------------------------------------------------------------------------ */
  {
    path: 'searchbyname',
    loadChildren: () => import('./pages/searchbyname/searchbyname.module').then( m => m.SearchbynamePageModule)
  },
  /* ------------------------------------------------------------------------------------------------------------ */
  {
    path: 'searchbytag',
    loadChildren: () => import('./pages/searchbytag/searchbytag.module').then( m => m.SearchbytagPageModule)
  },
  /* ------------------------------------------------------------------------------------------------------------ */
  {
    path: 'userposition/:UserID',
    loadChildren: () => import('./pages/userposition/userposition.module').then( m => m.UserpositionPageModule)
  }
  /* ------------------------------------------------------------------------------------------------------------ */
];
/* ------------------------------------------------------------------------------------------------------------ */
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
/* ------------------------------------------------------------------------------------------------------------ */
export class AppRoutingModule {}
/* ------------------------------------------------------------------------------------------------------------ */
