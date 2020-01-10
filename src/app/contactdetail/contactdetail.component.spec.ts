/**
 * how to unit test
 * async data shared between parent and child component,
 * 
 * 1. @input and @Output checks
 * 2. provide dummy data to the template, change data, and assert again
 * 3. create a service spy methods and provide
 * 
 * 4. check methods havebeenCalled with expected Arguments
 */

import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ContactdetailComponent, SomeService } from './contactdetail.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ContactComponent } from '../contact/contact.component';
import { MockComponent } from 'ng-mocks';

describe('ContactdetailComponent', () => {
  let component: ContactdetailComponent;
  let fixture: ComponentFixture<ContactdetailComponent>;

  let details: any;
  let details$: BehaviorSubject<any>;

  beforeEach(async(() => {
    details = {
      title: 'This is a test title',
      description: 'This is a test description',
      contact: {
        id: 1,
        name: 'Simar',
        email: 'simar@simar.simar'
      }
     };
     
    details$ = new BehaviorSubject<any>(details);

    TestBed.configureTestingModule({
      declarations: [ 
        ContactdetailComponent,
        MockComponent(ContactComponent)
      ],
      providers: [{
        provide: SomeService,
        useValue: {
          pipe: jasmine.createSpy('pipe').and.returnValue(details$),
          dispatch: jasmine.createSpy('dispatch')
        }
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass contact.details as inpiut to <app-contact />', async (() => {
    fixture.detectChanges();
    const de = fixture.debugElement;
    const contactEl = de.query(By.css('app-contact'));
    const contactComp = contactEl.componentInstance as ContactComponent;
    expect(contactComp).toBeTruthy();
    expect(contactComp.contact).toEqual(details.contact);
    const contact = { firstName: 'Paul', email: 'paul@paul.com', id: 4 };
    details$.next({...details, contact});
    fixture.detectChanges();
    expect(contactComp.contact).toEqual(contact);
  }));

  it('should listen to onAdd() event from <app-contact />', async(() => {
    fixture.detectChanges();
    const de = fixture.debugElement;
    const contactEl = de.query(By.css('app-contact'));
    const contactComp = contactEl.componentInstance as ContactComponent;
    expect(contactComp).toBeTruthy();
    spyOn(component,'addContact').and.callThrough();
    const contactId = 10;
    contactComp.onAdd.emit(contactId);

    expect(component.addContact).toHaveBeenCalledWith(contactId);

    const _store = de.injector.get(SomeService);
    expect(_store.dispatch).toHaveBeenCalledWith({
        type: 'add_my_contact',
        payload: 10
      });
  }));
});
