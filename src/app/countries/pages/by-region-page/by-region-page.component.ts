import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/Country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];

  constructor(
    private _countriesService: CountriesService,
  ) { }

  ngOnInit(): void {
  }

  searchByRegion(region:string):void{
    this._countriesService.searchRegion(region).subscribe( countries =>{
      this.countries = countries;
    })
    console.log({region});
  }

}
