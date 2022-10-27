import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { LanguageSelectionComponent } from './components/language-selection/language-selection.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { getHttpClientSpyObject, HttpLoaderFactory, translateServiceMock } from './testing/utils';

describe('AppComponent', () => {
  const httpClientSpy = getHttpClientSpyObject();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
      declarations: [
        AppComponent,
        LoadingOverlayComponent,
        TopBarComponent,
        LanguageSelectionComponent,
      ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        {
          provide: TranslateService,
          useValue: translateServiceMock
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
