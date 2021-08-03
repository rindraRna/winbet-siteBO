import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '../model/token.model';

@Injectable({
  providedIn: 'root'
})
export class AdministrateurService {
  uri = "https://grails-api-tpt.herokuapp.com/api/login";
  // uri = "http://localhost:8080/api/login";

  constructor(
    private http: HttpClient
  ) { }

  loginGrails(username, password):Observable<Token> {
    return this.http.post<Token>(
      this.uri, 
      {
        "username": username, 
        "password": password
      }
    );
  }

  loginNode(username, password):Observable<Token> {
    return this.http.post<Token>(
      "https://nodejsapitpt.herokuapp.com/api/administrateur/login", 
      {
        "username": username, 
        "password": password
      }
    );
  }
}
