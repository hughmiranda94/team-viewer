import { Component, OnInit } from '@angular/core';
import { TeamService } from '../services/team.service';
import { RosterService } from '../services/roster.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import * as ClipboardJS from 'clipboard';
import { FormControl } from '@angular/forms';
import { zip } from 'rxjs';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss']
})
export class MyTeamComponent implements OnInit {

  public team;
  public members;
  public teamId;
  public teamDescription;
  public emptyTeam = true;
  public initialUrl = document.URL;
  public copySuccess = false;
  public fetchingTeam = false;
  public searchTeamInput = new FormControl('');

  constructor(
    private teamService: TeamService,
    private rosterService: RosterService,
    private route: ActivatedRoute,
    private router: Router) {
    }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.getTeamId();
  }

  getTeamId() {
    this.teamId = this.route.snapshot.paramMap.get('id');
    if (this.teamId) {
      this.fetchTeam();
    } else {
      this.teamId = this.teamService.getCookie();
      if (this.teamId) {
        this.fetchTeam();
      }
    }
  }

  fetchTeam() {
    this.fetchingTeam = true;
    zip(this.teamService.getTeam(this.teamId), this.rosterService.getRoster())
    .subscribe(([team, roster]) => {
      this.team = team;
      if (this.team) {
        this.emptyTeam = false;
        this.teamDescription = {
          label: 'Description',
          text: this.team.teamDescription
        };
        this.members = this.team.teamMembers.map(memberId => this.rosterService.getRosterMember(memberId));
        const clipboard = new ClipboardJS('.share-button', {
          text: (trigger) => {
            return `${this.initialUrl.split('/my-team')[0]}/my-team/${this.teamId}`;
          }
        });
        clipboard.on('success', (e) => {
          this.copySuccess = true;
          setTimeout(() => this.copySuccess = false, 1000);
        });
        this.teamService.setCookie(this.teamId);
      }
      this.fetchingTeam = false;
    });
  }

  searchTeam() {
    this.router.navigate(['/my-team', { id: this.searchTeamInput.value }]);
  }

  onEnter(e) {
    if (e.key === 'Enter') {
      this.searchTeam();
    }
  }

  shareTeam() {
    document.execCommand('copy');
  }

}
