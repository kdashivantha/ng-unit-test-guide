import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  
  @Input() contact: {firstName: string, email?: string, id: number};
  @Output() onAdd = new EventEmitter<number>(); 

  constructor() { }

  ngOnInit() {
  }

}
