import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { LoadingService } from './components/loading-overlay/loading.service';
import { FoodData } from './models/food-data';
import { FoodDataService } from './services/api/food-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  foodData: FoodData[] = [];

  constructor(
    private _foodDataService: FoodDataService,
    private _loadingService: LoadingService,
    private _translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this._loadingService.instantiateLoading();
    
    // Let other components subscribe
    requestAnimationFrame(() => {
      this._loadingService.sendLoadEvent('food-data', true);
      forkJoin([this._foodDataService.getFineliFoodStats(), this._translateService.get('dummyTranslation')]).subscribe(data => {
        this.foodData = data[0];
        this._loadingService.sendLoadEvent('food-data', false);          
      });
    });
  }
}
