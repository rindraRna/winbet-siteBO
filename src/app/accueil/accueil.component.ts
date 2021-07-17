import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { CompteService } from '../shared/compte.service';
import { PanierService } from '../shared/panier.service';
import { PariPanierService } from '../shared/pari-panier.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  resultat1 = 0;
  resultat2 = 0;
  resultat3 = 0;
  resultat4 = 0;
  resultat5 = 0;
  resultat6 = 0;
  resultat7 = 0;
  resultat8 = 0;
  resultat9 = 0;
  resultat10 = 0;
  resultat11 = 0;
  resultat12 = 0;
  resourcesLoaded = true;
  nbUtilisateur = 0;
  revenuMontant = 0;
  //chart
  texteTitre = "";
  barChartType: ChartType = 'line';
  barChartLabels: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  barChartData: ChartDataSets[] = [];
  barChartLegend = true;
  barChartPlugins = [];
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  chartColors = [
    {
      backgroundColor: '#ffc107ed',
      borderColor: '#FBBD00',
      borderWidth: 2,
    }
  ]

  constructor(
    private router: Router,
    private panierService: PanierService,
    private compteService: CompteService,
    private pariPanierService: PariPanierService
  ) { }

  ngOnInit(): void {
    this.chart();
    this.getNbUtilisateur();
    this.revenu();
  }

  getNbUtilisateur(){
    this.compteService.getNbUtilisateur()
    .subscribe( data => {
      this.nbUtilisateur = data.resultat;
    })
  }

  revenu(){
    this.pariPanierService.revenu()
    .subscribe( data => {
      this.revenuMontant = data.resultat;
    })
  }

  chart(){
    this.panierService.getNbPanierByMois(1)
    .subscribe(data => {
      this.resultat1 = data.resultat;
      this.panierService.getNbPanierByMois(2)
      .subscribe(data => {
        this.resultat2 = data.resultat;
        this.panierService.getNbPanierByMois(3)
        .subscribe(data => {
          this.resultat3 = data.resultat;
          this.panierService.getNbPanierByMois(4)
          .subscribe(data => {
            this.resultat4 = data.resultat;
            this.panierService.getNbPanierByMois(5)
            .subscribe(data => {
              this.resultat5 = data.resultat;
              this.panierService.getNbPanierByMois(6)
              .subscribe(data => {
                this.resultat6 = data.resultat;
                this.panierService.getNbPanierByMois(7)
                .subscribe(data => {
                  this.resultat7 = data.resultat;
                  this.panierService.getNbPanierByMois(8)
                  .subscribe(data => {
                    this.resultat8 = data.resultat;
                    this.panierService.getNbPanierByMois(9)
                    .subscribe(data => {
                      this.resultat9 = data.resultat;
                      this.panierService.getNbPanierByMois(10)
                      .subscribe(data => {
                        this.resultat10 = data.resultat;
                        this.panierService.getNbPanierByMois(11)
                        .subscribe(data => {
                          this.resultat11 = data.resultat;
                          this.panierService.getNbPanierByMois(12)
                          .subscribe(data => {
                            this.resultat12 = data.resultat;
                            this.barChartData = [
                              { data: [this.resultat1, this.resultat2, this.resultat3, this.resultat4, this.resultat5, this.resultat6, this.resultat7, this.resultat8, this.resultat9, this.resultat10, this.resultat11, this.resultat12], label: 'Nombre de paris' },
                            ];
                            this.resourcesLoaded = false;
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }
}
