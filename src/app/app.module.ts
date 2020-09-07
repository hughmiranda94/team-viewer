import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssambleTeamComponent } from './assamble-team/assamble-team.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { MemberCardComponent } from './member-card/member-card.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { RosterComponent } from './roster/roster.component';
import { HeaderComponent } from './header/header.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    AssambleTeamComponent,
    MyTeamComponent,
    MemberCardComponent,
    NavMenuComponent,
    RosterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
