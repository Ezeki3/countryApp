import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/Country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public initialValue: string = '';

  constructor(
    private _countriesService: CountriesService,
  ) { }

  ngOnInit(): void {
    this.countries = this._countriesService.cacheStore.byCountries.countries;
    this.initialValue = this._countriesService.cacheStore.byCountries.term;
  }

  searchByCountry(term:string):void{
    this._countriesService.searchCountry(term).subscribe( countries =>{
      this.countries = countries;
    })
    console.log({term});
  }

}
