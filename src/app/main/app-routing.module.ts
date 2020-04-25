import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from "../views/notFound/not-found.component";

const routes: Routes = [
  {
    path: 'page',
    loadChildren: () => import('../views/page/module/page.module').then(m => m.PageModule)
  },
  {
    path: 'cms/management',
    loadChildren: () => import('../views/manager/module/manager.module').then(m => m.ManagerModule)
  },
  {
    path: 'cms/code-editor',
    loadChildren: () => import('../views/codeEditor/module/code-editor.module').then(m => m.CodeEditorModule)
  },
  {
    path: 'cms/session/code-editor',
    loadChildren: () => import('../views/codeEditor/module/code-editor.module').then(m => m.CodeEditorModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cms/management',
  },
  {path: 'cms/management/404', component: NotFoundComponent},
  {path: '**', redirectTo: 'cms/management/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
