import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { FormsModule } from '@angular/forms';
import { LanguageSelectionComponent } from './components/language-selection/language-selection.component'; 
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { CharacterSelectionComponent } from './components/character-selection/character-selection.component';
import { FoodWarriorComponent } from './components/food-warrior/food-warrior.component';


@NgModule({
  declarations: [
    AppComponent,
    LoadingOverlayComponent,
    TopBarComponent,
    LanguageSelectionComponent,
    InstructionsComponent,
    CharacterSelectionComponent,
    FoodWarriorComponent,
  ],
  imports: [
    BrowserModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}