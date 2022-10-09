import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { getHttpClientSpyObject } from 'src/app/testing/utils';

import { FoodDataService } from './food-data.service';

describe('FoodDataService', () => {
  let service: FoodDataService;
  const httpClientSpy = getHttpClientSpyObject();
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientSpy }]
    });
    service = TestBed.inject(FoodDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getFoodApiUrl should be correct', () => {
    const url = service.getFoodApiUrl();
    const value = url.slice(url.length - 10, url.length);
    
    expect(value).toBe('/api/food/');
  });
});
