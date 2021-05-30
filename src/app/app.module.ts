import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { MatchComponent } from './match/match.component';
import { DetailsMatchComponent } from './details-match/details-match.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {HttpClientModule} from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';

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
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccueilComponent,
    MatchComponent,
    DetailsMatchComponent
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
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
