import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministrateurService } from '../../shared/administrateur.service';

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
  nodeOK = false

  constructor(
    private router:Router,
    private administrateurService: AdministrateurService
  ) { }

  ngOnInit(): void {
  }

  loginNode(){
    this.administrateurService.loginNode(this.identifiant, this.motDePasse)
    .subscribe( 
      data => {
        sessionStorage.setItem('token', data.access_token)
        sessionStorage.setItem('nomUser', data.username)
        this.router.navigate(['/accueil']).then(() => {
          window.location.reload()
          this.nodeOK = true
        })
      }, err => {
        console.log("erreur login: "+JSON.stringify(err))
        this.comsErr = true
        this.resourcesLoaded = false
        this.nodeOK = true
      } 
    )
  }

  seConnecter(){
    this.resourcesLoaded = true
    var grailsOK = false
    this.administrateurService.loginGrails(this.identifiant, this.motDePasse)
    .subscribe( 
      data => {
        if(!this.nodeOK){
          sessionStorage.setItem('token', data.access_token)
          sessionStorage.setItem('nomUser', data.username)
          this.router.navigate(['/accueil']).then(() => {
            window.location.reload()
            grailsOK = true
          })
        }
      }, err => {
        if(this.nodeOK){
          alert("erreur login: "+JSON.stringify(err))
          this.comsErr = true
          this.resourcesLoaded = false
          grailsOK = true
        }
      } 
    )
    setTimeout(() => {
      if(!grailsOK){
        this.loginNode()
      }
    }, 7000)
  }

}
