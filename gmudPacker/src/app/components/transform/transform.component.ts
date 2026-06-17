import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GmudParserService } from '../../services/gmud-parser.service';

@Component({
  selector: 'app-transform',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transform.component.html',
  styleUrl: './transform.component.scss'
})
export class TransformComponent {
  private parserService = inject(GmudParserService);

  inputText = signal('');
  isLoading = signal(false);
  progress = signal(0);
  resultText = signal('');
  showResult = signal(false);
  copySuccess = signal(false);
  errorMessage = signal('');
  fileCount = signal(0);

  // Computed signal para quebrar o resultado em linhas
  resultLines = computed(() => {
    return this.resultText().split('\n').filter(line => line.trim());
  });

  totalLength = computed(() => this.inputText().length);

  roundedProgress = computed(() => Math.round(this.progress()));

  handleInputChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.inputText.set(target.value);
  }

  handleGenerate(): void {
    if (!this.inputText().trim()) {
      alert('Por favor, cole o conteúdo do arquivo');
      return;
    }

    this.isLoading.set(true);
    this.progress.set(0);
    this.showResult.set(false);

    // Simula processamento com progresso
    const interval = setInterval(() => {
      const current = this.progress();
      if (current < 90) {
        this.progress.set(Math.min(90, Math.round(current + Math.random() * 30)));
      }
    }, 200);

    // Processa o arquivo
    setTimeout(() => {
      clearInterval(interval);
      this.progress.set(100);

      const result = this.parserService.parseGmudFiles(this.inputText());

      this.isLoading.set(false);

      if (!result.success) {
        this.errorMessage.set(result.errorMessage ?? 'Erro desconhecido ao processar o arquivo.');
        this.showResult.set(false);
      } else {
        this.errorMessage.set('');
        this.resultText.set(result.data);
        this.fileCount.set(result.fileCount);
        this.showResult.set(true);
      }
    }, 1000);
  }

  handleCopy(): void {
    navigator.clipboard.writeText(this.resultText()).then(() => {
      this.copySuccess.set(true);
      setTimeout(() => this.copySuccess.set(false), 2000);
    });
  }

  handleDownloadTxt(): void {
    const content = this.resultText();
    if (!content.trim()) {
      return;
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    link.href = url;
    link.download = `gmud-pack-${timestamp}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  handleClear(): void {
    this.inputText.set('');
    this.resultText.set('');
    this.showResult.set(false);
    this.progress.set(0);
    this.errorMessage.set('');
    this.fileCount.set(0);
  }
}
