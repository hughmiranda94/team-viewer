import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssambleTeamComponent } from './assamble-team.component';

describe('AssambleTeamComponent', () => {
  let component: AssambleTeamComponent;
  let fixture: ComponentFixture<AssambleTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssambleTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssambleTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
