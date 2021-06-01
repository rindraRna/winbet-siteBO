import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipe } from '../model/equipe.model';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  uri = "https://winbet-api.herokuapp.com/api/equipe";
  
  constructor(
    private http: HttpClient
  ) { }

  getEquipes():Observable<Equipe[]> {
    return this.http.get<Equipe[]>(this.uri+"s");
  } 

  getEquipeByNom(nom: string):Observable<Equipe> {
    return this.http.get<Equipe>(this.uri+"/"+nom);
  }
}
