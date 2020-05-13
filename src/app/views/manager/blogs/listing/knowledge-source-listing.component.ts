import {Component, OnInit} from '@angular/core';
import {BlogRepository} from "../../../../repository/BlogRepository";
import {HttpModel} from "../../../../model/http/HttpModel";
import {Item} from "../../shared/listingFilter/Item";

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

  readonly size: number = 10;
  private currentPage: number = 1;
  private searchTerm: string = null;

  constructor(
    private blogRepository: BlogRepository,
  ) {}

  ngOnInit() {
    this.getInitialItems();
  }

  onStateChange(states: string[]): void {
    this.selectedStates = states;

    if (this.selectedStates.length === 0) {
      return this.getInitialItems();
    }

    const model = HttpModel.queryFiltersModel(this.selectedStates);

    this.blogRepository.sortByState(model).subscribe((blogs) => {
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

    this.blogRepository.getNext(model).subscribe((item) => {
      if (item) this.items.push(item);
    })
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
    ++this.currentPage;

    if (this.searchTerm) {
      return this.search(this.searchTerm, this.currentPage, true);
    }

    this.blogRepository.getBlogs(this.size, this.currentPage).subscribe((res) => {
      for (const entry of res) {
        this.items.push(entry);
      }

      if (res.length < this.size) {
        this.paginationPossible = false;
      }
    });
  }

  private search(searchTerm: string, page: number, append = false) {
    const model = HttpModel.searchBlogs({
      size: this.size,
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

      if (res.length < this.size) {
        this.paginationPossible = false;
      } else if (res.length >= this.size) {
        this.paginationPossible = true;
      }
    });
  }

  private getInitialItems() {
    this.blogRepository.getBlogs(this.size, this.currentPage).subscribe((res) => {
      this.items = res;

      if (this.items.length >= this.size) {
        this.paginationPossible = true;
      }

      if (this.items.length === 0) {
        this.paginationPossible = false;
      }
    });
  }
}
