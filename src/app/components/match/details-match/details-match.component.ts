import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Championnat } from '../../../model/championnat.model';
import { Equipe } from '../../../model/equipe.model';
import { Match_paris } from '../../../model/match_paris.model';
import { Pari } from '../../../model/pari.model';
import { ChampionnatService } from '../../../shared/championnat.service';
import { EquipeService } from '../../../shared/equipe.service';
import { MatchService } from '../../../shared/match.service';
import { PariService } from '../../../shared/pari.service';
import { TypeService } from '../../../shared/type.service';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnakBarAjoutComponent } from 'src/app/components/snak-bar-ajout/snak-bar-ajout.component';
import { PariPanierService } from 'src/app/shared/pari-panier.service';
import { CompteService } from 'src/app/shared/compte.service';

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
  statut = "";
  etat: number;
  championnats: Championnat[];
  equipes: Equipe[];
  resourcesLoaded = true;
  resultatMarque = "Oui";
  resultatVainqueur = "";
  dejaValider = false;

  constructor(
    private route: ActivatedRoute,
    private matchService: MatchService,
    private pariService: PariService,
    private typeService: TypeService,
    private equipeService: EquipeService,
    private championnatService: ChampionnatService,
    private snackBar: MatSnackBar,
    private pariPanierService: PariPanierService,
    private compteService: CompteService
  ) { }

  ngOnInit(): void {
    this.getMatchById();
    this.getEquipes();
    this.getChampionnats();
    var nbTypeParis = this.titres.length;
    for(var i = 0; i < nbTypeParis; i++){
      this.afficherParis(i);
    }
    this.resultatMarque = "Oui";
  }

  traitementResultat(){
    this.resourcesLoaded = true;
    if(this.statut == ""){
      alert("Veuillez remplir le résumé du match");
      this.resourcesLoaded = false;
    }
    else{
      // resultat vainqueur
      this.pariPanierService.getPariByIdMatchAndValeur(this.match._id, this.resultatVainqueur)
      .subscribe( pariPanier => {
        const nbVainqueurPariVainqueur = pariPanier.length;
        for(var i = 0; i < nbVainqueurPariVainqueur; i++){
          // augmenter solde client selon le gain
          const idCompte = pariPanier[i].panier.compte._id;
          this.compteService.encaisser(idCompte, pariPanier[i].pari.gain)
          .subscribe();
          // dire que le pari est gagné: resultat = 1
          pariPanier[i].pari.resultat = 1;
          this.pariPanierService.modifier(pariPanier[i])
          .subscribe();
        }
      });
      // resultat vainqueur
      // resultat marque
      this.pariPanierService.getPariByIdMatchAndValeur(this.match._id, this.resultatMarque)
      .subscribe( pariPanier => {
        const nbVainqueurPariMarque = pariPanier.length;
        for(var i = 0; i < nbVainqueurPariMarque; i++){
          // augmenter solde client selon le gain
          const idCompte = pariPanier[i].panier.compte._id;
          this.compteService.encaisser(idCompte, pariPanier[i].pari.gain)
          .subscribe();
          // dire que le pari est gagné: resultat = 1
          pariPanier[i].pari.resultat = 1;
          this.pariPanierService.modifier(pariPanier[i])
          .subscribe();
        }
      });
      // resultat marque
  
      // modifier resultat pari  vaiqueur perdant
      const tabResultatVainqueur = [this.match.equipe1.nom, "null", this.match.equipe2.nom];
      for(var i = 0; i < 3; i++){
        if(tabResultatVainqueur[i] !== this.resultatVainqueur){
          this.pariPanierService.getPariByIdMatchAndValeur(this.match._id, tabResultatVainqueur[i])
          .subscribe( pariPanierPerdu => {
            const taillePariPanierPerdu = pariPanierPerdu.length;
            for(var j = 0; j < taillePariPanierPerdu; j++){
              if(pariPanierPerdu[j] !== undefined){
                // console.log("valeur pariPanierPerdu non undefined: "+pariPanierPerdu[j].pari.valeur+"; resultat pariPanierPerdu non undefined: "+pariPanierPerdu[j].pari.resultat);
                // resultat = 2 pour pari perdu
                pariPanierPerdu[j].pari.resultat = 2;
                this.pariPanierService.modifier(pariPanierPerdu[j])
                .subscribe();
              }
            }
          });
        }
      }
  
      // modifier resultat pari marque perdant
      const tabResultatMarque = ["Oui", "Non"];
      for(var i = 0; i < 2; i++){
        if(tabResultatMarque[i] !== this.resultatMarque){
          this.pariPanierService.getPariByIdMatchAndValeur(this.match._id, tabResultatMarque[i])
          .subscribe( pariPanierPerdu => {
            const taillePariPanierPerdu = pariPanierPerdu.length;
            for(var j = 0; j < taillePariPanierPerdu; j++){
              if(pariPanierPerdu[j] !== undefined){
                // console.log("valeur pariPanierPerdu non undefined: "+pariPanierPerdu[j].pari.valeur+"; resultat pariPanierPerdu non undefined: "+pariPanierPerdu[j].pari.resultat);
                //resultat = 2 pour pai perdu
                pariPanierPerdu[j].pari.resultat = 2;
                this.pariPanierService.modifier(pariPanierPerdu[j])
                .subscribe();
              }
            }
          });
        }
      }
  
      // terminer match: etat = 2 + ajout commentaire (statut du match)
      this.match.etat = 2;
      this.match.statut = this.statut;
      this.matchService.modifier(this.match)
      .subscribe( () => {
        this.snackBar.openFromComponent(SnakBarAjoutComponent, {
          duration: 5000,
        }); 
        this.resourcesLoaded = false;
        this.dejaValider = true;
      });
    }
  }

  modifierCote(){
    this.resourcesLoaded = true;
    const inputEquipe1 = document.getElementById(this.match.equipe1.nom) as HTMLInputElement;
    const inputNull = document.getElementById("null") as HTMLInputElement;
    const inputEquipe2 = document.getElementById(this.match.equipe2.nom) as HTMLInputElement;
    const inputOui = document.getElementById("Oui") as HTMLInputElement;
    const inputNon = document.getElementById("Non") as HTMLInputElement;
    var coteEquipe1 = inputEquipe1.value;
    var coteNull = inputNull.value;
    var coteEquipe2 = inputEquipe2.value;
    var coteOui = inputOui.value;
    var coteNon = inputNon.value;
    var regexp = /^\d+\.?\d{0,2}$/;
    var envoiValide = true;
    if(!regexp.test(coteEquipe1) || !regexp.test(coteNull) || !regexp.test(coteEquipe2) || !regexp.test(coteOui) || !regexp.test(coteNon)){
      alert("Veuillez entrer une valeur de cote avec deux (2) chiffres après la virgule au maximum");
      this.resourcesLoaded = false;
      envoiValide = false;
    }
    if(Number(coteEquipe1) <= 1 || Number(coteNull) <= 1 || Number(coteEquipe2) <= 1 || Number(coteOui) <= 1 || Number(coteNon) <= 1){
      alert("La cote doit être supérieur à 1");
      this.resourcesLoaded = false;
      envoiValide = false;
    }
    if(envoiValide){
      this.pariService.getPariByIdMatchAndValeur(this.idMatch, this.match.equipe1.nom)
      .subscribe( pariEquipe1 => {
        pariEquipe1.cote = +coteEquipe1;
        this.pariService.modifier(pariEquipe1).subscribe();
      });
      this.pariService.getPariByIdMatchAndValeur(this.idMatch, "null")
      .subscribe( pariNull => {
        pariNull.cote = +coteNull;
        this.pariService.modifier(pariNull).subscribe();
      });
      this.pariService.getPariByIdMatchAndValeur(this.idMatch, this.match.equipe2.nom)
      .subscribe( pariEquipe2 => {
        pariEquipe2.cote = +coteEquipe2;
        this.pariService.modifier(pariEquipe2).subscribe();
      });
      this.pariService.getPariByIdMatchAndValeur(this.idMatch, "Oui")
      .subscribe( pariOui => {
        pariOui.cote = +coteOui;
        this.pariService.modifier(pariOui).subscribe();
      });
      this.pariService.getPariByIdMatchAndValeur(this.idMatch, "Non")
      .subscribe( pariNon => {
        pariNon.cote = +coteNon;
        this.pariService.modifier(pariNon)
        .subscribe( () => {
          this.snackBar.openFromComponent(SnakBarAjoutComponent, {
            duration: 5000,
          });
          var nbTypeParis = this.titres.length;
          for(var i = 0; i < nbTypeParis; i++){
            this.afficherParis(i);
          }
          this.resourcesLoaded = false;
        });
      });
    }
  }

  modifierAutre(){
    this.resourcesLoaded = true;
    this.match.etat = this.etat;
    this.match.statut = this.statut;
    this.matchService.modifier(this.match)
    .subscribe( () => {
      this.resourcesLoaded = false;
    })
  }

  modifierInfoGeneral(){
    if(this.stade == "" || this.pays == "" || this.dateEtHeure == ""){
      alert("Veuillez remplir tous les champs");
    }
    else{
      this.resourcesLoaded = true;
      this.equipeService.getEquipeById(this.equipe1)
      .subscribe( equipe1 =>{
        this.match.equipe1._id = this.equipe1;
        this.match.equipe1.nom = equipe1.nom;
        this.equipeService.getEquipeById(this.equipe2)
        .subscribe( equipe2 => {
          this.match.equipe2._id = this.equipe2;
          this.match.equipe2.nom = equipe2.nom;
        });
        // this.match.etat = this.etat;
        this.match.date = new Date(this.dateEtHeure);
        this.match.stade = this.stade;
        this.match.endroit = this.pays;
        this.championnatService.getChampionnatById(this.championnat)
        .subscribe( championnat => {
          this.match.championnat._id = this.championnat;
          this.match.championnat.nom = championnat.nom;
          this.match.statut = this.statut;
          this.matchService.modifier(this.match)
          .subscribe( () => {
            // debut modifier pari du match
            this.pariService.getPariByIdMatch(this.match._id)
            .subscribe( paris => {
              const nbParis = paris.length;
              var valeurs = [this.match.equipe1.nom, "null", this.match.equipe2.nom, "Oui", "Non"];
              for(var i = 0; i < nbParis; i++){
                paris[i].match = this.match;
                paris[i].valeur = valeurs[i];
                this.pariService.modifier(paris[i])
                .subscribe( () => {
                  //  if(i === nbParis-1){
                    this.getMatchById();
                    var nbTypeParis = this.titres.length;
                    for(var i = 0; i < nbTypeParis; i++){
                      this.afficherParis(i);
                    }
                  //  } 
                });
              }
              this.snackBar.openFromComponent(SnakBarAjoutComponent, {
                duration: 5000,
              }); 
              this.resourcesLoaded = false;
            });
            // fin modifier pari du match
          });
        });
      });
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
        this.etat = data.etat;
        this.dateEtHeure = (moment(data.date)).format('yyyy-MM-DDTHH:mm') ;
        this.stade = data.stade;
        this.pays = data.endroit;
        this.equipe1 = data.equipe1._id;
        this.equipe2 = data.equipe2._id;
        this.championnat = data.championnat._id;
        this.statut = data.statut;
        this.resultatVainqueur = this.match.equipe1.nom;
        if( data.etat == 2){
          this.dejaValider = true;
        }
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
              this.resourcesLoaded = false;
            });
            break
          }
        }
      });
  }
}
