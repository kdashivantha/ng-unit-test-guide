import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrementWithServiceComponent } from './increment-with-service.component';
import { DebugElement } from '@angular/core';
import { IncrementDecrementService } from './increment-decrement.service';
import { By } from '@angular/platform-browser';

describe('IncrementWithServiceComponent', () => {
  let component: IncrementWithServiceComponent;
  let fixture: ComponentFixture<IncrementWithServiceComponent>;
  let debugElement: DebugElement;
  let incrementDecrementService: IncrementDecrementService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncrementWithServiceComponent ],
      providers: [ IncrementDecrementService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncrementWithServiceComponent);
    component = fixture.componentInstance;

    debugElement = fixture.debugElement;
    incrementDecrementService = debugElement.injector.get(IncrementDecrementService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment in template', () => {
    debugElement
      .query(By.css('button.increment'))
      .triggerEventHandler('click', null);

    fixture.detectChanges();
    const value = debugElement.query(By.css('h1')).nativeElement.innerText;
    expect(value).toEqual('1');
  });

  it('should stop at 15 and show maximum message', () => {
    incrementDecrementService.value = 15;
    debugElement
      .query(By.css('button.increment'))
      .triggerEventHandler('click', null);

    fixture.detectChanges();
    const value = debugElement.query(By.css('h1')).nativeElement.innerText;
    const message = debugElement.query(By.css('p.message')).nativeElement.innerText;

    expect(value).toEqual('15');
    expect(message).toContain('Maximum');
  });
});
