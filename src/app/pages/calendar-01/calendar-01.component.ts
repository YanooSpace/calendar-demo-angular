import { Component } from '@angular/core';
import { CalendarService } from '../../calendar.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-calendar-01',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-01.component.html'
})
export class Calendar01Component {
days: any;
 
  constructor(
    public calendarService: CalendarService
  ) {}

}
