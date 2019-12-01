import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'page',
    loadChildren: () => import('../views/page/module/page.module').then(m => m.PageModule)
  },
  {
    path: 'cms/selection',
    loadChildren: () => import('../views/selection/module/selection.module').then(m => m.SelectionModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cms/selection'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
