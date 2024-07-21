import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliereditmedicineComponent } from './suppliereditmedicine.component';

describe('SuppliereditmedicineComponent', () => {
  let component: SuppliereditmedicineComponent;
  let fixture: ComponentFixture<SuppliereditmedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliereditmedicineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliereditmedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
