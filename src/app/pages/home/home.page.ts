import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardLinkComponent } from '../../shared/components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardLinkComponent],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

}
