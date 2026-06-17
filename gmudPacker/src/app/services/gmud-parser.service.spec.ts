import { TestBed } from '@angular/core/testing';
import { GmudParserService } from './gmud-parser.service';

describe('GmudParserService', () => {
  let service: GmudParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GmudParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse GMUD files correctly from pipeline log', () => {
    const mockLog = `
2026-06-12T20:27:45.7335273Z main.33ed3ac60340b015.js      | main                                                                                                          | 766.63 kB |               169.89 kB
2026-06-12T20:27:45.7335595Z styles.a8b4a5226c31aeed.css   | styles                                                                                                        | 259.27 kB |                36.09 kB
2026-06-12T20:27:45.7335941Z scripts.dbd57de62ef0fb06.js   | scripts                                                                                                       | 145.57 kB |                40.53 kB
2026-06-12T20:27:45.7336277Z polyfills.944b04792ce83336.js | polyfills                                                                                                     |  33.12 kB |                10.67 kB
2026-06-12T20:27:45.7336578Z runtime.0da929a9e8e37270.js   | runtime                                                                                                       |   4.32 kB |                 2.06 kB
2026-06-12T20:27:45.7337980Z 7960.e97d9eb09193a1e0.js      | modules-negociacao-negociacao-module                                                                          |   1.79 MB |               603.17 kB
2026-06-12T20:27:45.7338557Z 7474.709b30b4c130cd6f.js      | modules-negociacao-negociacao-module                                                                          | 486.70 kB |                39.39 kB
2026-06-12T20:27:45.7338954Z 8468.921a25d69d0a06f6.js      | modules-boleto-rapido-fast-ticket-module                                                                      | 132.73 kB |                11.62 kB
2026-06-12T20:27:45.7339335Z 2291.7162282752edc172.js      | modules-dashboard-dashboard-module                                                                            | 123.95 kB |                25.91 kB
2026-06-12T20:27:45.7339727Z 5206.58d08d629f172b20.js      | fatura-fatura-module                                                                                          | 109.16 kB |                19.65 kB
2026-06-12T20:27:45.7340076Z 173.9eb331c8d12be113.js       | modules-main-main-module                                                                                      |  81.74 kB |                10.55 kB
2026-06-12T20:27:45.7340440Z 3535.b243acee0d983e1a.js      | outros-servicos-outros-servicos-module                                                                        |  65.96 kB |                 9.25 kB
2026-06-12T20:27:45.7340820Z 7339.6ba817fcc5fecf12.js      | modules-negociacao-negociacao-module                                                                          |  60.88 kB |                10.86 kB
2026-06-12T20:27:45.7341398Z 2738.84be7fb1b479d1bd.js      | modules-dashboard-dashboard-module                                                                            |  43.74 kB |                13.29 kB
    `;

    const result = service.parseGmudFiles(mockLog);
    const lines = result.split('\n');

    // Validar que index.html é a primeira linha
    expect(lines[0]).toBe('https://www.portaldocartao.com.br/index.html');

    // Validar que todos os arquivos esperados estão presentes
    const expectedFiles = [
      'main.33ed3ac60340b015.js',
      'styles.a8b4a5226c31aeed.css',
      'scripts.dbd57de62ef0fb06.js',
      'polyfills.944b04792ce83336.js',
      'runtime.0da929a9e8e37270.js',
      '7960.e97d9eb09193a1e0.js',
      '7474.709b30b4c130cd6f.js',
      '8468.921a25d69d0a06f6.js',
      '2291.7162282752edc172.js',
      '5206.58d08d629f172b20.js',
      '173.9eb331c8d12be113.js',
      '3535.b243acee0d983e1a.js',
      '7339.6ba817fcc5fecf12.js',
      '2738.84be7fb1b479d1bd.js'
    ];

    expectedFiles.forEach((file, index) => {
      const expectedUrl = `https://www.portaldocartao.com.br/${file}`;
      expect(lines[index + 1]).toBe(expectedUrl);
    });

    // Validar total de linhas
    expect(lines.length).toBe(expectedFiles.length + 1); // +1 para index.html
  });

  it('should not create duplicate URLs', () => {
    const mockLog = `
main.abc123.js      | main
main.abc123.js      | main
styles.def456.css   | styles
styles.def456.css   | styles
    `;

    const result = service.parseGmudFiles(mockLog);
    const lines = result.split('\n');

    // Deve ter 3 linhas: index.html + 2 arquivos únicos
    expect(lines.length).toBe(3);
    expect(lines[0]).toBe('https://www.portaldocartao.com.br/index.html');
    expect(lines[1]).toBe('https://www.portaldocartao.com.br/main.abc123.js');
    expect(lines[2]).toBe('https://www.portaldocartao.com.br/styles.def456.css');
  });

  it('should preserve order of appearance', () => {
    const mockLog = `
5206.58d08d629f172b20.js      | fatura
7960.e97d9eb09193a1e0.js      | negociacao
2291.7162282752edc172.js      | dashboard
173.9eb331c8d12be113.js       | main
    `;

    const result = service.parseGmudFiles(mockLog);
    const lines = result.split('\n');

    // Validar ordem exata de aparição
    expect(lines[1]).toBe('https://www.portaldocartao.com.br/5206.58d08d629f172b20.js');
    expect(lines[2]).toBe('https://www.portaldocartao.com.br/7960.e97d9eb09193a1e0.js');
    expect(lines[3]).toBe('https://www.portaldocartao.com.br/2291.7162282752edc172.js');
    expect(lines[4]).toBe('https://www.portaldocartao.com.br/173.9eb331c8d12be113.js');
  });

  it('should handle .css files correctly', () => {
    const mockLog = `
styles.xyz789.css   | styles
main.abc123.js      | main
    `;

    const result = service.parseGmudFiles(mockLog);
    const lines = result.split('\n');

    expect(lines.some(line => line.includes('.css'))).toBe(true);
    expect(lines[1]).toBe('https://www.portaldocartao.com.br/styles.xyz789.css');
  });
});
