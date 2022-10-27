import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TranslationService } from 'src/app/services/translation.service';
import { getAppTranslationServiceSpyObject } from 'src/app/testing/utils';

import { LanguageSelectionComponent } from './language-selection.component';

describe('LanguageSelectionComponent', () => {
  let component: LanguageSelectionComponent;
  let fixture: ComponentFixture<LanguageSelectionComponent>;
  const translationServiceSpy = getAppTranslationServiceSpyObject();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageSelectionComponent ],
      imports: [FormsModule],
      providers: [
        { provide: TranslationService, useValue: translationServiceSpy },
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(LanguageSelectionComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
