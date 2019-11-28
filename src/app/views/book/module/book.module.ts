import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {CreateBookComponent} from "../createBook/create-book.component";
import {RouterModule} from "@angular/router";
import {BookRoutingModule} from "./book-routing.module";
import {BookViewComponent} from "../bookView/book-view.component";

@NgModule({
  declarations: [
    BookViewComponent,
    CreateBookComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BookRoutingModule,
  ],
  providers: [],
})
export class BookModule { }
