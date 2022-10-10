import { TestBed } from '@angular/core/testing';
import { getTranslateServiceSpyObject } from '../testing/utils';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './translation.service';

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
});
