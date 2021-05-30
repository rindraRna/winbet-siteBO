import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  seConnecter(){
    sessionStorage.setItem('token',"userConnecte");
    this.router.navigate(['/accueil']).then(() => {
      window.location.reload();
    });
  }

}
