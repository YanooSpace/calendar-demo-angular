import { Component } from '@angular/core';

import dayjs from 'dayjs'; // dayjs 라이브러리를 dayjs로 가져옴
import { Dayjs } from 'dayjs'; // dayjs 라이브러리에서 Dayjs 인터페이스를 가져옴

// weekday 확장하는 방법
import weekday from 'dayjs/plugin/weekday';
dayjs.extend(weekday);



@Component({
  selector: 'app-calendar-02',
  standalone: true,
  imports: [],
  templateUrl: './calendar-02.component.html'
})
export class Calendar02Component {

  dayName: string[] = ['일', '월', '화', '수', '목', '금', '토']; // // 각 요일을 표시하기 위한 문자열 배열

  coreDate = dayjs()
    .set('hour', 0) // 시간을 0시로 설정
    .set('minute', 0) // 분을 0분으로 설정
    .set('second', 0) // 초를 0초로 설정
    .set('millisecond', 0) // 밀리초를 0으로 설정

  today = dayjs(); // 현재 날짜와 시간을 today 변수에 저장

  dates: Dayjs[] = this.generateMonth() // 현재 월의 날짜 배열을 생성하고 dates 변수에 저장

  constructor() {
    // setInterval(() => this.currentTime = new Date(), 1000)
  }

  isToday(day: Dayjs): boolean {
    return day.isSame(this.today, 'year') &&
      day.isSame(this.today, 'month') &&
      day.isSame(this.today, 'date')
  }

  isSelectedDate(day: Dayjs) {
    return this.coreDate.isSame(day);
  }

  goToToday() {
    this.coreDate = this.today; // coreDate를 오늘 날짜로 설정
    this.generateMonth(); // 현재 월의 날짜 배열을 다시 생성
  }

  isCurrentMonth(day: Dayjs) {
    return day.month() === this.coreDate.month();
  }

  isFirstColumn(index: number): boolean {
    return index === 0;
  }

  generateMonth() {
    // 현재 월의 시작 요일을 구해서 date 변수에 저장
    let date = this.coreDate.startOf('month').startOf('week');
    // 다음 달의 시작 요일을 구해서 nextMonth 변수에 저장
    let nextMonth = this.coreDate.add(1, 'month').startOf('month');
    let dates: Dayjs[] = []; // 날짜 배열을 초기화

    let prevMonthDate = this.coreDate.subtract(1, 'month').endOf('date');
    let prevMonthDay = prevMonthDate.weekday(-7)

    // 마지막 주의 일요일 부터 - 마지막 날까지
    console.log(prevMonthDate)
    console.log(prevMonthDay)

    while (date.isBefore(nextMonth)) {
      dates.push(date);
      date = date.add(1, 'day');
    }

    return dates;

  }

  prevMonth(value: number) {
    this.coreDate = this.coreDate.subtract(value , 'month');
    this.dates = this.generateMonth();
  }

  nextMonth(value: number ) {
    this.coreDate = this.coreDate.add(value, 'month');
    this.dates = this.generateMonth();
  }



}


