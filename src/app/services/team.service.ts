import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teams = [];

  constructor(private firestore: AngularFirestore) {
    this.firestore.collection('teams').valueChanges().subscribe(teams => {
      this.teams = teams;
    });
  }

  createTeam(members, project) {
    const createTeam$ = new Subject();
    const newTeamId = this.generateTeamId(project.projectName);
    this.firestore.collection('teams').doc(newTeamId).set({
      teamId: newTeamId,
      teamMembers: members,
      teamName: project.projectName,
      teamDescription: project.projectDescription
  })
  .then(() => {
      createTeam$.next(newTeamId);
  })
  .catch(error => {
      createTeam$.error(error);
  });
    return createTeam$;
  }

  generateTeamId(name: string) {
    return `${name.toLowerCase().replace(/\s/g, '')}${Math.floor(Math.random() * (999 - 100) + 100)}`;
  }

  getTeam(id) {
    const getTeam$ = new ReplaySubject();
    if (!this.teams || this.teams.length === 0) {
      this.firestore.collection('teams').valueChanges().subscribe(teams => {
        this.teams = teams;
        getTeam$.next(this.teams.find(team => team.teamId ===  id));
      });
    } else {
      getTeam$.next(this.teams.find(team => team.teamId ===  id));
    }
    return getTeam$;
  }

  setCookie(id) {
    this.removeCookie();
    document.cookie = `teamId=${id}`;
  }

  getCookie() {
    if (document.cookie) {
      const teamId = document.cookie.split(';').find(cookie => cookie.search('teamId') >= 0);
      return teamId ? teamId.split('=')[1] : undefined;
    } else {
      return undefined;
    }
  }

  removeCookie() {
    document.cookie = 'teamId=; =;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}
