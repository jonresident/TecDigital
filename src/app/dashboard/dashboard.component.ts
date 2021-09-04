import { Component, OnInit } from '@angular/core';
import { PreloadService } from './dashboard.service';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  cargando = false;

  constructor(public preloadService: PreloadService) { }

  ngOnInit(): void {
    this.preloadService.cargando$.subscribe(resp => {
      this.cargando = resp;
    });
  }
}
