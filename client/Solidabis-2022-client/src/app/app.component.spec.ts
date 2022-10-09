import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { getHttpClientSpyObject } from './testing/utils';

describe('AppComponent', () => {
  const httpClientSpy = getHttpClientSpyObject();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        LoadingOverlayComponent,
      ],
      providers: [{ provide: HttpClient, useValue: httpClientSpy }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
