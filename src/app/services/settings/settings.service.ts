import { Injectable } from '@angular/core';
import { ISettings } from 'src/app/models/settings';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settingsSubject: Subject<ISettings> = new Subject<ISettings>()

  constructor() { }
  loadUserSettings(): Observable<ISettings> {
    const settingObservable = new Observable<ISettings>((subscriber) => {
      const settinsgData: ISettings = {
        saveToken: true
      };
      subscriber.next(settinsgData);
    });
    return settingObservable
  };
  
  loadUserSettingsSubject(data: ISettings): any {
    this.settingsSubject.next(data)
  };
  getSettingsSubjectObservable(): Observable<ISettings> {
    return this.settingsSubject.asObservable()
  };
}
