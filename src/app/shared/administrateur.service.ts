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

  login(username, password):Observable<Token> {
    return this.http.post<Token>(
      this.uri, 
      {
        "username": username, 
        "password": password
      }
    );
  }
}
