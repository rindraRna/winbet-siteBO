import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Championnat } from '../model/championnat.model';
import { Equipe } from '../model/equipe.model';
import { Match_paris } from '../model/match_paris.model';
import { Pari } from '../model/pari.model';
import { ChampionnatService } from '../shared/championnat.service';
import { EquipeService } from '../shared/equipe.service';
import { MatchService } from '../shared/match.service';
import { PariService } from '../shared/pari.service';
import { TypeService } from '../shared/type.service';
import * as moment from 'moment';

@Component({
  selector: 'app-details-match',
  templateUrl: './details-match.component.html',
  styleUrls: ['./details-match.component.css']
})
export class DetailsMatchComponent implements OnInit {
  idMatch = this.route.snapshot.params.idMatch;
  match: Match_paris;
  titres = ["Vainqueur", "Les deux équipes marquent"];
  parisVainqueurs: Pari[];
  parisMarques: Pari[];
  equipe1 = "";
  equipe2 = "";
  dateEtHeure = "";
  stade = "";
  pays = "";
  championnat = "";
  championnats: Championnat[];
  equipes: Equipe[];

  constructor(
    private route: ActivatedRoute,
    private matchService: MatchService,
    private pariService: PariService,
    private typeService: TypeService,
    private equipeService: EquipeService,
    private championnatService: ChampionnatService
  ) { }

  ngOnInit(): void {
    this.getMatchById();
    this.getEquipes();
    this.getChampionnats();
    var nbTypeParis = this.titres.length;
    for(var i = 0; i < nbTypeParis; i++){
      this.afficherParis(i);
    }
  }

  getChampionnats(){
    this.championnatService.getChampionnats()
    .subscribe(data => {
      this.championnats = data
    })
  }

  getMatchById(){
    this.matchService.getMatchById(this.idMatch)
      .subscribe(data => {
        this.match = data; 
        this.dateEtHeure = (moment(data.date)).format('yyyy-MM-DDThh:mm') ;
        this.stade = data.stade;
        this.pays = data.endroit;
        this.equipe1 = data.equipe1._id;
        this.equipe2 = data.equipe2._id;
        this.championnat = data.championnat._id;
      });
  }

  getEquipes(){
    this.equipeService.getEquipes()
      .subscribe(data => {
        this.equipes = data; 
      });
  }

  afficherParis(index){
    this.typeService.getTypeByNom(this.titres[index])
      .subscribe(data => {
        var idType = data._id
        switch(index){
          case 0: {
            this.pariService.getPariByIdMatchAndIdType(this.idMatch, idType)
            .subscribe(data => {
              this.parisVainqueurs = data; 
            });
            break
          }
          case 1:{
            this.pariService.getPariByIdMatchAndIdType(this.idMatch, idType)
            .subscribe(data => {
              this.parisMarques = data; 
            });
            break
          }
        }
      });
  }

}
