import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent implements OnInit {
  loading: boolean = false;

  constructor(
    private _loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this._loadingService.loadStateSubject.subscribe(loading => {
      this.loading = loading;
    });
  }

}
