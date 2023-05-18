import { Component, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {
  @Output() filterEmitter: EventEmitter<string> = new EventEmitter<string>();

  filter: string = '';
  constructor() { }

  emitFilter(filter: string) {
    this.filterEmitter.emit(filter);
  }
}