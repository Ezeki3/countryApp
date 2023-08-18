import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/Country';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styles: [
  ]
})
export class CountryTableComponent implements OnInit {

  @Input()
  public countries: Country[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
