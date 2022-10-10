export function getHttpClientSpyObject(): any {
    return jasmine.createSpyObj('HttpClient', ['post', 'get']);
};

export function getAppTranslationServiceSpyObject(): any {
    return jasmine.createSpyObj('TranslationService', ['getLanguageOptions', 'get']);
};

export function getTranslateServiceSpyObject(): any {
    return jasmine.createSpyObj('TranslateService', ['addLangs', 'setDefaultLang', 'get']);
};

export function getTranslatePipeSpyObject(): any {
    return jasmine.createSpyObj('TranslatePipe', ['']);
};