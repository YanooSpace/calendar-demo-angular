import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calendar01Component } from './calendar-01.component';

describe('Calendar01Component', () => {
  let component: Calendar01Component;
  let fixture: ComponentFixture<Calendar01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calendar01Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Calendar01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
