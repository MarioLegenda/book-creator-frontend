import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/cms/module/cms.module').then((m) => {
      return m.CmsModule
    })
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    component: AppComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
