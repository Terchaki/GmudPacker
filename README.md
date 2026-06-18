# Gmud Packer

Aplicação Angular para transformar logs de build em uma estrutura de arquivos organizada para empacotamento GMUD.

## Sobre o projeto

O Gmud Packer foi criado para simplificar o fluxo de quem precisa:

1. Copiar o log bruto do pipeline
2. Colar no transformador
3. Gerar uma estrutura pronta para copiar ou baixar em `.txt`

Atualmente o projeto possui duas telas principais:

1. `Transform`: processamento do log e geração da estrutura
2. `Tutorial`: passo a passo visual de uso

## Deploy

1. Url: https://gmudpacker.netlify.app/

## Tecnologias

1. Angular 20
2. TypeScript
3. SCSS

## Pré-requisitos

1. Node.js 20+
2. npm 10+

## Como executar localmente

1. Instale as dependências:

```bash
npm install
```

2. Execute o projeto em modo de desenvolvimento:

```bash
npm start
```

3. Acesse no navegador:

```text
http://localhost:4200
```

## Scripts disponíveis

1. Iniciar aplicação:

```bash
npm start
```

2. Gerar build de produção:

```bash
npm run build
```

3. Build em modo watch:

```bash
npm run watch
```

4. Executar testes:

```bash
npm test
```

## Estrutura do fluxo

1. Obtenha o log no pipeline (`npm run build` -> `View raw log`)
2. Copie todo o conteúdo do log
3. Cole no transformador
4. Clique em `Gerar`
5. Copie o resultado ou faça download do `.txt`

## Melhorias futuras

1. Validação mais robusta de formatos de log
2. Histórico de transformações
3. Exportação em múltiplos formatos

## Autor

1. Nome: Lucas Henrique Sousa Mendes
2. Contato: [LinkedIn](https://www.linkedin.com/in/lucas-henrique-sousa-mendes/)
