import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FoodData } from 'src/app/models/food-data';
import { GetFoodDataResponse } from 'src/app/models/get-food-data-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodDataService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  /**
   * Get all available food data with their stats from the backend.
   * Maps the backend object to FoodData
   */
  getFineliFoodStats(): Observable<FoodData[]> {
    const url: string = `${this.getFoodApiUrl()}get-stats-fineli`;
    return this._httpClient.get<GetFoodDataResponse>(url).pipe(
      map(response => {
        return response.processedFoodData.map(foodData => {
          return {
            fineliId: foodData.food.fineliId,
            foodNameTranslationId: foodData.food.foodNameTranslationId,
            attack: foodData.stats.attack,
            defence: foodData.stats.defence,
            delay: foodData.stats.delay,
            health: foodData.stats.health,
            imageBase64: `data:image/png;base64,${foodData.imageBase64}`,
          } as FoodData;
        });
      })
    )
  }

  getFoodApiUrl(): string {
    return `${environment.solidabisBackendBaseApiUrl}food/`; 
  }
}
