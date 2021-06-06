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

  ajout(championnat: Championnat):Observable<any> {
    return this.http.post(this.uri+"s", championnat);
  }

  modifier(championnat: Championnat):Observable<any> {
    return this.http.put(this.uri+"s", championnat);
  }

  supprimer(idChampionnat: string):Observable<any> {
    return this.http.delete(this.uri+"/"+idChampionnat);
  }

  recherche(nom: string):Observable<Championnat[]> {
    return this.http.get<Championnat[]>(this.uri+"s/"+nom);
  }

  getChampionnats():Observable<Championnat[]> {
    return this.http.get<Championnat[]>(this.uri+"s");
  } 

  getChampionnatByNom(nom: string):Observable<Championnat> {
    return this.http.get<Championnat>(this.uri+"/nom/"+nom);
  }

  getChampionnatById(id: string):Observable<Championnat> {
    return this.http.get<Championnat>(this.uri+"/"+id);
  }
}
