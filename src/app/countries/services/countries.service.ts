import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/Country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital:   { term:'', countries:[]},
    byCountries: { term:'', countries:[]},
    byRegion:    { region:'', countries:[]}
  }

  constructor(
    private htt: HttpClient,
  ){
    this.loadFromLocalStorage(); //una vez que tengamos algo en localStorage podemos cargarlo
  }

  private saveToLocalStorage(){
    localStorage.setItem( 'cacheStore', JSON.stringify(this.cacheStore));

  }

  private loadFromLocalStorage(){
    if ( !localStorage.getItem('cacheStore')) return //si no tenemos nada se sale de aqui
    
    this.cacheStore = JSON.parse(localStorage.getItem( 'cacheStore' )! ) //recuperamos la data y la asignamos 
  }
  
  private getCountriesRequest(url:string): Observable<Country[]>{
    return this.htt.get<Country[]>(url)
      .pipe(
        catchError ( error => of([])), //atrapamos el error y mandamos un array vacio
        // delay(1000),
      );
  }

  // Recibimos varios countrys
  searchCountryByAlphaCode( code:string): Observable<Country | null>{
    const url = `${this.apiUrl}/alpha/${code}`;

    // pero enviamos solo uno
    return this.htt.get<Country[]>(url)
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null),
        catchError ( error => of(null) 
        )
      );

  }

  searchCapital( term:string): Observable<Country[]>{
    const url = `${this.apiUrl}/capital/${term}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCapital = {term, countries}), // para hacer persistente la data en las busquedas
        tap( () => this.saveToLocalStorage() ) //guardamos la data en el localStorage
      )
  }

  searchCountry( term:string): Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCountries = { term,  countries}), // para hacer persistente la data en las busquedas
        tap( () => this.saveToLocalStorage() )
      )
  }

  searchRegion( region:Region): Observable<Country[]>{
    const url = `${this.apiUrl}/region/${region}`;

    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byRegion = { region , countries}), // para hacer persistente la data en las busquedas
      tap( () => this.saveToLocalStorage() )
    )


  }

}