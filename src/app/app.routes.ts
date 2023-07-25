import { Routes } from '@angular/router';
import { CollectionDetailPage } from './pages/collection-detail/collection-detail.page';
import { HomePage } from './pages/home/home.page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'collections/:collectionName',
    component: CollectionDetailPage
  }
];
