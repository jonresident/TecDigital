import { Component, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
declare var $: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styles: [
  ]
})
export class LandingComponent implements OnInit {

  cargando = false;

  constructor(private wowService: NgwWowService,) {
    this.wowService.init();
  }

  ngOnInit(): void {
    this.wowService.init();
  }

  reset() {
    this.wowService.init();
  }

}
