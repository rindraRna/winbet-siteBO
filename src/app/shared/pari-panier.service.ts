import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PariPanier } from '../model/pari_panier.model';

@Injectable({
  providedIn: 'root'
})
export class PariPanierService {
  uri = "https://winbet-api.herokuapp.com/api/pari_panier";

  constructor(
    private http: HttpClient
  ) { }

  getPariByIdMatchAndValeur(idMatch, valeur):Observable<PariPanier[]> {
    return this.http.get<PariPanier[]>(this.uri+"/match/"+idMatch+"/valeur/"+valeur);
  } 

  modifier(match: PariPanier):Observable<any> {
    return this.http.put(this.uri+"s", match);
  }
}
