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
  public isLoading: boolean = false;

  constructor(
    private _countriesService: CountriesService,
  ) { }

  ngOnInit(): void {
  }

  searchByCapital(term:string):void{
    this.isLoading = true;

    this._countriesService.searchCapital(term).subscribe( countries =>{
      this.countries = countries;
      this.isLoading = false;
    })
    console.log({term});
  }
  
}
