import { Component, OnInit } from '@angular/core';
import { RosterService } from '../services/roster.service';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit {

  public roster;
  public rosterDescription = {
    label: 'People',
    text: `All members of our roster are great high-performance professionals ready to help you bring your ideas to life.
    Check out their profiles and backgrounds.`
  };

  constructor(private rosterService: RosterService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.rosterService.getRoster().subscribe(roster => {
      this.roster = roster;
    });
  }

}
