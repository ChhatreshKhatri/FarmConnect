import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliereditfeedComponent } from './suppliereditfeed.component';

describe('SuppliereditfeedComponent', () => {
  let component: SuppliereditfeedComponent;
  let fixture: ComponentFixture<SuppliereditfeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliereditfeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliereditfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
