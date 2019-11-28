import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SelectionListComponent} from "../selectionList/selection-list.component";

const routes: Routes = [
  {
    path: '',
    component: SelectionListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectionRoutingModule { }
