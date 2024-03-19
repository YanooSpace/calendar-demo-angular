import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs';

export interface IDate {
  month: number;
  date: number;
  dayOfWeek: number; // 요일
  income: number;
  spending: number;
}

@Component({
  selector: 'app-calendar-01',
  standalone: true,
  imports: [],
  templateUrl: './calendar-01.component.html'
})
export class Calendar01Component implements OnInit{

  calendar: IDate[] = []; //class의 자식으로 있는 것이 this가 붙는다
  year: number = dayjs().get('year');
  month: number = dayjs().get('month') + 1; // 달은 0부터 시작하기 때문에 +1을 해준다 -> 1월부터 되도록
  days: string[] = ['일', '월', '화', '수', '목', '금', '토'];

  constructor(
  ) {}

  ngOnInit(): void {
    this.renderCalendar()
  }

  renderCalendar() {
    const calendar: IDate[] = []; // this 아님
    const viewMonth = dayjs().set('year', this.year).set('month', this.month - 1);

    // clone(): 원래 데이터에 영향을 주지 않기 위해서 복제
    this.createPrevMonth(calendar, viewMonth.clone());
    this.createCurrentMonth(calendar, viewMonth.clone());
    this.createNextMonth(calendar, viewMonth.clone());


    // 지역변수 calendar를 전역변수에 calendar에 할당 
    this.calendar = calendar;
  }

  prevMonth(){
    const curMonth = dayjs()
      .set('year', this.year)
      .set('month', this.month - 1)
      .add(-1, 'month');
    this.year = curMonth.get('year');
    this.month = curMonth.get('month') + 1;
    this.renderCalendar();
  }
  
  nextMonth(){
    const curMonth = dayjs()
      .set('year', this.year)
      .set('month', this.month - 1)
      .add(1, 'month');
    this.year = curMonth.get('year');
    this.month = curMonth.get('month') + 1;
    this.renderCalendar();
  }

  private createPrevMonth(calendar: IDate[], viewMonth: dayjs.Dayjs) {
    const curMonthDayOfWeek = viewMonth.set('date', 1).day();
    const prevLastDay = viewMonth.set('date', 1).add(-1, 'day').get('date');

    for (let i = 0; i < curMonthDayOfWeek; i++) {
      const month = viewMonth.add(-1, 'month').get('month');
      calendar.unshift({
        month: month + 1,
        date: prevLastDay - i,
        dayOfWeek: viewMonth.set('month', month).set('date', prevLastDay - i).day(),
        income: 0,
        spending: 0
      });
    }
  }

  private createCurrentMonth(calendar: IDate[], viewMonth: dayjs.Dayjs) {
    const curLastDay = viewMonth.add(1, 'month').set('date', 1).add(-1, 'day').get('date');

    for (let i = 1; i <= curLastDay; i++) {
      calendar.push({
        month: viewMonth.get('month') + 1,
        date: i,
        dayOfWeek: viewMonth.set('date', i).day(),
        income: 0,
        spending: 0
      });
    }
  }

  private createNextMonth(calendar: IDate[], viewMonth: dayjs.Dayjs) {
    const nextDays = 42 - calendar.length;

    for (let i = 1; i <= nextDays; i++) {
      const month = viewMonth.add(1, 'month').get('month');
      calendar.push({
        month: month + 1,
        date: i,
        dayOfWeek: viewMonth.set('month', month).set('date', i).day(),
        income: 0,
        spending: 0
      });
    }
  }

 


}


