import { Component, OnInit } from '@angular/core';
import { TeamService } from '../services/team.service';
import { RosterService } from '../services/roster.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-assamble-team',
  templateUrl: './assamble-team.component.html',
  styleUrls: ['./assamble-team.component.scss']
})
export class AssambleTeamComponent implements OnInit {

  public roster;
  public selectedMembers = [];
  public isSelected$ = new Subject();
  public teamId;
  public assambleDescription = {
    label: 'Team',
    text: `We know that teamwork is the best way to achieve great results.
    Every project starts with an idea but the team is the machine that turns that idea
    into reality, so having the best talent by your side is as important as the idea itself.`
  };
  public projectForm = new FormGroup({
    projectName: new FormControl(''),
    projectDescription: new FormControl(''),
  });

  constructor(private teamService: TeamService, private rosterService: RosterService, private router: Router) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.rosterService.getRoster().subscribe(roster => {
      this.roster = roster;
    });
  }

  selectMember(id) {
    this.isSelected(id)
    ? this.selectedMembers.splice(this.selectedMembers.indexOf(id), 1)
    : this.selectedMembers.push(id);
    this.isSelected$.next({id, isSelected: this.isSelected(id)});
  }

  isSelected(id) {
    return this.selectedMembers.find(memberId => memberId === id);
  }

  assambleTeam() {
    this.teamService.createTeam(this.selectedMembers, this.projectForm.value).subscribe(teamId => {
      this.teamId = teamId;
      this.router.navigate(['/my-team', this.teamId]);
    }, err => {
      console.error(err);
    });
  }

  onSubmit() {
    this.assambleTeam();
  }

  isFormValid() {
    return this.projectForm.valid && this.selectedMembers.length > 0;
  }
}
