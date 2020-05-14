import {Component, OnInit} from '@angular/core';
import {BlogRepository} from "../../../../repository/BlogRepository";
import {HttpModel} from "../../../../model/http/HttpModel";
import {Item} from "../../shared/listingFilter/Item";
import {Pagination} from "../../shared/Pagination";
import {BlogState} from "../../../../logic/BlogState";

@Component({
  selector: 'cms-knowledge-sources-listing',
  styleUrls: [
    './knowledge-sources-listing.component.scss',
  ],
  templateUrl: './knowledge-source-listing.component.html',
})
export class KnowledgeSourceListingComponent implements OnInit {
  items = [];
  filters: Item[] = [
    new Item('published', 'Published'),
    new Item('draft', 'Draft'),
    new Item('changed', 'Changed'),
  ];
  paginationPossible = false;
  selectedStates: string[] = [];

  pagination: Pagination = new Pagination(10, 1);
  private searchTerm: string = null;

  constructor(
    private blogRepository: BlogRepository,
  ) {}

  ngOnInit() {
    this.setDefaultStates();
    this.getInitialItems();
  }

  onStateChange(states: string[]): void {
    this.pagination.page = 1;
    this.selectedStates = states;

    if (this.selectedStates.length === 0) {
      return this.getInitialItems();
    }

    this.blogRepository.getBlogs(this.pagination, this.selectedStates).subscribe((blogs) => {
      this.items = blogs;
    });
  }

  onItemDeleted(item): void {
    const idx: number = this.items.findIndex((val) => {
      return val.uuid === item.uuid;
    });

    this.items.splice(idx, 1);

    const uuids = this.items.map((item) => {
      return item.uuid;
    });

    const model = HttpModel.getNextBlog(uuids, this.searchTerm);

    this.blogRepository.getNext(model, this.selectedStates).subscribe((item) => {
      if (item) this.items.push(item);
    });
  }

  onSearchTerm($event: string) {
    if ($event) {
      this.searchTerm = ($event === '@no-title') ? '' : $event;
      this.search($event, 1);
    } else {
      this.searchTerm = null;
      this.getInitialItems();
    }
  }

  onMoreItems() {
    ++this.pagination.page;

    if (this.searchTerm) {
      return this.search(this.searchTerm, this.pagination.page, true);
    }

    this.blogRepository.getBlogs(this.pagination, this.selectedStates).subscribe((res) => {
      for (const entry of res) {
        this.items.push(entry);
      }

      if (res.length < this.pagination.size) {
        this.paginationPossible = false;
      }
    });
  }

  private search(searchTerm: string, page: number, append = false) {
    const model = HttpModel.searchBlogs({
      size: this.pagination.size,
      page: page,
    }, searchTerm);

    this.blogRepository.search(model).subscribe((res) => {
      if (append) {
        for (const entry of res) {
          this.items.push(entry);
        }
      } else {
        this.items = res;
      }

      if (res.length < this.pagination.size) {
        this.paginationPossible = false;
      } else if (res.length >= this.pagination.size) {
        this.paginationPossible = true;
      }
    });
  }

  private getInitialItems() {
    this.blogRepository.getBlogs(this.pagination, this.selectedStates).subscribe((res) => {
      this.items = res;

      if (this.items.length >= this.pagination.size) {
        this.paginationPossible = true;
      }

      if (this.items.length === 0) {
        this.paginationPossible = false;
      }
    });
  }

  private setDefaultStates(): void {
    if (this.selectedStates.length === 0) {
      this.selectedStates = BlogState.toArray();
    }
  }
}
