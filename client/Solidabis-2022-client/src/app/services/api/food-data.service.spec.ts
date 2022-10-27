import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { GetFoodDataResponse } from 'src/app/models/get-food-data-response';
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

  it('should process data correctly', () => {
    const data = {processedFoodData: [{food: {fineliId: 1, foodNameTranslationId: 'apple'}, imageBase64: '', stats: {attack: 11.123546984, defence: 12, delay: 34, health: 11}}]} as GetFoodDataResponse;

    const processedFoods = service.processFoodData(data)
    expect(processedFoods.length).toBe(1);
  });

  it('should process data with correct precision', () => {
    const data = {processedFoodData: [{food: {fineliId: 1, foodNameTranslationId: 'apple'}, imageBase64: '', stats: {attack: 11.123546984, defence: 12.687, delay: 34.4323254, health: 11.2222222}}]} as GetFoodDataResponse;

    const processedFoods = service.processFoodData(data)
    expect(processedFoods[0].attack).toBe(11.1);
    expect(processedFoods[0].defence).toBe(12.7);
    expect(processedFoods[0].delay).toBe(34.4);
    expect(processedFoods[0].health).toBe(11.2);
  });
});
