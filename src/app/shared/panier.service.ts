import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nombre } from '../model/nombre.model';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  uri = "https://nodejsapitpt.herokuapp.com/api/panier"

  constructor(
    private http: HttpClient
  ) { }

  getNbPanierByMois(mois: number): Observable<Nombre> {
    return this.http.get<Nombre>(this.uri+"s/nb/mois/"+mois);
  }
}