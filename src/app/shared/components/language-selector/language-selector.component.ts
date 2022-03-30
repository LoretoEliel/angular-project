import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {
  // #region Properties
  @Input("disableTitle") disableTitle: boolean = false;

  public selectLang: string = '';

  // #endregion Properties

  // #region Constructors

  constructor(private translate: TranslateService) {
    var langs = this.getTransLanguage();
    if (langs.length === 0) {
      translate.addLangs(['es', 'en']);
    }
  }

  // #endregion Constructors

  // #region Public Methods

  public ngOnInit(): void {
    this.selectLang = this.translate.currentLang;

    if (this.selectLang === undefined) {
      this.selectLang = this.translate.defaultLang;
    }
  }

  public setTransLanguage() {
    this.translate.use(this.selectLang);
  }

  // #endregion Public Methods

  // #region Private Methods

  private getTransLanguage() {
    return [...this.translate.getLangs()];
  }

  // #endregion Private Methods
}
