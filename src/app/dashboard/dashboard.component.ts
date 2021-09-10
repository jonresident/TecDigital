import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PreloadService } from './dashboard.service';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  cargando = false;
  preloadSubscription = new Subscription();

  constructor(public preloadService: PreloadService) { }

  ngOnInit(): void {
    this.preloadSubscription = this.preloadService.cargando$.subscribe(resp => {
      this.cargando = resp;
    });
  }

  ngOnDestroy(): void {
    this.preloadSubscription.unsubscribe();
  }
}
