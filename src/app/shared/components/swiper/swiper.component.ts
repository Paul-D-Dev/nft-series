import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, TemplateRef, ContentChild } from '@angular/core';

@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwiperComponent {
  @ContentChild('templateSlide') templateSlide!: TemplateRef<any>;
  @Input() sliders: unknown[] = [];
}
