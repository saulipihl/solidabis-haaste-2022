import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpLoaderFactory, translateServiceMock } from 'src/app/testing/utils';
import { LanguageSelectionComponent } from '../language-selection/language-selection.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { TopBarComponent } from './top-bar.component';
import { HttpClient } from '@angular/common/http';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopBarComponent, LanguageSelectionComponent ],
      imports: [
        FormsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
      providers: [
        {
          provide: TranslateService,
          useValue: translateServiceMock
        }
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
