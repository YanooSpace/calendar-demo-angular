import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calendar02Component } from './calendar-02.component';

describe('Calendar02Component', () => {
  let component: Calendar02Component;
  let fixture: ComponentFixture<Calendar02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calendar02Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Calendar02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
