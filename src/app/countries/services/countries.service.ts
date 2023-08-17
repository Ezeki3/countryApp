import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/Country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'http://restcountries.com/v3.1';

  constructor(
    private htt: HttpClient
  ){}

  searchCapital( term:string): Observable<Country[]>{
    const url = `${this.apiUrl}/capital/${term}`;
    return this.htt.get<Country[]>(url);

  }

}