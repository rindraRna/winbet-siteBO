import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Championnat } from '../model/championnat.model';

@Injectable({
  providedIn: 'root'
})
export class ChampionnatService {
  uri = "http://localhost:8010/api/championnat";
  
  constructor(
    private http: HttpClient
  ) { }

  getChampionnats():Observable<Championnat[]> {
    return this.http.get<Championnat[]>(this.uri+"s");
  } 
}
