import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Equipe } from '../../model/equipe.model';
import { EquipeService } from '../../shared/equipe.service';
import { SnakBarAjoutComponent } from '../snak-bar-ajout/snak-bar-ajout.component';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'modifier', 'supprimer'];
  dataSource = new MatTableDataSource<Equipe>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  resourcesLoaded = true;
  equipe: Equipe[];
  nomEquipe = "";
  nomEquipeInsere = "";
  nomEquipeModifie = "";
  modifIsDisabled = true;
  idEquipe = "";

  constructor(
    private equipeService: EquipeService,
    private snackBar: MatSnackBar
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Nombre d'élément à afficher"
  }

  ngOnInit(): void {
    this.getEquipes();
  }

  ajoutEquipe(){
    this.resourcesLoaded = true;
    var equipeInsere = new Equipe();
    equipeInsere.nom = this.nomEquipeInsere;
    this.equipeService.ajout(equipeInsere)
      .subscribe( () => {
        this.snackBar.openFromComponent(SnakBarAjoutComponent, {
          duration: 5000,
        });
        this.getEquipes();
        this.nomEquipe = "";
        this.resourcesLoaded = false;
      })
  }

  modifierEquipe(){
    this.resourcesLoaded = true;
    var equipeModifie = new Equipe();
    equipeModifie._id = this.idEquipe;
    equipeModifie.nom = this.nomEquipeModifie;
    this.equipeService.modifier(equipeModifie)
      .subscribe( () => {
        this.snackBar.openFromComponent(SnakBarAjoutComponent, {
          duration: 5000,
        });
        this.getEquipes();
        this.nomEquipe = "";
        this.resourcesLoaded = false;
      })
  }

  supprimerEquipe(idEquipe){
    var confirmation = confirm("Etes-vous sur de supprimer l'équipe?")
    if(confirmation){
      this.resourcesLoaded = true;
      this.equipeService.supprimer(idEquipe)
        .subscribe( () => {
          this.snackBar.openFromComponent(SnakBarAjoutComponent, {
            duration: 5000,
          });
          this.getEquipes();
          this.resourcesLoaded = false;
        })
    }
  }

  getEquipes(){
    this.resourcesLoaded = true; 
    this.nomEquipe = ""; 
    this.equipeService.getEquipes()
      .subscribe(data => {
        this.dataSource.data = data as Equipe[];   
        this.resourcesLoaded = false;   
      });
  }

  recherche(){
    this.resourcesLoaded = true; 
    this.equipeService.recherche(this.nomEquipe)
      .subscribe(data => {
        this.dataSource.data = data as Equipe[];
        this.resourcesLoaded = false;
      })
  }

  champModifier(id){
    this.equipeService.getEquipeById(id)
    .subscribe(equipe => {
      this.idEquipe = equipe._id;
      this.nomEquipeModifie = equipe.nom;
      setTimeout(
        () => document.getElementById("inputModifier").setAttribute("style", "color: #FBBD00;")
        , 200
      );
      setTimeout(
        () => document.getElementById("inputModifier").setAttribute("style", "color: black;")
        , 400
      );
      setTimeout(
        () => document.getElementById("inputModifier").setAttribute("style", "color: #FBBD00;")
        , 600
      );
      setTimeout(
        () => document.getElementById("inputModifier").setAttribute("style", "color: black;")
        , 800
      );
      setTimeout(
        () => document.getElementById("inputModifier").setAttribute("style", "color: #FBBD00;")
        , 1000
      );
      setTimeout(
        () => document.getElementById("inputModifier").setAttribute("style", "color: black;")
        , 1200
      );
      this.modifIsDisabled = false;
    })
  }
}
