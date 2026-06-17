import { Injectable } from '@angular/core';

export interface ParseResult {
  success: boolean;
  data: string;
  fileCount: number;
  errorMessage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GmudParserService {
  private readonly BASE_URL = 'https://www.portaldocartao.com.br';
  private readonly FILE_REGEX = /(\S+\.(?:js|css))\s+\|/g;

  /**
   * Extrai e formata os arquivos minificados do log do pipeline
   * @param logText - Conteúdo do log do pipeline do build
   * @returns Lista de URLs formatadas para os arquivos
   */
  parseGmudFiles(logText: string): ParseResult {
    this.FILE_REGEX.lastIndex = 0;

    const matches = logText.matchAll(this.FILE_REGEX);
    const files: string[] = [];
    const seen = new Set<string>();

    for (const match of matches) {
      const fileName = match[1].trim();
      if (fileName && !seen.has(fileName)) {
        files.push(fileName);
        seen.add(fileName);
      }
    }

    if (files.length === 0) {
      return {
        success: false,
        data: '',
        fileCount: 0,
        errorMessage: 'Nenhum arquivo de build foi encontrado. Verifique se o conteúdo colado é um log válido de pipeline Angular.'
      };
    }

    const result: string[] = [`${this.BASE_URL}/index.html`];

    for (const file of files) {
      result.push(`${this.BASE_URL}/${file}`);
    }

    return {
      success: true,
      data: result.join('\n'),
      fileCount: files.length
    };
  }
}
