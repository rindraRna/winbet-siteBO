import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Championnat } from '../model/championnat.model';
import { Equipe } from '../model/equipe.model';
import { Match_paris } from '../model/match_paris.model';
import { Pari } from '../model/pari.model';
import { MatchService } from '../shared/match.service';
import { PariService } from '../shared/pari.service';
import { TypeService } from '../shared/type.service';

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
  equipe1: Equipe;
  equipe2: Equipe;
  dateEtHeure: Date;
  stade = "";
  pays = "";
  championnat = "";
  championnats: Championnat[];

  constructor(
    private route: ActivatedRoute,
    private matchService: MatchService,
    private pariService: PariService,
    private typeService: TypeService
  ) { }

  ngOnInit(): void {
    this.getMatchById()
    var nbTypeParis = this.titres.length
    for(var i = 0; i < nbTypeParis; i++){
      this.afficherParis(i)
    }
  }

  getMatchById(){
    this.matchService.getMatchById(this.idMatch)
      .subscribe(data => {
        this.match = data; 
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
