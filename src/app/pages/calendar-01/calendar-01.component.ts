import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs';

/**
 * @IDate 인터페이스는 각 날짜에 대한 정보의 정의
 */
export interface IDate {
  month: number; 
  date: number;
  dayOfWeek: number; // 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
}

@Component({
  selector: 'app-calendar-01',
  standalone: true,
  imports: [],
  templateUrl: './calendar-01.component.html'
})
export class Calendar01Component {
  calendar: IDate[] = []; // 달력 정보를 담는 배열
  year: number = dayjs().get('year'); // 현재 년도를 가져와 초기화
  month: number = dayjs().get('month'); // 달은 0부터 시작하기 때문에
  days: string[] = ['일', '월', '화', '수', '목', '금', '토']; // 요일배열

  constructor() {
    this.renderCalendar()
  }

  // ngOnInit(): void {
  //   // 컴포넌트 초기화 시 달력을 렌더링 하는 메서드 호출
  //   this.renderCalendar()
  // }

  renderCalendar() {
    const calendar: IDate[] = []; // 임시 달력 배열
    const viewMonth = dayjs().set('year', this.year).set('month', this.month);

    // 이전 달, 현재 달, 다음 달에 대한 정보를 순차적으로 생성하고 달력 배열에 추가
    // clone(): 원래 데이터에 영향을 주지 않기 위해서 복제
    this.createPrevMonth(calendar, viewMonth.clone()); // 이전달
    this.createCurrentMonth(calendar, viewMonth.clone()); // 현재달
    this.createNextMonth(calendar, viewMonth.clone()); // 다음달

    // 생성된 달력 배열을 컴포넌트의 달력 정보 배열에 할당
    this.calendar = calendar;
  }

  /**
   * @prevMonth 이전달 이동
   */
  prevMonth(){
    const curMonth = dayjs()
      .set('year', this.year)
      .set('month', this.month)
      .add(-1, 'month'); // 현재 달에서 1달을 빼서 이전 달로 이동
    this.year = curMonth.get('year'); // 연도 업데이트 
    this.month = curMonth.get('month'); // 월 업데이트
    this.renderCalendar(); // 달력을 다시 렌더링
  }
  
  /**
   * @nextMonth 다음달 이동
   */
  nextMonth(){
    const curMonth = dayjs()
      .set('year', this.year)
      .set('month', this.month )
      .add(1, 'month'); // 현재 달에서 1달을 더해서 다음 달로 이동 
    this.year = curMonth.get('year'); // 연도 업데이트 
    this.month = curMonth.get('month'); // 월 업데이트
    this.renderCalendar(); // 달력을 다시 렌더링
  }

  /**
   * @createPrevMonth 이전달 날짜를 생성하는 메서드
   */
  private createPrevMonth(calendar: IDate[], viewMonth: dayjs.Dayjs) {
    const curMonthDayOfWeek = viewMonth.set('date', 1).day(); // 현재 달의 첫째 날의 요일 구하기
    const prevLastDay = viewMonth.set('date', 1).add(-1, 'day').get('date'); // 이전달의 마지막 날 구하기

    for (let i = 0; i < curMonthDayOfWeek; i++) {
      const month = viewMonth.add(-1, 'month').get('month'); // 이전달로 이동
      calendar.unshift({ // 배열의 맨 앞에 추가ㅣ 
        month: month, // 월
        date: prevLastDay - i, // 날짜
        dayOfWeek: viewMonth.set('month', month).set('date', prevLastDay - i).day(),
      });
    }
  }

  private createCurrentMonth(calendar: IDate[], viewMonth: dayjs.Dayjs) {
    const curLastDay = viewMonth.add(1, 'month').set('date', 1).add(-1, 'day').get('date');

    for (let i = 1; i <= curLastDay; i++) {
      calendar.push({
        month: viewMonth.get('month'),
        date: i,
        dayOfWeek: viewMonth.set('date', i).day(),
      });
    }
  }

  /**
   * @createNextMonth 다음 날의 날"짜를 생성하는 메서드
   */
  private createNextMonth(calendar: IDate[], viewMonth: dayjs.Dayjs) {
    const nextDays = 42 - calendar.length;

    // 날짜를 생성하는 방복문
    for (let i = 1; i <= nextDays; i++) {
      const month = viewMonth.add(1, 'month').get('month');
      calendar.push({
        month: month ,
        date: i,
        dayOfWeek: viewMonth.set('month', month).set('date', i).day(),
      });
    }
  }

 
}


