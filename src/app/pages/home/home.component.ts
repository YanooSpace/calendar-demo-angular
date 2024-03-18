import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html'
})
export class HomeComponent {

constructor(
  private router: Router
) {}

calendar01() {
  this.router.navigate(["/calendar-01"])
}

calendar02() {
  this.router.navigate(["/calendar-02"])
}


}
