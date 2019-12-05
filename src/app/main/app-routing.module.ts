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
    path: 'cms/overview',
    loadChildren: () => import('../views/overview/module/overview.module').then(m => m.OverviewModule)
  },
  {
    path: 'cms/code-editor',
    loadChildren: () => import('../views/codeEditor/module/code-editor.module').then(m => m.CodeEditorModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cms/selection',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
