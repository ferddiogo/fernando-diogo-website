# Site do Fernando Diogo

Portfolio bilingue (PT/EN) do Fernando Diogo — estudante de Arquitetura com foco em mercado imobiliário. Site construído em Next.js 16 e otimizado para que **qualquer pessoa, mesmo sem saber programar, possa atualizar textos, imagens e projetos**.

> Se chegaste aqui para editar conteúdo, salta direto para [Como editar](#como-editar). Se quiseres perceber como o site está organizado tecnicamente, vai a [Arquitetura técnica](#arquitetura-técnica).

---

## Índice

1. [Para começar (apenas uma vez)](#para-começar-apenas-uma-vez)
2. [Como editar](#como-editar)
   - [Trocar textos da página inicial](#trocar-textos-da-página-inicial)
   - [Trocar imagens](#trocar-imagens)
   - [Editar um projeto existente](#editar-um-projeto-existente)
   - [Adicionar um projeto novo](#adicionar-um-projeto-novo)
   - [Reordenar ou esconder projetos](#reordenar-ou-esconder-projetos)
   - [Editar a página Perfil (skills + CV)](#editar-a-página-perfil-skills--cv)
   - [Editar hobbies](#editar-hobbies)
   - [Mudar email e redes sociais](#mudar-email-e-redes-sociais)
   - [Mudar a paleta de cores](#mudar-a-paleta-de-cores)
   - [Embed de dashboard PowerBI](#embed-de-dashboard-powerbi)
3. [Publicar as alterações](#publicar-as-alterações)
4. [Resolução de problemas](#resolução-de-problemas)
5. [Arquitetura técnica](#arquitetura-técnica)

---

## Para começar (apenas uma vez)

### O que precisas instalar no computador

1. **[Git](https://git-scm.com/)** — para sincronizar com o GitHub
2. **[Node.js](https://nodejs.org/)** versão 20 ou superior — para correr o site localmente
3. **[VS Code](https://code.visualstudio.com/)** (recomendado) — editor amigável para abrir os ficheiros

### Clonar o repositório

Abre o terminal e corre:

```bash
git clone <url-do-repositorio>
cd Arch-website
npm install
```

### Configurar o formulário de contacto (uma vez só)

O formulário usa o [Formspree](https://formspree.io) para enviar emails — gratuito até 50 mensagens por mês.

1. Cria conta em [formspree.io](https://formspree.io)
2. Clica em **New Form**, escolhe um nome qualquer (ex: "Fernando Site")
3. Copia o ID do formulário (algo como `xpzgkqwe`)
4. Cria um ficheiro chamado `.env.local` na raiz do repositório com:

   ```
   NEXT_PUBLIC_FORMSPREE_ID=xpzgkqwe
   ```

   (substitui pelo teu ID real)

5. Quando puseres o site online (ver [Publicar](#publicar-as-alterações)), adiciona a mesma variável no painel do Vercel.

### Ver o site localmente

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) no navegador. Sempre que guardares um ficheiro, o navegador atualiza sozinho.

---

## Como editar

> **Regra de ouro:** o conteúdo do site vive todo dentro da pasta `content/` e da pasta `public/images/`. Não precisas de tocar em mais nada para edições normais.

### Trocar textos da página inicial

| O que queres mudar | Ficheiro |
|---|---|
| Título grande do hero | `content/site/pt.json` → `hero.headline` e `hero.sublineLine1` |
| Texto debaixo do título | `content/site/pt.json` → `hero.subline` |
| Botão principal do hero | `content/site/pt.json` → `hero.cta` |
| "Em destaque" no hero (canto da imagem) | `content/site/pt.json` → `hero.featuredProjectChip` |
| Os 4 números (50/3/80/20) | `content/site/pt.json` → `stats` |
| Bloco "Duas linguagens, um olhar" | `content/site/pt.json` → `dualSpecialty` |
| Texto sobre dashboards (PowerBI) | `content/site/pt.json` → `dataInsights` |
| Bio do "Sobre" | `content/site/pt.json` → `about` |
| Banda preta de chamada para contacto | `content/site/pt.json` → `contactCta` |

Para a versão em inglês do site, edita o ficheiro paralelo `content/site/en.json` (mesma estrutura, mesmas chaves, valores traduzidos).

**Itens do menu** (Início, Projetos, Hobbies, Contacto) ficam em `content/ui/pt.json` e `content/ui/en.json`.

### Trocar imagens

Cada imagem do site tem um caminho fixo. Para trocar:

1. Vai à pasta `public/images/`
2. Encontra o ficheiro que queres substituir
3. Substitui-o por uma nova imagem **com exatamente o mesmo nome**
4. Tamanho recomendado: máximo **2400px** de largura, formato **JPG**

**Mapa rápido das imagens principais:**

```
public/images/
├── hero/hero-architecture.jpg          ← imagem grande do hero
├── about/portrait.jpg                   ← retrato do Fernando no "Sobre"
├── data-insights/dashboard-preview.jpg  ← imagem do bloco "Da planta ao painel"
├── projects/<slug>/cover.jpg            ← capa de cada projeto
├── projects/<slug>/01.jpg, 02.jpg…      ← imagens da galeria de cada projeto
└── hobbies/photography.jpg, cycling.jpg, … ← imagens dos hobbies
```

> **Dica:** se quiseres usar uma imagem com nome diferente, abre o ficheiro JSON correspondente (`meta.json` do projeto, `pt.json` do site, etc.) e atualiza o caminho.

> **A imagem antiga continua a aparecer mesmo depois de substituir?** Vê em [Resolução de problemas](#resolução-de-problemas).

### Editar um projeto existente

Cada projeto tem uma pasta em `content/projects/<nome-do-projeto>/` com 3 ficheiros:

| Ficheiro | O que contém |
|---|---|
| `meta.json` | Metadados estruturados: ano, localização, área, capa, galeria, tags, título, resumo |
| `pt.mdx` | Texto longo do projeto em português (corpo do artigo) |
| `en.mdx` | Texto longo do projeto em inglês |

**Para editar o texto longo de um projeto** (parte que aparece quando alguém clica no projeto):

1. Abre `content/projects/<nome>/pt.mdx`
2. Edita normalmente — usa `##` para títulos de secção, `**negrito**`, `*itálico*`, listas com `-`
3. Faz o mesmo no `en.mdx` para a versão inglesa

**Para mudar dados estruturados** (ano, área, tags, etc.):

Abre `meta.json` e edita os valores. Atenção: tem de continuar a ser JSON válido — **aspas duplas em tudo, sem vírgulas a sobrar**.

### Adicionar um projeto novo

1. **Cria a pasta** com um slug em minúsculas e hífenes:

   ```
   content/projects/o-meu-novo-projeto/
   ```

2. **Cria os 3 ficheiros** dentro dessa pasta:

   **`meta.json`** (copia, cola e adapta):

   ```json
   {
     "slug": "o-meu-novo-projeto",
     "category": "architecture",
     "year": 2025,
     "location": { "pt": "Lisboa, PT", "en": "Lisbon, Portugal" },
     "client": "Cliente privado",
     "status": "completed",
     "cover": "/images/projects/o-meu-novo-projeto/cover.jpg",
     "gallery": [
       "/images/projects/o-meu-novo-projeto/01.jpg",
       "/images/projects/o-meu-novo-projeto/02.jpg"
     ],
     "tags": ["residential", "renovation"],
     "title": { "pt": "O Meu Novo Projeto", "en": "My New Project" },
     "summary": {
       "pt": "Resumo curto numa linha que aparece nos cartões.",
       "en": "Short one-line summary that appears on the cards."
     },
     "metrics": { "área": "180 m²", "pisos": 2 }
   }
   ```

   **Categorias válidas:** `architecture`, `data-intelligence`, `urban-study`, `interior`.

   **`pt.mdx`** (texto livre em português):

   ```markdown
   ## O conceito

   Texto de abertura. Podes usar **negrito**, *itálico*, listas:

   - Item 1
   - Item 2

   ## O processo

   Mais texto.

   ## O resultado

   Conclusão.
   ```

   **`en.mdx`** — versão inglesa, mesma estrutura.

3. **Adiciona as imagens** em `public/images/projects/o-meu-novo-projeto/`:
   - Pelo menos `cover.jpg`
   - Mais imagens da galeria se quiseres (`01.jpg`, `02.jpg`, …)

4. **Regista o projeto** em `content/projects/_index.json`:

   ```json
   {
     "featured": ["torre-helix", "linha-verde-mercado-imobiliario", "casa-mata"],
     "all": [
       "torre-helix",
       "linha-verde-mercado-imobiliario",
       "casa-mata",
       "atelier-pinheiros",
       "indice-velocidade-vendas",
       "retrofit-vila-buarque",
       "o-meu-novo-projeto"
     ]
   }
   ```

   **Adiciona o slug no array `all`**. Se quiseres que apareça em destaque na home, também o pões no array `featured` (máximo 3 recomendado).

5. **Guarda, faz commit e push** (ver [Publicar](#publicar-as-alterações)).

### Reordenar ou esconder projetos

O ficheiro `content/projects/_index.json` controla **ordem** e **visibilidade**:

```json
{
  "featured": ["torre-helix", "linha-verde-mercado-imobiliario", "casa-mata"],
  "all": [
    "torre-helix",
    "linha-verde-mercado-imobiliario",
    "casa-mata",
    "atelier-pinheiros",
    "indice-velocidade-vendas",
    "retrofit-vila-buarque"
  ]
}
```

- **Para reordenar a página de Projetos:** muda a ordem dos slugs no array `all`
- **Para reordenar os destacados na home:** muda a ordem em `featured`
- **Para esconder um projeto temporariamente:** remove o slug de `all` (mantém os ficheiros, simplesmente não aparece)
- **Para apagar definitivamente:** remove de `all`/`featured` e apaga a pasta `content/projects/<slug>/`

### Editar a página Perfil (skills + CV)

A página `/pt/profile` (e `/en/profile`) mostra capacidades, línguas, formação e tem o botão de download do CV. Tudo é editável a partir de dois sítios:

**1. Conteúdo (textos, capacidades, línguas, formação):** `content/profile/pt.json` e `content/profile/en.json`.

Estrutura do ficheiro:

```json
{
  "hero": {
    "eyebrow": "Perfil",
    "title": "Estudante de Arquitetura,",
    "titleAccent": "obcecado por como as cidades funcionam.",
    "subtitle": "...",
    "cvButton": "Descarregar CV",
    "cvFile": "/cv/fernando-diogo-cv-pt.pdf",
    "cvFilename": "fernando-diogo-cv-pt.pdf"
  },
  "skills": {
    "categories": [
      {
        "title": "Arquitetura & Design",
        "items": ["Revit (BIM)", "AutoCAD", "SketchUp", "..."]
      },
      ...
    ]
  },
  "languages": {
    "items": [
      { "name": "Português", "level": "Nativo", "proficiency": 100 },
      { "name": "Inglês",    "level": "Avançado · C1", "proficiency": 85 },
      ...
    ]
  },
  "education": {
    "items": [
      {
        "period": "2022 — atual",
        "title": "Licenciatura em Arquitetura",
        "institution": "Faculdade de Arquitetura",
        "description": "Em formação. Foco em projeto urbano e tecnologia construtiva."
      },
      ...
    ]
  }
}
```

- **Adicionar uma capacidade nova:** adiciona uma string ao array `items` da categoria certa.
- **Adicionar uma categoria nova:** adiciona um objeto novo ao array `skills.categories` com `title` e `items`. Usa o mesmo padrão de ícone do site (canto preenchido).
- **Mudar o nível de uma língua:** altera `proficiency` (0-100, controla a barra) e `level` (texto que aparece à direita).
- **Adicionar uma entrada de formação:** adiciona um objeto ao array `education.items` com `period`, `title`, `institution` e `description`. A ordem do array é a ordem na timeline (mais recente em cima).

**2. O ficheiro do CV:** `public/cv/fernando-diogo-cv-pt.pdf` e `public/cv/fernando-diogo-cv-en.pdf`.

Para substituir pelo CV real:

1. Exporta o teu CV para PDF (PT e EN, se quiseres ambas as versões)
2. Renomeia para `fernando-diogo-cv-pt.pdf` e `fernando-diogo-cv-en.pdf`
3. Substitui os ficheiros existentes em `public/cv/` (mantém os mesmos nomes)
4. Faz commit e push

> Se preferires usar nomes diferentes, edita os campos `hero.cvFile` e `hero.cvFilename` em `content/profile/pt.json` (e `en.json`) para apontar para o novo ficheiro.

Os ficheiros que estão lá agora são placeholders — vão dar download de um PDF de uma página a dizer "Substitui este ficheiro pelo CV real" até serem substituídos.

### Editar hobbies

Edita `content/hobbies/pt.json` (e `en.json` para a versão inglesa). Cada hobby é um objeto com `slug`, `title`, `description` e `image`. Os slugs têm de ser iguais nos dois idiomas.

### Mudar email e redes sociais

Em `content/site/pt.json` (e `en.json`), bloco `social`:

```json
"social": {
  "email": "fernando@fernandodiogo.com",
  "whatsapp": "+351 900 000 000",
  "linkedin": "https://linkedin.com/in/fernandodiogo",
  "instagram": "https://instagram.com/fernandodiogo"
}
```

Aparece no rodapé e na página de contacto.

### Mudar a paleta de cores

Edita `styles/tokens.css`. As cores estão todas no topo do ficheiro:

```css
:root {
  --bg-base:     #F5F2ED;  /* fundo principal (creme) */
  --bg-elevated: #FAFAF7;  /* fundo de cartões */
  --bg-deep:     #0A0A0A;  /* fundo escuro (rodapé, banda CTA) */

  --ink-primary: #0A0A0A;  /* texto principal */
  --ink-muted:   #6B6B6B;  /* texto secundário */
  --ink-soft:    #8B8680;  /* texto fraco */

  --accent:      #FF6B35;  /* laranja — botões e destaques */
  --steel:       #0F1E3D;  /* azul escuro — marca, dados */
  --line:        #E8E2D6;  /* linhas finas */
  /* ... */
}
```

Muda qualquer hexadecimal e o site inteiro adapta-se automaticamente.

### Embed de dashboard PowerBI

Para projetos da categoria `data-intelligence`, o site mostra um placeholder "Dashboard interativo em breve" sobre a imagem de capa. Para o substituir por um dashboard real e interativo:

1. No PowerBI Service, abre o relatório.
2. Vai a **File → Embed report → Publish to web (public)**.
3. O PowerBI gera uma URL tipo `https://app.powerbi.com/view?r=eyJrIjoi...`
4. Copia essa URL.
5. Abre o `meta.json` do projeto (ex: `content/projects/linha-verde-mercado-imobiliario/meta.json`).
6. Cola a URL no campo `"dashboardEmbed": "..."`.
7. Faz commit e push.

O site renderiza automaticamente um iframe interativo (filtros, slicers e drill-down funcionam).

> **Importante:** "Publish to web" exige licença Power BI Pro do publicador. Quem visita o site não precisa de nada.

---

## Publicar as alterações

Sempre que mudares qualquer coisa, segue estes três passos:

1. **Guarda os ficheiros** no editor.

2. **No terminal**, na raiz do projeto:

   ```bash
   git add .
   git commit -m "Atualizei o texto da home"
   git push
   ```

3. **Espera ~1 minuto.** O Vercel deteta o push automaticamente e publica a nova versão.

Se for a primeira vez que publicas:

- Cria conta gratuita em [vercel.com](https://vercel.com)
- Em **New Project**, importa o repositório do GitHub
- Em **Settings → Environment Variables**, adiciona `NEXT_PUBLIC_FORMSPREE_ID` com o teu ID do Formspree
- Clica em **Deploy**. Pronto.

---

## Resolução de problemas

**O site quebrou depois de eu editar um JSON.**
Provavelmente o JSON ficou inválido. Cola o conteúdo em [jsonlint.com](https://jsonlint.com) — ele aponta exatamente onde está o erro. JSON exige aspas duplas em tudo e nada de vírgulas a sobrar.

**A imagem não aparece.**
- Confirma que o caminho no JSON começa com `/` (ex: `/images/projects/foo/cover.jpg`).
- Confirma que o ficheiro existe em `public/images/...` com o nome exato (atenção a maiúsculas/minúsculas).

**A imagem antiga continua a aparecer mesmo depois de eu trocar.**
O Next.js guarda imagens otimizadas em cache. Para forçar a recarregar:

```bash
rm -rf .next/cache/images
npm run dev
```

E faz Ctrl+Shift+R no navegador (recarregamento forçado).

**Mudei a paleta e algo ficou ilegível.**
Volta atrás:

```bash
git checkout styles/tokens.css
```

Tenta uma cor de cada vez.

**O dashboard PowerBI não aparece embebido.**
Verifica que a URL no `meta.json` começa com `https://`. Se começar com qualquer outra coisa (caminho de imagem, vazio), o site mostra o placeholder.

**O servidor local não arranca.**

```bash
rm -rf .next node_modules
npm install
npm run dev
```

---

## Arquitetura técnica

### Stack

- **[Next.js 16](https://nextjs.org/)** com App Router (renderização estática)
- **React 19** + **TypeScript** (modo estrito)
- **[Tailwind CSS 4](https://tailwindcss.com/)** + variáveis CSS para a paleta
- **[MDX](https://mdxjs.com/)** via `@next/mdx` para o corpo dos projetos
- **[Framer Motion](https://www.framer.com/motion/)** para animações
- **[Formspree](https://formspree.io/)** para o formulário de contacto (sem backend)
- **[Vercel](https://vercel.com/)** para deployment

### Estrutura de pastas

```
Arch-website/
├── app/
│   ├── [lang]/             ← Todas as rotas: /pt/* e /en/*
│   │   ├── page.tsx        ← Página inicial
│   │   ├── projects/       ← Lista e detalhe de projetos
│   │   ├── profile/        ← Página de perfil (skills + CV)
│   │   ├── hobbies/        ← Página de hobbies
│   │   ├── contact/        ← Página de contacto
│   │   └── layout.tsx      ← Header + Footer comuns
│   ├── layout.tsx          ← Layout raiz (fontes, metadados globais)
│   ├── sitemap.ts          ← Gera /sitemap.xml
│   └── robots.ts           ← Gera /robots.txt
│
├── content/                ← TODO o conteúdo editável vive aqui
│   ├── ui/{pt,en}.json     ← Strings da interface (menu, botões, formulário)
│   ├── site/{pt,en}.json   ← Conteúdo da página inicial
│   ├── profile/{pt,en}.json← Skills, línguas, formação, CTA do CV
│   ├── hobbies/{pt,en}.json← Lista de hobbies
│   └── projects/
│       ├── _index.json     ← Ordem e visibilidade dos projetos
│       └── <slug>/
│           ├── meta.json   ← Metadados do projeto
│           ├── pt.mdx      ← Texto longo em PT
│           └── en.mdx      ← Texto longo em EN
│
├── components/
│   ├── brand/              ← Logo
│   ├── layout/             ← Header, Footer, LangToggle
│   ├── home/               ← Secções da página inicial
│   ├── projects/           ← Cartões, hero, galeria, embed dashboard
│   ├── profile/            ← Hero, SkillsGrid, Languages, Education
│   ├── hobbies/            ← Cartões de hobbies
│   ├── contact/            ← Formulário
│   └── ui/                 ← Primitivas (Button, Container, etc.)
│
├── lib/
│   ├── i18n/               ← Configuração de idiomas
│   ├── content/            ← Carregadores de conteúdo (projects, site, profile, hobbies)
│   ├── fonts.ts            ← Configuração das fontes
│   └── cn.ts               ← Helper para classes condicionais
│
├── public/
│   ├── images/             ← Todas as imagens
│   └── cv/                 ← PDFs do CV (PT e EN)
├── styles/tokens.css       ← Paleta de cores (CSS variables)
├── proxy.ts                ← Redireciona / para /pt (Next.js 16 substitui middleware)
└── docs/                   ← Spec, plano e documentação adicional
```

### Comandos úteis

```bash
npm run dev      # servidor de desenvolvimento (com hot reload)
npm run build    # build de produção
npm run start    # correr a build de produção localmente
npm test         # correr testes unitários
npm run lint     # verificar problemas no código
```

### Internacionalização

- O segmento `[lang]` na URL controla o idioma (`/pt/...` ou `/en/...`)
- O ficheiro `lib/i18n/config.ts` define os idiomas suportados (`LOCALES = ['pt', 'en']`)
- O proxy (`proxy.ts`) redireciona automaticamente `/` para `/pt`
- Todas as strings traduzíveis vivem em `content/ui/{pt,en}.json` e `content/site/{pt,en}.json`

### SEO

- Cada página tem metadata própria (título, descrição, OG image)
- `hreflang` configurado em todas as páginas para indexação bilingue correta
- Sitemap gerado automaticamente em `/sitemap.xml`
- OG image dinâmica por idioma em `/<lang>/opengraph-image`

---

## Licença

Portfolio pessoal — todo o conteúdo (textos e imagens) pertence ao Fernando Diogo. A estrutura do código está disponível como referência.
