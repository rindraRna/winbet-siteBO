import { AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Championnat } from '../model/championnat.model';
import { Match_paris } from '../model/match_paris.model';
import { ChampionnatService } from '../shared/championnat.service';
import { MatchService } from '../shared/match.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit,  AfterViewInit {
  displayedColumns: string[] = ['date', 'match', 'championnat', 'lieu', 'etat', 'modifier', 'supprimer'];
  dataSource = new MatTableDataSource<Match_paris>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  date: Date;
  equipe ="";
  championnat ="Tous";
  etat: number = 4;
  championnats: Championnat[];

  constructor(
    private matchService: MatchService,
    private championnatService: ChampionnatService
  ) { 
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getMacths();
    this.getChampionnats();
  }


  getMacths(){
    this.matchService.getMatchs()
      .subscribe(data => {
        this.dataSource.data = data as Match_paris[];      
      });
  }

  getChampionnats(){
    this.championnatService.getChampionnats()
    .subscribe(data => {
      this.championnats = data
    })
  }

  rechercheMulticritere(){
    var equipe_cherche = this.equipe;
    var championnat_cherche = this.championnat;
    if(this.date === undefined) this.date = null;
    if(this.equipe === "") equipe_cherche = '.*';
    if(this.championnat === "Tous") championnat_cherche = '.*';
    if(this.etat != 4){
      this.matchService.rechercheMulticritere(this.date, equipe_cherche, championnat_cherche, this.etat)
      .subscribe(data => {
        this.dataSource.data = data as Match_paris[];
      })
    }
    if(this.etat == 4){
      this.matchService.rechercheMulticritereSansEtat(this.date, equipe_cherche, championnat_cherche)
      .subscribe(data => {
        this.dataSource.data = data as Match_paris[];
      })
    }
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  valeurEtat(etat: number){
    switch(etat){
      case 0:
        return "Pariable";
      case 1:
        return "En cours";
      case 2:
        return "Terminé";  
    }
  }

}