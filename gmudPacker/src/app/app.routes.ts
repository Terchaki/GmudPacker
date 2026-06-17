import { Routes } from '@angular/router';
import { TransformComponent } from './components/transform/transform.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';

export const routes: Routes = [
  { path: '', redirectTo: 'transform', pathMatch: 'full' },
  { path: 'transform', component: TransformComponent },
  { path: 'tutorial', component: TutorialComponent }
];
