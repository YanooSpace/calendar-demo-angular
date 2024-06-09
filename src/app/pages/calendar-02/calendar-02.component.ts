import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import dayjs, { Dayjs } from 'dayjs';


@Component({
  selector: 'app-calendar-02',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './calendar-02.component.html',
})
export class Calendar02Component {
/**
   * 상단 요일 표기용
   */
dayNames = ['일', '월', '화', '수', '목', '금', '토'];

/**
 * 년도, 월, 일을 제어하는 핵심 날짜
 * 년도, 월이 바뀌어야 할 때마다 coreDate를 변경하고
 * coreDate의 년도, 월을 기준으로 달력을 그린다
 */
coreDate!: Dayjs;

/**
 * 유일하게 coreDate와 다른 Dayjs 인스턴스임
 * 오늘 날짜로 돌아갈 필요가 있을 때 coreDate에 today 객체의 값으로 덮어 쓰는 목적
 */
today!: Dayjs;

/**
 * 화면에 보일 날짜들의 집합
 */
dates: Dayjs[] = [];


constructor() {
  this.today = dayjs();
  this.coreDate = dayjs();
  this.generateMonth();
}

isToday(date: Dayjs): boolean {
  return date.isSame(this.today, 'year') &&
         date.isSame(this.today, 'month') &&
         date.isSame(this.today, 'date');
}

changeYear(value: number) {
  this.coreDate = this.coreDate.set('year', this.coreDate.year() + value);
  this.generateMonth();
}

changeMonth(Value: number) {
  this.coreDate = this.coreDate.set('month', this.coreDate.month() + Value);
  this.generateMonth();
}

goToToday() {
  this.coreDate = this.today;
  this.generateMonth();
}

isCurrentMonth(day: Dayjs) {
  return day.month() === this.coreDate.month();
}

/**
* @date coreDate month의 첫날을 가져옴(ex -> 2023-07-01)
* 상단의 요일과 첫날의 위치를 맞추기 위해 이전달의 마지막 주를 앞에 채워넣음
* @nextMonth coreDate 다음 month의 첫날 가져옴(ex -> 2023-08-01)
*/
private generateMonth() {
  let date = this.coreDate.startOf('month').startOf('week');
  let nextMonth = this.coreDate.add(1, 'month').startOf('month');
  let dates = [];

  // 다음 월의 첫 날 이전까지 반복
  while (date.isBefore(nextMonth)) {
    dates.push(date);
    date = date.add(1, 'day');
  }

  this.dates = dates;
}

}
