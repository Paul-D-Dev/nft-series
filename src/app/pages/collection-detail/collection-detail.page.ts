import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { Icons } from '../../shared/enums';

interface CollectionDetail {
  imgBanner: string;
  imgAvatar: string;
  name: string;
  category: string;
  description: string;
  media: {
    shareUrl: string;
  },
  casting: Casting[]
}

interface Casting {
  actor: string,
  character: string
}

@Component({
  selector: 'app-collection-detail',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatButtonModule, MatIconModule, MatCardModule, MatSidenavModule],
  templateUrl: './collection-detail.page.html',
  styleUrls: ['./collection-detail.page.scss']
})
export class CollectionDetailPage {
  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe('(min-width: 967px)').pipe(
      takeUntilDestroyed()
    ).subscribe(bp => this.isDesktop = bp.matches)
  }

  @Input()
  set collectionName(name: string) {
    // this.collectionDetail!.name = name;
  }

  protected readonly Icons = Icons;
  isDesktop!: boolean;
  collectionDetail: CollectionDetail | null = {
    imgAvatar: 'https://kultt.fr/wp-content/uploads/2022/02/poster-freaks_02.jpg',
    imgBanner: 'https://kultt.fr/wp-content/uploads/2022/02/poster-freaks_02.jpg',
    name: 'Freaks',
    category: 'movie',
    description: '"Freaks" (1932), directed by Tod Browning, is a cult horror film set within a traveling circus troupe comprised of individuals with physical deformities, affectionately known as "freaks." When a dwarf named Hans falls in love with the beautiful trapeze artist Cleopatra, she manipulates his emotions to inherit his fortune. However, the other members of the troupe uncover her scheme and seek revenge. The film explores themes of tolerance, family, and vengeance, and has become a classic for its originality and controversy.',
    media: {
      shareUrl: '#'
    },
    casting: [
      {
        actor: 'Wallace Ford',
        character: 'Hans'
      },
      {
        actor: 'Leila Hyams',
        character: 'Venus'
      },
      {
        actor: 'Olga Baclanova',
        character: 'Cleopatra'
      }
    ]
  };

}
