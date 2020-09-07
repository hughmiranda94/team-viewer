import { Component, OnInit } from '@angular/core';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  public teamIdCookie;
  public navToggle = false;
  public toggleIcon = document.getElementById('icon');
  public sideMenu = document.getElementById('side-menu');
  public hovering = false;

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.teamIdCookie = this.teamService.getCookie();
  }

  toggleNavDisplay() {
    this.teamIdCookie = this.teamService.getCookie();
    this.navToggle = !this.navToggle;
    this.navToggle ? document.body.classList.add('disable-scroll') : document.body.classList.remove('disable-scroll');
  }

  onMouseEnter() {
    this.hovering = true;
  }

  onMouseLeave() {
    this.hovering = false;
  }

}
