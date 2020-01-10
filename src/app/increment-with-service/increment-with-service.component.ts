import { Component, OnInit } from '@angular/core';
import { IncrementDecrementService } from './increment-decrement.service';

@Component({
  selector: 'app-increment-with-service',
  templateUrl: './increment-with-service.component.html',
  styleUrls: ['./increment-with-service.component.scss']
})
export class IncrementWithServiceComponent implements OnInit {

  constructor(public incrementDecrement: IncrementDecrementService) {}

  increment() {
    this.incrementDecrement.increment();
  }
  decrement() {
    this.incrementDecrement.decrement();
  }

  ngOnInit() {
  }

}
