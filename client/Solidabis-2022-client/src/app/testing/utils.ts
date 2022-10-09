export function getHttpClientSpyObject(): any {
    return jasmine.createSpyObj('HttpClient', ['post', 'get']);
};