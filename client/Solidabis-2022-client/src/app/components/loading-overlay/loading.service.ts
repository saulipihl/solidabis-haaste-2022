import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadState: Map<string, boolean> = new Map(); // State for the loading
  loadEventSubject = new Subject<LoadEvent>(); // When loading starts/ends, it's send to this subject
  loadStateSubject = new Subject<boolean>(); // Used to inform if something is still loading based on the state
  errorOcurredSubject = new Subject<string>(); // Used to show an error message if something happens during loading

  constructor() {}

  /**
   * Used to instantiate the loading subscription from the app.component.ts
   */
  instantiateLoading(): void {
    this.loadEventSubject.subscribe(event => {
      this.updateLoadState(event);
    })
  }

  /**
   * Set the loading status based on the received event
   * @param event 
   */
  private updateLoadState(event: LoadEvent) {
    this.loadState.set(event.loadId, event.loading);
    const loading = Array.from(this.loadState.values()).some(value => value === true);
    this.loadStateSubject.next(loading);
  }

  /**
   * Send the load event
   * @param loadId 
   * @param loading 
   */
  sendLoadEvent(loadId: LoadId, loading: boolean): void {
    this.loadEventSubject.next({loadId, loading} as LoadEvent);
  }

  onError(errorMessageTranslateId: string): void {
    this.errorOcurredSubject.next(errorMessageTranslateId);
  }
}

// Ids used to identify what is being loaded
export type LoadId = 'food-data';

export interface LoadEvent {
  loadId: LoadId,
  loading: boolean,
}