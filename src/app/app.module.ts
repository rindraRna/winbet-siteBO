import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { MatchComponent } from './components/match/match.component';
import { DetailsMatchComponent } from './components/match/details-match/details-match.component';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {HttpClientModule} from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { AjoutMacthComponent } from './components/match/ajout-macth/ajout-macth.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SnakBarAjoutComponent } from './components/snak-bar-ajout/snak-bar-ajout.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EquipeComponent } from './components/equipe/equipe.component';
import { ChampionnatComponent } from './components/championnat/championnat.component';
import { ChartsModule } from 'ng2-charts';
import { UtilisateurComponent } from './components/utilisateur/utilisateur.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

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
  },
  {
    path:"utilisateurs",
    component: UtilisateurComponent
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
    ChampionnatComponent,
    UtilisateurComponent
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
    ChartsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
