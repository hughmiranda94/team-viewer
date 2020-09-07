import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RosterService {
  private roster;

  constructor(private firestore: AngularFirestore) {
    this.firestore.collection('roster').valueChanges().subscribe(roster => {
      this.roster = roster;
    });
  }

  getRoster() {
    const getRoster$ = new ReplaySubject();
    if (!this.roster) {
      this.firestore.collection('roster').valueChanges().subscribe(roster => {
        this.roster = roster;
        getRoster$.next(this.roster);
      });
    } else {
      getRoster$.next(this.roster);
    }
    return getRoster$;

  }

  getRosterMember(id) {
    let rosterMember = this.roster.find(member => member.id === id);
    if (!rosterMember) {
      rosterMember = {
        img: undefined,
        id,
        name: 'No Name',
        position: 'No Position',
        phone: 'No Phone',
        email: 'No E-mail',
        background: 'No Background'
      };
    }
    return rosterMember;
  }
}
