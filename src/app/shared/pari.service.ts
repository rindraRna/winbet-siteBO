import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pari } from '../model/pari.model';

@Injectable({
  providedIn: 'root'
})
export class PariService {
  uri = "http://localhost:8010/api/pari";

  constructor(
    private http: HttpClient
  ) { }

  getPariByIdMatchAndIdType(idMatch, idType):Observable<Pari[]> {
    return this.http.get<Pari[]>(this.uri+"/"+idMatch+"/"+idType);
  }  
}