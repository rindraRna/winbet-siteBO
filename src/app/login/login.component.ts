import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministrateurService } from '../shared/administrateur.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  identifiant = "Rindra";
  motDePasse = "rindraMdp";
  resourcesLoaded = false;
  comsErr = false;

  constructor(
    private router:Router,
    private administrateurService: AdministrateurService
  ) { }

  ngOnInit(): void {
  }

  seConnecter(){
    this.resourcesLoaded = true
    this.administrateurService.login(this.identifiant, this.motDePasse)
    .subscribe( 
      data => {
        sessionStorage.setItem('token', data.access_token)
        sessionStorage.setItem('nomUser', data.username)
        this.router.navigate(['/accueil']).then(() => {
          window.location.reload()
        })
      }, err => {
        console.log("erreur login: "+JSON.stringify(err))
        this.comsErr = true
        this.resourcesLoaded = false
      } 
    )
  }

}
