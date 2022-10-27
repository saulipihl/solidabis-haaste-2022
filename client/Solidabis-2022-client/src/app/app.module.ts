import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { FormsModule } from '@angular/forms';
import { LanguageSelectionComponent } from './components/language-selection/language-selection.component'; 
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { CharacterSelectionComponent } from './components/character-selection/character-selection.component';
import { BattleComponent } from './components/battle/battle.component';
import { FoodWarriorComponent } from './components/food-warrior/food-warrior.component';
import { ConfirmButtonComponent } from './components/buttons/confirm-button/confirm-button.component';
import { LocalStorageKeys } from './models/local-storage-keys';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogNumberPipe } from './pipes/log-number.pipe';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';


export function appInitializerFactory(translate: TranslateService) {
  return () => {
    const languageCode: string = localStorage.getItem(LocalStorageKeys.LanguageCode) || 'en';
    translate.setDefaultLang(languageCode);
    translate.addLangs(['en', 'fi']);
    return translate.use(languageCode);
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoadingOverlayComponent,
    TopBarComponent,
    LanguageSelectionComponent,
    InstructionsComponent,
    CharacterSelectionComponent,
    BattleComponent,
    FoodWarriorComponent,
    ConfirmButtonComponent,
    LogNumberPipe,
    ProgressBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}