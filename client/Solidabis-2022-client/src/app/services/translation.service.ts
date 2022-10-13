import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageKeys } from '../models/local-storage-keys';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(
    private _translateService: TranslateService,
  ) {}

  getLanguageOptions(): LanguageOption[] {
    return [
      { languageCode: 'en', translationKey: 'UI.English' },
      { languageCode: 'fi', translationKey: 'UI.Finnish' },
    ];
  }

  setLanguage(languageCode: string): void {
    localStorage.setItem(LocalStorageKeys.LanguageCode, languageCode);
    this._translateService.use(languageCode);
  }
}

export interface LanguageOption {
  translationKey: string,
  languageCode: LanguageCode,
}

export type LanguageCode = 'fi' | 'en';