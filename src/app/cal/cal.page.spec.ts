import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalPage } from './cal.page';

describe('CalPage', () => {
  let component: CalPage;
  let fixture: ComponentFixture<CalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
