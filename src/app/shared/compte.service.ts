import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compte } from '../model/compte.model';
import { Nombre } from '../model/nombre.model';

@Injectable({
  providedIn: 'root'
})
export class CompteService {
  uri = "https://nodejsapitpt.herokuapp.com/api/compte";

  constructor(
    private http: HttpClient
  ) { }

  supprimer(idUtilisateur: string):Observable<any> {
    return this.http.delete(this.uri+"/"+idUtilisateur);
  }

  recherche(mot: string):Observable<Compte[]> {
    return this.http.get<Compte[]>(this.uri+"s/"+mot);
  }

  getCompte():Observable<Compte[]> {
    return this.http.get<Compte[]>(this.uri+"s");
  }

  getCompteById(id: string):Observable<Compte> {
    return this.http.get<Compte>(this.uri+"/"+id);
  }

  getNbUtilisateur():Observable<Nombre> {
    return this.http.get<Nombre>(this.uri+"s/nombre/utilisateur");
  }

  login(email, motDePasse):Observable<any> {
    return this.http.post(
      this.uri+"/login", 
      { 
        email: email,
        motDePasse: motDePasse 
      });
  }

  encaisser(idCompte, montant):Observable<any> {
    return this.http.put(
      this.uri+"/deposer", 
      { 
        id: idCompte,
        montant: montant 
      });
  }
}
