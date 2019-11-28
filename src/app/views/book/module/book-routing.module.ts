import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateBookComponent} from "../createBook/create-book.component";
import {BookViewComponent} from "../bookView/book-view.component";

const routes: Routes = [
  {
    path: '',
    component: BookViewComponent,
  },
  {
    path: 'create',
    component: CreateBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
