import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {

  @Input() member;
  @Input() isSelected$;
  @Input() teamMakerCard = false;
  @Output() memberSelected = new EventEmitter<string>();
  public isSelected;

  constructor() { }

  ngOnInit(): void {
    if (this.teamMakerCard) {
      this.isSelected$.subscribe(res => {
        if (this.member.id === res.id) {
          this.isSelected = res.isSelected;
        }
      });
    }
  }

  selectMember(event) {
    this.memberSelected.emit(event);
  }

}
