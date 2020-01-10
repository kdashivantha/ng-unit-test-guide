import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from 'rxjs/internal/operators';

@Injectable({
  providedIn: "root"
})
export class DataLoadService {
  data: {
    AppName: string;
    Version: number;
  };

  static AppInfoUri: string = "/Application/Load";

  constructor(private _http: HttpClient) {}

  private _setAppInfo(appInfo: any): void {
    this.data = {
      AppName: appInfo.AppName,
      Version: appInfo.Version
    };
  }

  public Load(): Promise<any> {
    return this._http
      .get<any>(DataLoadService.AppInfoUri)
      .toPromise()
      .then(this._setAppInfo.bind(this));
  }

  public LoadObs(): Observable<any> {
    return this._http
      .get<any>(DataLoadService.AppInfoUri)
      .pipe(
        tap(data => this._setAppInfo(data))
      );
  }
}
