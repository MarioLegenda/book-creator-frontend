import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'page',
    loadChildren: () => import('../views/page/module/page.module').then(m => m.PageModule)
  },
  {
    path: 'cms/managment/overview',
    loadChildren: () => import('../views/manager/module/manager.module').then(m => m.ManagerModule)
  },
  {
    path: 'cms/code-editor',
    loadChildren: () => import('../views/codeEditor/module/code-editor.module').then(m => m.CodeEditorModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cms/managment/overview',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
