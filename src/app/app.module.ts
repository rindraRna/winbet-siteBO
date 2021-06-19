import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { MatchComponent } from './match/match.component';
import { DetailsMatchComponent } from './match/details-match/details-match.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {HttpClientModule} from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { AjoutMacthComponent } from './match/ajout-macth/ajout-macth.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnakBarAjoutComponent } from './snak-bar-ajout/snak-bar-ajout.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EquipeComponent } from './equipe/equipe.component';
import { ChampionnatComponent } from './championnat/championnat.component';

const routes:Routes = [
  {
    path:"",
    component: LoginComponent
  },
  {
    path:"accueil",
    component: AccueilComponent
  },
  {
    path:"match",
    component: MatchComponent
  },
  {
    path:"detailsMatch/:idMatch",
    component: DetailsMatchComponent
  },
  {
    path:"ajoutMatch",
    component: AjoutMacthComponent
  },
  {
    path:"equipes",
    component: EquipeComponent
  },
  {
    path:"championnats",
    component: ChampionnatComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccueilComponent,
    MatchComponent,
    DetailsMatchComponent,
    AjoutMacthComponent,
    SnakBarAjoutComponent,
    EquipeComponent,
    ChampionnatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTabsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
