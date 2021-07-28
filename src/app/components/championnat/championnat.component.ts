import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Championnat } from '../../model/championnat.model';
import { ChampionnatService } from '../../shared/championnat.service';
import { SnakBarAjoutComponent } from '../snak-bar-ajout/snak-bar-ajout.component';

@Component({
  selector: 'app-championnat',
  templateUrl: './championnat.component.html',
  styleUrls: ['./championnat.component.css']
})
export class ChampionnatComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'modifier', 'supprimer'];
  dataSource = new MatTableDataSource<Championnat>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  resourcesLoaded = true;
  championnat: Championnat[];
  nomChampionnat = "";
  nomChampionnatInsere = "";
  nomChampionnatModifie = "";
  modifIsDisabled = true;
  idChampionnat = "";

  constructor(
    private championatService: ChampionnatService,
    private snackBar: MatSnackBar
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Nombre d'élément à afficher"
  }

  ngOnInit(): void {
    this.getChampionnnats();
  }

  ajoutChampionnat(){
    this.resourcesLoaded = true;
    var championnatInsere = new Championnat();
    championnatInsere.nom = this.nomChampionnatInsere;
    this.championatService.ajout(championnatInsere)
      .subscribe( () => {
        this.snackBar.openFromComponent(SnakBarAjoutComponent, {
          duration: 5000,
        });
        this.getChampionnnats();
        this.nomChampionnat = "";
        this.resourcesLoaded = false;
      })
  }

  modifierChampionnat(){
    this.resourcesLoaded = true;
    var championnatModifie = new Championnat();
    championnatModifie._id = this.idChampionnat;
    championnatModifie.nom = this.nomChampionnatModifie;
    this.championatService.modifier(championnatModifie)
      .subscribe( () => {
        this.snackBar.openFromComponent(SnakBarAjoutComponent, {
          duration: 5000,
        });
        this.getChampionnnats();
        this.nomChampionnat = "";
        this.resourcesLoaded = false;
      })
  }

  supprimerChampionnat(idChampionnat){
    var confirmation = confirm("Etes-vous sur de supprimer le championnat?")
    if(confirmation){
      this.resourcesLoaded = true;
      this.championatService.supprimer(idChampionnat)
        .subscribe( () => {
          this.snackBar.openFromComponent(SnakBarAjoutComponent, {
            duration: 5000,
          });
          this.getChampionnnats();
          this.resourcesLoaded = false;
        })
    }
  }

  getChampionnnats(){
    this.resourcesLoaded = true;
    this.nomChampionnat = ""; 
    this.championatService.getChampionnats()
      .subscribe(data => {
        this.dataSource.data = data as Championnat[];   
        this.resourcesLoaded = false;   
      });
  }

  recherche(){
    this.resourcesLoaded = true; 
    this.championatService.recherche(this.nomChampionnat)
      .subscribe(data => {
        this.dataSource.data = data as Championnat[];
        this.resourcesLoaded = false;
      })
  }

  champModifier(id){
    this.championatService.getChampionnatById(id)
    .subscribe(championnat => {
      this.idChampionnat = championnat._id;
      this.nomChampionnatModifie = championnat.nom;
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
