import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper/bundle';
declare var $: any;

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styles: [
  ]
})
export class SubmenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initSwiperMenu();
  }

  initSwiperMenu(){
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 0,
      freeMode: true,
      grabCursor: false,
      centeredSlides: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        576: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
        1400: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
        1920: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
      }
    });
  }

}
