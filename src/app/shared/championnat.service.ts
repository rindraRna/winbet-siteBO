import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Championnat } from '../model/championnat.model';

@Injectable({
  providedIn: 'root'
})
export class ChampionnatService {
  uri = "https://winbet-api.herokuapp.com/api/championnat";
  
  constructor(
    private http: HttpClient
  ) { }

  getChampionnats():Observable<Championnat[]> {
    return this.http.get<Championnat[]>(this.uri+"s");
  } 

  getChampionnatByNom(nom: string):Observable<Championnat> {
    return this.http.get<Championnat>(this.uri+"/nom/"+nom);
  }
}
