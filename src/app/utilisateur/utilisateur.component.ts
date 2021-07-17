import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Compte } from '../model/compte.model';
import { CompteService } from '../shared/compte.service';
import { SnakBarAjoutComponent } from '../snak-bar-ajout/snak-bar-ajout.component';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
  idUtilisateurModifie = "";
  mot = "";
  displayedColumns: string[] = ['nom', 'email', 'solde', 'modifier', 'supprimer'];
  dataSource = new MatTableDataSource<Compte>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  resourcesLoaded = true;
  modifIsDisabled = true;
  nomUtilisateurModifie = "";
  soldeUtilisateurModifie = 0;
  montantUtilisateurModifie = 0;
  nouveauSodleUtilisateurModifie = 0;

  constructor(
    private snackBar: MatSnackBar,
    private compteService: CompteService
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Nombre d'élément à afficher"
  }

  ngOnInit(): void {
    this.getUtilisateurs();
  }

  getUtilisateurs(){
    this.resourcesLoaded = true; 
    this.mot = ""; 
    this.compteService.getCompte()
    .subscribe(data => {
      this.dataSource.data = data as Compte[];   
      this.resourcesLoaded = false;   
    });
  }

  champModifier(idUtilisateur){
    this.modifIsDisabled = false;
    this.compteService.getCompteById(idUtilisateur)
    .subscribe( utilisateur => {
      this.idUtilisateurModifie = utilisateur._id;
      this.nomUtilisateurModifie = utilisateur.nomUtilisateur;
      this.soldeUtilisateurModifie = utilisateur.solde;
      this.nouveauSodleUtilisateurModifie = utilisateur.solde;
      this.montantUtilisateurModifie = 0;
    });
  }

  calculMontant(){
    this.nouveauSodleUtilisateurModifie = this.montantUtilisateurModifie+this.soldeUtilisateurModifie;
  }

  depot(){
    if(this.montantUtilisateurModifie < 1){
      alert("Veuillez entrer un montant supérieur à 0")
    }
    else{
      this.resourcesLoaded = true; 
      this.compteService.encaisser(this.idUtilisateurModifie, this.montantUtilisateurModifie)
      .subscribe(() => {
        this.snackBar.openFromComponent(SnakBarAjoutComponent, {
          duration: 5000,
        });
        this.getUtilisateurs();
        this.mot = "";
        this.resourcesLoaded = false; 
      });
    }
  }

  recherche(){
    this.resourcesLoaded = true; 
    this.compteService.recherche(this.mot)
    .subscribe( utilisateurs => {
      this.dataSource.data = utilisateurs as Compte[];
      this.resourcesLoaded = false;
    })
  }

  supprimerCompte(idUtilisateur){
    var confirmation = confirm("Etes-vous sur de supprimer l'utilisateur?")
    if(confirmation){
      this.resourcesLoaded = true;
      this.compteService.supprimer(idUtilisateur)
      .subscribe( () => {
        this.snackBar.openFromComponent(SnakBarAjoutComponent, {
          duration: 5000,
        });
        this.getUtilisateurs();
        this.modifIsDisabled = true;
        this.nomUtilisateurModifie = "";
        this.soldeUtilisateurModifie = 0;
        this.montantUtilisateurModifie = 0;
        this.nouveauSodleUtilisateurModifie = 0;
        this.resourcesLoaded = false;
      });
    }
  }

}
