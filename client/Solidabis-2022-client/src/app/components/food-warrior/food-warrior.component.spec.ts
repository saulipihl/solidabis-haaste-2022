import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodWarriorComponent } from './food-warrior.component';

describe('FoodWarriorComponent', () => {
  let component: FoodWarriorComponent;
  let fixture: ComponentFixture<FoodWarriorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodWarriorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodWarriorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
