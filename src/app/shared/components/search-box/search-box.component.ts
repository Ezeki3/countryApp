import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit {

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
  }


}
