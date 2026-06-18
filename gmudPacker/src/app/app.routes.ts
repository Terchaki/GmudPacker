import { Routes } from '@angular/router';
import { TransformComponent } from './components/transform/transform.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';

export const routes: Routes = [
  { path: '', redirectTo: 'transform', pathMatch: 'full' },
  { path: 'transform', component: TransformComponent, title: 'GmudPacker - Transform' },
  { path: 'tutorial', component: TutorialComponent, title: 'GmudPacker - Tutorial' },
  { path: '**', redirectTo: 'transform' },
];
