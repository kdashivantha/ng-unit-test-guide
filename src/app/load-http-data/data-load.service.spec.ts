import { TestBed, async, fakeAsync, tick } from "@angular/core/testing";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { of } from "rxjs";
import { delay } from 'rxjs/internal/operators';
import { DataLoadService } from "./data-load.service";

let httpClientSpy: { get: jasmine.Spy };
let expectedData = { AppName: "My APP", Version: 2 };

describe("HttpDataLoadService", () => {
  beforeEach(async(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
    httpClientSpy.get.and.returnValue(of(expectedData));
    //can set some delay
    httpClientSpy.get.and.returnValue(of(expectedData).pipe(delay(1000)));

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: HttpClient, useValue: httpClientSpy }]
    }).compileComponents();
  }));

  it("should give us application information :  Promise", (done) => {
    var service = TestBed.get(DataLoadService) as DataLoadService;

    service
      .Load()
      .then(() => {
        let data = service.data;
        expect(data.AppName).toBe("My APP");
        expect(data.Version).toBe(2);
        done();
      })
      .catch(() => {
        expect().nothing();
        done();
      });
  });

  it("should give us application information - async : Promise", async() => {
    var service = TestBed.get(DataLoadService) as DataLoadService;

    await service.Load();

    let data = service.data;
    expect(data.AppName).toBe("My APP");
    expect(data.Version).toBe(2);
  });

  it("should give us application information - fakeAsync : Observables", fakeAsync(() => {
    var service = TestBed.get(DataLoadService) as DataLoadService;

    service.LoadObs().subscribe();
    tick(1000);

    let data = service.data;
    expect(data.AppName).toBe("My APP");
    expect(data.Version).toBe(2);
  }));

  it("should give us application information - Done : Observables", (done) => {
    var service = TestBed.get(DataLoadService) as DataLoadService;

    service.LoadObs().subscribe(v => { 
        let data = service.data;
        expect(data.AppName).toBe("My APP");
        expect(data.Version).toBe(2);
        done(); 
    });
  });

});
