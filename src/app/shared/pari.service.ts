import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pari } from '../model/pari.model';

@Injectable({
  providedIn: 'root'
})
export class PariService {
  uri = "https://nodejsapitpt.herokuapp.com/api/pari";

  constructor(
    private http: HttpClient
  ) { }

  getPariByIdMatchAndValeur(idMatch, valeur):Observable<Pari> {
    return this.http.get<Pari>(this.uri+"/match/"+idMatch+"/valeur/"+valeur);
  } 

  getPariByIdMatch(idMatch):Observable<Pari[]> {
    return this.http.get<Pari[]>(this.uri+"/match/id/"+idMatch);
  } 

  modifier(pari: Pari):Observable<any> {
    return this.http.put(this.uri+"s", pari);
  }

  getPariByIdMatchAndIdType(idMatch, idType):Observable<Pari[]> {
    return this.http.get<Pari[]>(this.uri+"/"+idMatch+"/"+idType);
  }  

  ajout(pari: Pari):Observable<any> {
    return this.http.post(this.uri+"s", pari);
  }
}
