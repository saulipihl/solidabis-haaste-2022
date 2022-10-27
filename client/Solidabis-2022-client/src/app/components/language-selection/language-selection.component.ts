import { Component, OnInit } from '@angular/core';
import { LocalStorageKeys } from 'src/app/models/local-storage-keys';
import { LanguageCode, LanguageOption, TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss']
})
export class LanguageSelectionComponent implements OnInit {
  selectedLanguage: LanguageCode = localStorage.getItem(LocalStorageKeys.LanguageCode) as LanguageCode || 'en';
  languageOptions: LanguageOption[] = [];

  constructor(
    private _translateService: TranslationService,
  ) { }

  ngOnInit(): void {
    this.languageOptions = this._translateService.getLanguageOptions();
  }

  onChange(event: any): void {
    const newLanguageCode = event.target.value;
    this._translateService.setLanguage(newLanguageCode);
  }
}
