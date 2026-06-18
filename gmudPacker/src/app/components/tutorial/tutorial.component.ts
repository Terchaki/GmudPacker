import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tutorial.component.html',
  styleUrl: './tutorial.component.scss'
})
export class TutorialComponent {
  selectedImage: { src: string; alt: string } | null = null;

  openImage(src: string, alt: string): void {
    this.selectedImage = { src, alt };
  }

  closeImage(): void {
    this.selectedImage = null;
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeImage();
  }
}
