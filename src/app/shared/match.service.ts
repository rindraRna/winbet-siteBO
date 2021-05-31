import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match_paris } from '../model/match_paris.model';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  uri = "https://winbet-api.herokuapp.com/api/match"; 

  constructor(
    private http: HttpClient
  ) { }

  getMatchs():Observable<Match_paris[]> {
    return this.http.get<Match_paris[]>(this.uri+"s");
  } 

  getMatchById(id: string):Observable<Match_paris> {
    return this.http.get<Match_paris>(this.uri+"/"+id);
  }

  rechercheMulticritere(date: Date, equipe: string, championnat: string, etat: number):Observable<Match_paris[]> {
    const uriComplet = this.uri+"s/"+date+"/"+equipe+"/"+championnat+"/"+etat;
    console.log("uriComplet: "+uriComplet)
    return this.http.get<Match_paris[]>(uriComplet);
  }

  rechercheMulticritereSansEtat(date: Date, equipe: string, championnat: string):Observable<Match_paris[]> {
    const uriComplet = this.uri+"s/"+date+"/"+equipe+"/"+championnat;
    console.log("uriComplet sans etat: "+uriComplet)
    return this.http.get<Match_paris[]>(uriComplet);
  }
}
