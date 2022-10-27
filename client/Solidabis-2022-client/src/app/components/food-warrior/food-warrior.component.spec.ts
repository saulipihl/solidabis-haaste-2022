import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { translateServiceMock } from 'src/app/testing/utils';

import { FoodWarriorComponent } from './food-warrior.component';

describe('FoodWarriorComponent', () => {
  let component: FoodWarriorComponent;
  let fixture: ComponentFixture<FoodWarriorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodWarriorComponent ],
      providers: [
        {
          provide: TranslateService,
          useValue: translateServiceMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodWarriorComponent);
    component = fixture.componentInstance;
    component.disabled = false;
    component.foodInput = {attack: 1, defence: 2, delay: 3, fineliId: 2, foodNameTranslationId: '', health: 2, imageBase64: ''};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('food elements are visible', () => {
    const imageElement = fixture.debugElement.query(By.css('.character-image'));
    expect(imageElement).toBeDefined();
  });
});
