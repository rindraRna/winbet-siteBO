import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Championnat } from '../../model/championnat.model';
import { Equipe } from '../../model/equipe.model';
import { Match_paris } from '../../model/match_paris.model';
import { Pari } from '../../model/pari.model';
import { Type } from '../../model/type.model';
import { ChampionnatService } from '../../shared/championnat.service';
import { EquipeService } from '../../shared/equipe.service';
import { MatchService } from '../../shared/match.service';
import { PariService } from '../../shared/pari.service';
import { SnakBarAjoutComponent } from '../../snak-bar-ajout/snak-bar-ajout.component';

@Component({
  selector: 'app-ajout-macth',
  templateUrl: './ajout-macth.component.html',
  styleUrls: ['./ajout-macth.component.css']
})
export class AjoutMacthComponent implements OnInit {
  generalFormGroup: FormGroup;
  coteFormGroup: FormGroup;
  isEditable = true;
  equipe1 = "Equipe 1";
  equipe2 = "Equipe 2";
  dateEtHeure = "";
  stade = "Stade";
  pays = "Pays";
  championnat = "Championnat";
  championnats: Championnat[];
  equipes: Equipe[];
  coteVainqueur1 = 0;
  coteVainqueur2 = 0;
  coteVainqueur3 = 0;
  coteMarquage1 = 0;
  coteMarquage2 = 0;
  afficherParis = false;
  resourcesLoaded = false;

  constructor(
    private _formBuilder: FormBuilder,
    private equipeService: EquipeService,
    private championnatService: ChampionnatService,
    private matchService: MatchService,
    private pariService: PariService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.generalFormGroup =  new FormGroup({
      equipe1: new FormControl(''),
      equipe2: new FormControl(''),
      championnat: new FormControl(''),
      dateEtHeure: new FormControl(''),
      stade: new FormControl(''),
      pays: new FormControl('')
    });
    this.coteFormGroup = this._formBuilder.group({
      coteVainqueur1: new FormControl(''),
      coteVainqueur2: new FormControl(''),
      coteVainqueur3: new FormControl(''),
      coteMarquage1: new FormControl(''),
      coteMarquage2: new FormControl('')
    });

    this.getEquipes();
    this.getChampionnats();
  }

  getChampionnats(){
    this.championnatService.getChampionnats()
    .subscribe(data => {
      this.championnats = data
    })
  }

  getEquipes(){
    this.equipeService.getEquipes()
      .subscribe(data => {
        this.equipes = data; 
      });
  }

  afficherMasquerParis(){
    this.afficherParis = !this.afficherParis;
  }

  ajoutMatchEtParis(){
    this.resourcesLoaded = true;
    // ajout match
    this.equipeService.getEquipeByNom(this.equipe1)
    .subscribe(equipe1 => {
      // creation match
      var match = new Match_paris();
      // ajout equipe1
      match.equipe1 = new Equipe();
      match.equipe1._id = equipe1._id;
      match.equipe1.nom = equipe1.nom;
      // ajout equipe1
      this.equipeService.getEquipeByNom(this.equipe2)
      .subscribe(equipe2 => {
        // ajout equipe2
        match.equipe2 = new Equipe();
        match.equipe2._id = equipe2._id;
        match.equipe2.nom = equipe2.nom;
        // ajout equipe2
        match.etat = 0;
        match.date = new Date(this.dateEtHeure);
        match.stade = this.stade;
        match.endroit = this.pays;
        this.championnatService.getChampionnatByNom(this.championnat)
        .subscribe(championnat => {
          // get championnat
          match.championnat = new Championnat();
          match.championnat._id = championnat._id;
          match.championnat.nom = championnat.nom;
          // get championnat
          match.statut = "";
          console.log("Match: ")
          console.log("equipe1:{_id: "+match.equipe1._id+",nom:"+match.equipe1.nom+"},equipe2:{_id:"+match.equipe2._id+",nom:"+match.equipe2.nom+"},etat:{"+match.etat+"},date:{"+match.date+"},stade:"+match.stade+", endroit:"+match.endroit+",championnat:{_id:"+match.championnat._id+",nom:"+match.championnat.nom+"},statut");
          // creation match
          // ajout match
          this.matchService.ajoutMatch(match)
          .subscribe(data => {
            var dernierIdMatch = data.message;
            // création types des paris
            var typeVainqeur = new Type();
            typeVainqeur._id = "60acdb7155b0ec701f1928aa";
            typeVainqeur.nom = "Vainqueur";

            // création types des paris
            var typeMarquage = new Type();
            typeMarquage._id = "60acdba355b0ec701f1928ab";
            typeMarquage.nom = "Les deux équipes marquent";

            // création types des paris
            // création pari vainqueur1
            var pari1 = new Pari();
            this.matchService.getMatchById(dernierIdMatch)
            .subscribe(dernierMatch => {
              pari1.match = dernierMatch;
              pari1.type = typeVainqeur;
              pari1.valeur = this.equipe1;
              pari1.cote = this.coteVainqueur1;
              pari1.mise = 0;
              pari1.gain = 0;
              // insertion pari vainqueur1
              this.pariService.ajout(pari1)
              .subscribe( () => {
                // création pari vainqueur2
                var pari2 = new Pari();
                pari2.match = dernierMatch;
                pari2.type = typeVainqeur;
                pari2.valeur = "null";
                pari2.cote = this.coteVainqueur2;
                pari2.mise = 0;
                pari2.gain = 0;
                // insertion pari vainqueur2
                this.pariService.ajout(pari2)
                .subscribe( () => {
                  // création pari vainqueur3
                  var pari3 = new Pari();
                  pari3.match = dernierMatch;
                  pari3.type = typeVainqeur;
                  pari3.valeur = this.equipe2;
                  pari3.cote = this.coteVainqueur3;
                  pari3.mise = 0;
                  pari3.gain = 0;
                  // insertion pari vainqueur3
                  this.pariService.ajout(pari3)
                  .subscribe( () => {
                    // création pari vainqueur4
                    var pari4 = new Pari();
                    pari4.match = dernierMatch;
                    pari4.type = typeMarquage;
                    pari4.valeur = "Oui";
                    pari4.cote = this.coteMarquage1;
                    pari4.mise = 0;
                    pari4.gain = 0;
                    // insertion pari vainqueur4
                    this.pariService.ajout(pari4)
                    .subscribe( () => {
                      // création pari vainqueur5
                      var pari5 = new Pari();
                      pari5.match = dernierMatch;
                      pari5.type = typeMarquage;
                      pari5.valeur = "Non";
                      pari5.cote = this.coteMarquage2;
                      pari5.mise = 0;
                      pari5.gain = 0;
                      // insertion pari vainqueur5
                      this.pariService.ajout(pari5)
                      .subscribe( () => {
                        this.snackBar.openFromComponent(SnakBarAjoutComponent, {
                          duration: 5000,
                        });
                        this.resourcesLoaded = false;
                      });
                      // insertion pari vainqueur5
                      // création pari vainqueur5
                    });
                    // insertion pari vainqueur4
                    // création pari vainqueur4
                  });
                  // insertion pari vainqueur3
                  // création pari vainqueur3
                });
                // insertion pari vainqueur2
                // création pari vainqueur2
              });
              // insertion pari vainqueur1
            });
            // création pari vainqueur1
          });
          // ajout match
        });
      })
      
    })
    // ajout match
  }
}
