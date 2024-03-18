import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import { IDate } from './idate';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  calendar: IDate[] = [];
  year: number = dayjs().get('year');
  month: number = dayjs().get('month') + 1;
  days: string [] = ['일', '월', '화', '수', '목', '금', '토'];

  constructor() {
  }  

  renderCalendar() {
    const calendar: IDate[] = [];
    const viewMonth = dayjs().set('year', this.year).set('month', this.month - 1);

    this.createPrevMonth(calendar, viewMonth.clone());
    this.createCurrentMonth(calendar, viewMonth.clone());
    this.createNextMonth(calendar, viewMonth.clone());

    this.calendar = calendar
    
  }
  
  prevMonth() {
    const curMonth = dayjs()
      .set('year', this.year)
      .set('month', this.month)
      .add(-1, 'month');
    this.year = curMonth.get('year');
    this.month = curMonth.get('month') + 1;
    this.renderCalendar();
  }

  nextMonth() {
    const curMonth = dayjs()
      .set('year', this.year)
      .set('month', this.month)
      .add(1, 'month');
    this.year = curMonth.get('year');
    this.month = curMonth.get('month') + 1;
    this.renderCalendar();
  }

  private createPrevMonth(calendar:IDate[], viewMonth: dayjs.Dayjs) {
    const curFirstDay = viewMonth.set('date', 1).day();
    const prevLastDay = viewMonth.set('date', 1).add(-1, 'day').get('date');
    
    for (let i = 0; i < curFirstDay; i++ ){
      const month = viewMonth.add(-1, 'month').get('month');
      calendar.unshift({
        month: month + 1,
        date: prevLastDay - i,
        day: viewMonth.set('month', month).set('date', prevLastDay - i).day()
      });
    }
  }


  private createCurrentMonth(calendar: IDate[], viewMonth: dayjs.Dayjs) {
    const curLastDay = viewMonth.add(1, 'month').set('date', 1).add(-1, 'day').get('date');

    for ( let i =1; i <= curLastDay; i++) {
      calendar.push({
        month: viewMonth.get('month') + 1 ,
        date: i ,
        day: viewMonth.set('date', i).day() 
      })
    }

  }


  private createNextMonth(calendar:IDate[], viewMonth: dayjs.Dayjs) {
    const nextDays = 42 - calendar.length; 

    for(let i = 1; i<= nextDays; i++) {
      const month = viewMonth.add(1, 'month').get('month')
      calendar.push({
        month: month + 1,
        date: i,
        day: viewMonth.set('month', month).set('date', i).day()
      });
    }
  }

}
