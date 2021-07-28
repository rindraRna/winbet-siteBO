import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match_paris } from '../model/match_paris.model';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  uri = "https://nodejsapitpt.herokuapp.com/api/match"; 

  constructor(
    private http: HttpClient
  ) { }

  ajoutMatch(match: Match_paris):Observable<any> {
    return this.http.post(this.uri+"s", match);
  }

  modifier(match: Match_paris):Observable<any> {
    return this.http.put(this.uri+"s", match);
  }

  supprimer(idMatch: string):Observable<any> {
    return this.http.delete(this.uri+"/"+idMatch);
  }

  getMatchs():Observable<Match_paris[]> {
    return this.http.get<Match_paris[]>(this.uri+"s");
  } 

  getMatchById(id: string):Observable<Match_paris> {
    return this.http.get<Match_paris>(this.uri+"/"+id);
  }

  rechercheMulticritere(date: Date, equipe: string, championnat: string, etat: number):Observable<Match_paris[]> {
    const uriComplet = this.uri+"s/"+date+"/"+equipe+"/"+championnat+"/"+etat;
    return this.http.get<Match_paris[]>(uriComplet);
  }

  rechercheMulticritereSansEtat(date: Date, equipe: string, championnat: string):Observable<Match_paris[]> {
    const uriComplet = this.uri+"s/"+date+"/"+equipe+"/"+championnat;
    return this.http.get<Match_paris[]>(uriComplet);
  }
}
