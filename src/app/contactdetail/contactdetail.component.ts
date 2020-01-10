import { Component, OnInit, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { select, Store, Action } from '@ngrx/store';

@Component({
  selector: 'app-contactdetail',
  templateUrl: './contactdetail.component.html',
  styleUrls: ['./contactdetail.component.scss']
})
export class ContactdetailComponent implements OnInit {

  details$: Observable<any>;
  
  constructor(private store: SomeService) {
    this.details$ = store.pipe({});
  }
  
  addContact(contactId: number) {
    this.store.dispatch({ 
      type: 'add_my_contact', 
      payload: contactId  
     });
  }
  ngOnInit() {
  }

}

@Injectable({
  providedIn: 'root',
})
export class SomeService {

  pipe(data: any): Observable<any> {
    return of('abc');
  }
  dispatch(data: any) {

  } 
}
