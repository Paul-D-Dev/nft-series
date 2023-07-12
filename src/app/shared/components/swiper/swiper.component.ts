import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, TemplateRef, ContentChild } from '@angular/core';
import { SwiperOptions } from 'swiper/types';
import { SwiperDirective } from '../../directives/swiper.directive';

@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [CommonModule, SwiperDirective],
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwiperComponent {
  @ContentChild('templateSlide') templateSlide!: TemplateRef<any>;
  @Input() config: SwiperOptions = {
    navigation: true,
    spaceBetween: 16,
    breakpoints: {
      '@0.75': {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 20,
      },
      '@1': {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 40,
      },
      '@1.50': {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 50,
      },
    },
    injectStyles: [
      `
        .swiper-button-next svg, .swiper-button-prev svg {
           height: calc(var(--swiper-navigation-size) / 2);
        }
      `
    ],
  }
  @Input() sliders: unknown[] = [];

}
