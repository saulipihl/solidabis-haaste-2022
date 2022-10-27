import { HttpClient } from "@angular/common/http";
import { EventEmitter } from "@angular/core";
import { LangChangeEvent } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Observable, of } from "rxjs";

export function getHttpClientSpyObject(): any {
    return jasmine.createSpyObj('HttpClient', ['post', 'get']);
};

export function getAppTranslationServiceSpyObject(): any {
    return jasmine.createSpyObj('TranslationService', ['getLanguageOptions', 'get']);
};

export function getTranslateServiceSpyObject(): any {
    return jasmine.createSpyObj('TranslateService', ['addLangs', 'setDefaultLang', 'get', 'use' ]);
};

export const translateServiceMock = {
    currentLang: 'en',
    onLangChange: new EventEmitter<LangChangeEvent>(),
    get: (key: string): Observable<string> => {
        return of(key);
    },
    // use: jasmine.createSpyObj('a'),
    onTranslationChange: new EventEmitter(),
    onDefaultLangChange: new EventEmitter()
  };


export function HttpLoaderFactory(http: HttpClient) {
return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
  