import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SelectionListComponent} from "../selectionList/selection-list.component";
import {PresentationCreateComponent} from "../presentation/create/presentation-create.component";

const routes: Routes = [
  {
    path: '',
    component: SelectionListComponent,
  },
  {
    path: 'presentation/create',
    component: PresentationCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectionRoutingModule { }
