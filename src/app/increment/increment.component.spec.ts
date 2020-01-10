import { By } from "@angular/platform-browser";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { IncrementComponent } from "./increment.component";
import { DebugElement } from "@angular/core";

describe("IncrementComponent", () => {
  let component: IncrementComponent;
  let fixture: ComponentFixture<IncrementComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IncrementComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncrementComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should increment/decrement value", () => {
    fixture.componentInstance.increment();
    expect(fixture.componentInstance.value).toEqual(1);

    fixture.componentInstance.decrement();
    expect(fixture.componentInstance.value).toEqual(0);
  });

  it("should increment in template", () => {
    debugElement
      .query(By.css("button.increment"))
      .triggerEventHandler("click", null);

    fixture.detectChanges();
    const value = debugElement.query(By.css("h1")).nativeElement.innerText;
    expect(value).toEqual("1");
  });

  it("should stop at 0 and show minimum message", () => {
    debugElement
      .query(By.css("button.decrement"))
      .triggerEventHandler("click", null);

    fixture.detectChanges();
    const message = debugElement.query(By.css("p.message")).nativeElement
      .innerText;

    expect(fixture.componentInstance.value).toEqual(0);
    expect(message).toContain("Minimum");
  });

  it("should stop at 15 and show maximum message", () => {
    fixture.componentInstance.value = 15;
    debugElement
      .query(By.css("button.increment"))
      .triggerEventHandler("click", null);

    fixture.detectChanges();
    const message = debugElement.query(By.css("p.message")).nativeElement
      .innerText;

    expect(fixture.componentInstance.value).toEqual(15);
    expect(message).toContain("Maximum");
  });
});
