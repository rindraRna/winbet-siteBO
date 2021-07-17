import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipe } from '../model/equipe.model';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  uri = "https://nodejsapitpt.herokuapp.com/api/equipe";
  
  constructor(
    private http: HttpClient
  ) { }

  ajout(equipe: Equipe):Observable<any> {
    return this.http.post(this.uri+"s", equipe);
  }

  modifier(equipe: Equipe):Observable<any> {
    return this.http.put(this.uri+"s", equipe);
  }

  supprimer(idequipe: string):Observable<any> {
    return this.http.delete(this.uri+"/id/"+idequipe);
  }

  getEquipes():Observable<Equipe[]> {
    return this.http.get<Equipe[]>(this.uri+"s");
  } 

  getEquipeByNom(nom: string):Observable<Equipe> {
    return this.http.get<Equipe>(this.uri+"/"+nom);
  }

  getEquipeById(id: string):Observable<Equipe> {
    return this.http.get<Equipe>(this.uri+"/id/"+id);
  }

  recherche(nom: string):Observable<Equipe[]> {
    return this.http.get<Equipe[]>(this.uri+"s/"+nom);
  }
}
