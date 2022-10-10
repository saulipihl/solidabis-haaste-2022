import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LanguageSelectionComponent } from './components/language-selection/language-selection.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { TranslationService } from './services/translation.service';
import { getAppTranslationServiceSpyObject, getHttpClientSpyObject, getTranslateServiceSpyObject } from './testing/utils';

describe('AppComponent', () => {
  const httpClientSpy = getHttpClientSpyObject();
  const translationServiceSpy = getAppTranslationServiceSpyObject();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        LoadingOverlayComponent,
        TopBarComponent,
        LanguageSelectionComponent,
        
      ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: TranslationService, useValue: translationServiceSpy },
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
