import { TestBed } from '@angular/core/testing';
import { getTranslateServiceSpyObject } from '../testing/utils';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './translation.service';
import { LocalStorageKeys } from '../models/local-storage-keys';

describe('TranslationService', () => {
  let service: TranslationService;
  const translateServiceSpy = getTranslateServiceSpyObject();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TranslateService, useValue: translateServiceSpy },
      ]
    });
    service = TestBed.inject(TranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be two languages', () => {
    const options = service.getLanguageOptions();
    expect(options.length).toBe(2);
  });

  it('should language codes be correct', () => {
    const languageCodes = service.getLanguageOptions().map(o => o.languageCode);

    expect(languageCodes).toContain('en');
    expect(languageCodes).toContain('fi');
  });

  it('should language codes be correct', () => {
    const languageCodes = service.getLanguageOptions().map(o => o.languageCode);

    expect(languageCodes).toContain('en');
    expect(languageCodes).toContain('fi');
  });

  it('after setLanguage language should be correct in localstorage', () => {
    const currentLanguage = localStorage.getItem(LocalStorageKeys.LanguageCode);
    service.setLanguage('fi');
    expect(localStorage.getItem(LocalStorageKeys.LanguageCode)).toBe('fi');
    service.setLanguage('en');
    expect(localStorage.getItem(LocalStorageKeys.LanguageCode)).toBe('en');
    if (currentLanguage)
      localStorage.setItem(LocalStorageKeys.LanguageCode, currentLanguage);
  });
});
