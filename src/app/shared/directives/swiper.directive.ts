import { Directive, ElementRef, AfterViewInit, Input, inject } from '@angular/core';
import { SwiperContainer } from 'swiper/swiper-element';
import { SwiperOptions } from 'swiper/types';

@Directive({
  selector: '[appSwiper]',
  standalone: true
})
export class SwiperDirective implements AfterViewInit {

  @Input() config!: SwiperOptions;
  swiperEl: SwiperContainer = inject(ElementRef<SwiperContainer>).nativeElement;

  ngAfterViewInit() {
    Object.assign(this.swiperEl, this.config);
    this.swiperEl.initialize();
  }
}
