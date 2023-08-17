import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/Country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];

  constructor(
    private _countriesService: CountriesService,
  ) { }

  ngOnInit(): void {
  }

  searchByCapital(term:string):void{
    this._countriesService.searchCapital(term).subscribe( countries =>{
      this.countries = countries;
    })
    console.log({term});
  }
  
}
