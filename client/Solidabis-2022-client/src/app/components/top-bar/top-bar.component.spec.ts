import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { getTranslatePipeSpyObject, getTranslateServiceSpyObject } from 'src/app/testing/utils';
import { LanguageSelectionComponent } from '../language-selection/language-selection.component';
import { TranslateService } from '@ngx-translate/core';

import { TopBarComponent } from './top-bar.component';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;
  const translateServiceSpy = getTranslateServiceSpyObject();
  const translatePipeSpy = getTranslatePipeSpyObject();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopBarComponent, LanguageSelectionComponent, translatePipeSpy ],
      imports: [ FormsModule ],
      providers: [
        { provide: TranslateService, useValue: translateServiceSpy },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
