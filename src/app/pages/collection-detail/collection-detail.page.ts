import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-collection-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collection-detail.page.html',
  styleUrls: ['./collection-detail.page.scss']
})
export class CollectionDetailPage {
  @Input()
  set collectionName(name: string) {
    this.collectionDetail = name;
  }

  collectionDetail: string | null = null;
}
