# Site do Fernando Diogo

🌐 **Site online:** https://fernando-diogo-website.vercel.app
📂 **Repositório:** https://github.com/0xFelipeGD/fernando-diogo-website

Portfolio bilingue (PT/EN) do Fernando Diogo — estudante de Arquitetura com foco em mercado imobiliário.

---

## 👋 Antes de começar

Este guia assume que **nunca programaste**. Foi escrito para que possas alterar textos, imagens e projetos sem mexer em código nem instalar nada.

Tens **dois caminhos** para editar o site:

| Caminho | Quando usar | Precisa de instalar algo? |
|---|---|---|
| **🟢 Fácil — pelo navegador** | Mudar textos, trocar imagens, editar projetos pequenos | Não. Só precisas de uma conta GitHub. |
| **🟠 Completo — no teu computador** | Mudanças grandes (vários ficheiros de uma vez), testar antes de publicar, mudar cores/layout | Sim — Git, Node.js e VS Code. |

> **Recomendação:** começa pelo **caminho fácil**. 90% das edições são mudar texto ou trocar uma imagem — para isso, não precisas de instalar nada.

Cada vez que guardas uma alteração, o site **online atualiza-se sozinho em ~1 minuto**. Não há botão de "publicar".

---

## Índice

- [🟢 Caminho fácil: editar pelo navegador](#-caminho-fácil-editar-pelo-navegador)
- [🟠 Caminho completo: no teu computador](#-caminho-completo-no-teu-computador)
- [📍 Onde fica cada coisa do site](#-onde-fica-cada-coisa-do-site)
- [✏️ Como editar...](#%EF%B8%8F-como-editar)
  - [...textos da página inicial](#textos-da-página-inicial)
  - [...imagens](#imagens)
  - [...um projeto existente](#um-projeto-existente)
  - [...adicionar um projeto novo](#adicionar-um-projeto-novo)
  - [...reordenar ou esconder projetos](#reordenar-ou-esconder-projetos)
  - [...a página Perfil (skills + CV)](#a-página-perfil-skills--cv)
  - [...os hobbies](#os-hobbies)
  - [...email e redes sociais](#email-e-redes-sociais)
  - [...as cores do site](#as-cores-do-site)
- [📊 Embed de dashboard PowerBI](#-embed-de-dashboard-powerbi)
- [📖 Glossário](#-glossário)
- [🩹 Resolução de problemas](#-resolução-de-problemas)
- [⚙️ Arquitetura técnica (para developers)](#%EF%B8%8F-arquitetura-técnica-para-developers)

---

## 🟢 Caminho fácil: editar pelo navegador

Toda a edição acontece em https://github.com/0xFelipeGD/fernando-diogo-website. Basta uma conta GitHub (gratuita).

### Passo 1: Abrir o ficheiro a editar

1. Vai a https://github.com/0xFelipeGD/fernando-diogo-website
2. Clica nas pastas para navegar até ao ficheiro (ex: `content` → `site` → `pt.json`)
3. Clica no ficheiro para o ver

### Passo 2: Editar

1. No canto superior direito do ficheiro, clica no **lápis** ✏️ ("Edit this file")
2. O GitHub abre um editor no próprio navegador
3. Faz as alterações que quiseres
4. Em baixo, na caixa **"Commit changes..."**, escreve uma descrição curta do que mudaste (ex: *"Atualizei a bio"*)
5. Clica no botão verde **"Commit changes"**

### Passo 3: Esperar

Em ~1 minuto, o site online atualiza com as tuas alterações. Pronto.

> **Aviso pra ficheiros JSON:** se editares um `.json` e quebrares a sintaxe (esqueceres uma vírgula, fechares mal um colchete), o site dá erro no deploy. Se acontecer, vê em [Resolução de problemas](#-resolução-de-problemas) — é fácil de reverter.

### Como trocar uma imagem pelo navegador

1. Vai a https://github.com/0xFelipeGD/fernando-diogo-website
2. Navega até à pasta da imagem (ex: `public/images/about/`)
3. Clica no ficheiro existente (ex: `portrait.jpg`)
4. Em cima à direita, clica nos **três pontinhos `…`** → **"Delete file"**
5. Faz commit do delete
6. Volta à pasta, clica em **"Add file"** → **"Upload files"**
7. Arrasta a nova imagem para lá. **Mantém o mesmo nome de ficheiro** (ex: `portrait.jpg`)
8. Faz commit

Em alternativa, podes usar o caminho completo (mais cómodo para muitas imagens).

### Como criar um ficheiro novo (ex: novo projeto)

1. Navega até à pasta onde queres o ficheiro
2. Clica em **"Add file"** → **"Create new file"**
3. Escreve o nome do ficheiro (ex: `meta.json`)
4. Cola o conteúdo
5. Faz commit

Para criar uma pasta nova, escreve o nome da pasta seguido de `/` no nome do ficheiro: ex: `o-meu-projeto/meta.json` cria a pasta `o-meu-projeto` automaticamente.

---

## 🟠 Caminho completo: no teu computador

Usa este caminho se vais fazer **muitas mudanças de uma vez** ou quiseres ver o resultado **antes de publicar**.

### Instalações (uma vez só)

1. **[Git](https://git-scm.com/downloads)** — faz a sincronização com o GitHub
2. **[Node.js](https://nodejs.org/)** — versão 20 ou superior. Necessário para correr o site no teu computador.
3. **[VS Code](https://code.visualstudio.com/)** — editor de código simpático. Vai mostrar erros de JSON em tempo real, super útil.

> **Como abrir o "terminal":**
> - **Mac:** carrega `Cmd + Espaço`, escreve "Terminal", carrega Enter
> - **Windows:** carrega `Win`, escreve "PowerShell", carrega Enter
> - **Linux:** abre o "Terminal" das aplicações

### Clonar o site para o teu computador (uma vez só)

No terminal:

```bash
git clone https://github.com/0xFelipeGD/fernando-diogo-website.git
cd fernando-diogo-website
npm install
```

A última linha descarrega todas as dependências (demora ~1 minuto).

### Ver o site no teu computador

```bash
npm run dev
```

Abre http://localhost:3000 no navegador. Sempre que guardares um ficheiro, o navegador atualiza sozinho.

Para parar, no terminal carrega `Ctrl + C`.

### Publicar as alterações

Sempre que mudares algo, no terminal:

```bash
git add .
git commit -m "Atualizei o texto da home"
git push
```

- `git add .` — marca todas as tuas alterações para serem enviadas
- `git commit -m "..."` — embrulha as alterações com uma descrição
- `git push` — envia para o GitHub

Em ~1 minuto o site online atualiza.

---

## 📍 Onde fica cada coisa do site

```
fernando-diogo-website/
│
├── content/                    👈 TODO o conteúdo editável vive aqui
│   ├── site/pt.json            ← textos da página inicial (PT)
│   ├── site/en.json            ← textos da página inicial (EN)
│   ├── ui/pt.json              ← itens do menu, botões, formulário (PT)
│   ├── ui/en.json              ← itens do menu, botões, formulário (EN)
│   ├── profile/pt.json         ← skills, línguas, formação (PT)
│   ├── profile/en.json         ← skills, línguas, formação (EN)
│   ├── hobbies/pt.json         ← lista de hobbies (PT)
│   ├── hobbies/en.json         ← lista de hobbies (EN)
│   └── projects/
│       ├── _index.json         ← ordem e visibilidade dos projetos
│       └── <nome-do-projeto>/
│           ├── meta.json       ← dados estruturados do projeto
│           ├── pt.mdx          ← texto longo em PT
│           └── en.mdx          ← texto longo em EN
│
├── public/                     👈 imagens e ficheiros públicos
│   ├── images/                 ← todas as imagens do site
│   └── cv/                     ← PDFs do CV (PT e EN)
│
└── styles/tokens.css           👈 paleta de cores
```

**Regra de ouro:** se queres mudar conteúdo, está em `content/` ou em `public/images/`. Não tens de tocar em mais nada.

---

## ✏️ Como editar...

### ...textos da página inicial

Edita **`content/site/pt.json`** (e a mesma coisa em `content/site/en.json` para a versão inglesa).

| Mudar | Onde no ficheiro |
|---|---|
| Título grande do hero | `hero.headline` e `hero.sublineLine1` |
| Texto debaixo do título | `hero.subline` |
| Botão principal | `hero.cta` |
| "Em destaque" no canto da imagem | `hero.featuredProjectChip` |
| Os 4 números (50/3/80/20) | `stats` |
| "Duas linguagens, um olhar" | `dualSpecialty` |
| Bloco "Da planta ao painel" | `dataInsights` |
| Bio do bloco "Sobre" | `about` |
| Banda preta antes do rodapé | `contactCta` |

**Itens do menu** (Início, Projetos, Perfil, Hobbies, Contacto): em `content/ui/pt.json` (e `en.json`).

> **Atenção:** o ficheiro tem que continuar a ser **JSON válido**. Vê o [Glossário → JSON](#-glossário) se nunca editaste um.

---

### ...imagens

Cada imagem do site tem um caminho fixo. Para trocar:

1. Vai à pasta `public/images/`
2. Encontra o ficheiro a substituir
3. Substitui-o pela nova imagem **com exatamente o mesmo nome**
4. Tamanho recomendado: **máximo 2400px de largura**, formato JPG

> **Como verificar o tamanho de uma imagem:** clica com o botão direito → "Propriedades" / "Get Info". Procura "Dimensões" ou "Resolução". Se for muito grande, usa um redimensionador online como [squoosh.app](https://squoosh.app) (não precisa de conta).

**Mapa rápido das imagens principais:**

```
public/images/
├── hero/hero-architecture.jpg          ← imagem grande do hero
├── about/portrait.jpg                  ← retrato do bloco "Sobre" e do Perfil
├── data-insights/dashboard-preview.jpg ← imagem do bloco "Da planta ao painel"
├── projects/<projeto>/cover.jpg        ← capa de cada projeto
├── projects/<projeto>/01.jpg, 02.jpg…  ← imagens da galeria de cada projeto
└── hobbies/photography.jpg, cycling.jpg, … ← imagens dos hobbies
```

---

### ...um projeto existente

Cada projeto tem uma pasta em `content/projects/<nome-do-projeto>/` com 3 ficheiros:

| Ficheiro | O que contém |
|---|---|
| `meta.json` | Dados estruturados (ano, localização, área, capa, galeria, tags, título, resumo) |
| `pt.mdx` | Texto longo do projeto em português |
| `en.mdx` | Texto longo do projeto em inglês |

**Para mudar o texto longo:** abre `pt.mdx`, edita normalmente. Usa `##` para títulos de secção, `**negrito**`, `*itálico*`, listas com `-`. Vê o [Glossário → MDX](#-glossário).

**Para mudar dados estruturados** (ano, área, tags, etc.): abre `meta.json` e edita. Tem que continuar a ser JSON válido.

---

### ...adicionar um projeto novo

#### Passo 1: criar a pasta e os ficheiros

Cria uma pasta com um *slug* (ver glossário) em `content/projects/`:

```
content/projects/o-meu-novo-projeto/
```

Dentro, cria 3 ficheiros:

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

**`pt.mdx`** (texto livre):

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

#### Passo 2: adicionar imagens

Em `public/images/projects/o-meu-novo-projeto/`:

- `cover.jpg` (obrigatória — é a capa)
- `01.jpg`, `02.jpg`, … (opcionais — galeria)

#### Passo 3: registar o projeto

Edita `content/projects/_index.json` e adiciona o slug ao array `all`:

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

Se quiseres que apareça em destaque na home, adiciona também ao array `featured` (máximo 3 recomendado).

---

### ...reordenar ou esconder projetos

Tudo controlado em `content/projects/_index.json`:

- **Reordenar a página de Projetos:** muda a ordem dos slugs no array `all`
- **Reordenar os destacados na home:** muda a ordem em `featured`
- **Esconder um projeto temporariamente:** remove o slug de `all` (mantém os ficheiros, simplesmente não aparece)
- **Apagar definitivamente:** remove de `all` e `featured`, e apaga a pasta `content/projects/<slug>/`

---

### ...a página Perfil (skills + CV)

Edita `content/profile/pt.json` (e `en.json`):

- **Adicionar uma capacidade nova:** adiciona uma string ao array `items` da categoria certa em `skills.categories`.
- **Adicionar uma categoria nova:** adiciona um objeto novo ao array `skills.categories` com `title` e `items`.
- **Mudar o nível de uma língua:** altera `proficiency` (0-100, controla a barra) e `level` (texto).
- **Adicionar entrada de formação:** adiciona um objeto ao array `education.items` com `period`, `title`, `institution` e `description`. A ordem do array é a ordem na timeline (mais recente em cima).

**Substituir o CV** (atualmente é um placeholder):

1. Exporta o CV para PDF (PT e EN, se quiseres ambas as versões)
2. Renomeia para `fernando-diogo-cv-pt.pdf` e `fernando-diogo-cv-en.pdf`
3. Substitui os ficheiros existentes em `public/cv/` (mantém os mesmos nomes)
4. Faz commit

---

### ...os hobbies

Edita `content/hobbies/pt.json` (e `en.json`). Cada hobby tem `slug`, `title`, `description` e `image`.

Os slugs têm que ser iguais nos dois idiomas (PT e EN).

---

### ...email e redes sociais

Em `content/site/pt.json` (e `en.json`), bloco `social`:

```json
"social": {
  "email": "fernando@fernandodiogo.com",
  "whatsapp": "+351 900 000 000",
  "linkedin": "https://linkedin.com/in/fernandodiogo",
  "instagram": "https://instagram.com/fernandodiogo"
}
```

Aparece no rodapé e na página de contacto. **O email aqui é também o destinatário do formulário de contacto** — quando alguém envia o formulário, abre o cliente de email do visitante já preenchido com este endereço.

---

### ...as cores do site

Edita `styles/tokens.css`. As cores estão todas no topo:

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
}
```

Muda qualquer hexadecimal e o site inteiro adapta-se. Para escolher cores HEX visualmente, usa [coolors.co](https://coolors.co) ou o conta-gotas do macOS.

---

## 📊 Embed de dashboard PowerBI

Para projetos da categoria `data-intelligence`, o site mostra um placeholder *"Dashboard interativo em breve"* sobre a imagem de capa. Para o substituir por um dashboard real e interativo:

1. No PowerBI Service, abre o relatório.
2. Vai a **File → Embed report → Publish to web (public)**.
3. O PowerBI gera uma URL tipo `https://app.powerbi.com/view?r=eyJrIjoi...`
4. Copia essa URL.
5. Abre o `meta.json` do projeto (ex: `content/projects/linha-verde-mercado-imobiliario/meta.json`).
6. Cola a URL no campo `"dashboardEmbed": "..."`.
7. Faz commit.

O site renderiza automaticamente um iframe interativo (filtros, slicers e drill-down funcionam).

> **Importante:** "Publish to web" exige licença Power BI Pro do publicador. Quem visita o site não precisa de nada.

---

## 📖 Glossário

### JSON

Formato para guardar dados estruturados. Parece com isto:

```json
{
  "nome": "Fernando",
  "idade": 22,
  "ativo": true,
  "interesses": ["arquitetura", "dados"]
}
```

**Regras importantes:**
- **Aspas duplas** (não simples): `"correto"`, não `'errado'`
- **Vírgulas entre itens**, mas **NÃO** depois do último: `"a", "b", "c"` ✅, `"a", "b", "c",` ❌
- **Chavetas `{}`** para objetos (campos com nome)
- **Colchetes `[]`** para listas
- Texto vai entre aspas, números não

**Ferramenta de salvamento:** se algo der erro, cola o JSON em https://jsonlint.com — ele aponta a linha onde está o problema.

### Slug

Versão "URL-friendly" de um nome. Exemplos:

- "O Meu Novo Projeto" → slug: `o-meu-novo-projeto`
- "Atelier Pinheiros" → slug: `atelier-pinheiros`

Regras: só **letras minúsculas**, **números** e **hífenes**. Sem espaços, sem acentos, sem caracteres especiais.

### MDX

Markdown com possibilidade de incluir componentes. Para o que precisas, é **igual a Markdown comum**:

| Escreves | Aparece |
|---|---|
| `## Título` | um título de secção |
| `**negrito**` | **negrito** |
| `*itálico*` | *itálico* |
| `- item` | uma lista com bola |
| `1. item` | uma lista numerada |
| `[texto](https://link)` | link clicável |

### Commit

Uma "fotografia" das alterações. Cada vez que fazes commit, o GitHub guarda o estado do código com a tua descrição. Permite voltar atrás se algo correr mal.

### Push

Enviar os teus commits do computador local para o GitHub. Só depois do `push` é que o site online vê as alterações.

### Branch (ramo)

Uma "linha paralela" do código. Por defeito o site usa a branch `main`. Para edições simples, **vais sempre trabalhar na `main`** — não te preocupes com isto.

---

## 🩹 Resolução de problemas

**O site quebrou depois de eu editar um JSON.**
Provavelmente o JSON ficou inválido. Cola o conteúdo em https://jsonlint.com — ele aponta exatamente onde está o erro.

Para reverter a última alteração: vai ao [GitHub](https://github.com/0xFelipeGD/fernando-diogo-website) → clica no separador **"commits"** → encontra a alteração → clica nos três pontinhos `…` → **"Revert"**.

**A imagem não aparece.**
- Confirma que o caminho no JSON começa com `/` (ex: `/images/projects/foo/cover.jpg`).
- Confirma que o ficheiro existe em `public/images/...` com o nome exato (atenção a maiúsculas/minúsculas).

**A imagem antiga continua a aparecer mesmo depois de eu trocar.**
O navegador ou o Vercel guardam a imagem em cache. Para forçar a recarregar:
- **Navegador:** carrega `Ctrl + Shift + R` (ou `Cmd + Shift + R` no Mac).
- **Caminho completo no terminal:** `rm -rf .next/cache/images && npm run dev`

**Mudei a paleta e algo ficou ilegível.**
Vai ao GitHub → vê o ficheiro `styles/tokens.css` → clica no separador **"History"** → encontra a versão anterior e reverte.

Caminho completo:
```bash
git checkout styles/tokens.css
```

**O dashboard PowerBI não aparece embebido.**
Verifica que a URL no `meta.json` começa com `https://`. Se começar com qualquer outra coisa (caminho de imagem, vazio), o site mostra o placeholder.

**O servidor local não arranca (caminho completo).**

```bash
rm -rf .next node_modules
npm install
npm run dev
```

---

## ⚙️ Arquitetura técnica (para developers)

### Stack

- **[Next.js 16](https://nextjs.org/)** com App Router (renderização estática)
- **React 19** + **TypeScript** (modo estrito)
- **[Tailwind CSS 4](https://tailwindcss.com/)** + variáveis CSS para a paleta
- **[MDX](https://mdxjs.com/)** via `@next/mdx` para o corpo dos projetos
- **[Framer Motion](https://www.framer.com/motion/)** para animações
- **Formulário de contacto:** `mailto:` nativo (sem backend)
- **[Vercel](https://vercel.com/)** para deployment

### Estrutura completa de pastas

```
fernando-diogo-website/
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
├── content/                ← Conteúdo editável (JSON + MDX)
├── components/             ← Componentes React por domínio
├── lib/
│   ├── i18n/               ← Configuração de idiomas
│   ├── content/            ← Carregadores de conteúdo
│   ├── fonts.ts            ← Configuração das fontes
│   └── cn.ts               ← Helper para classes condicionais
│
├── public/
│   ├── images/             ← Todas as imagens
│   └── cv/                 ← PDFs do CV (PT e EN)
├── styles/tokens.css       ← Paleta de cores (CSS variables)
├── proxy.ts                ← Redireciona / para /pt
└── docs/                   ← Spec, plano e documentação adicional
```

### Comandos

```bash
npm run dev      # servidor de desenvolvimento (com hot reload)
npm run build    # build de produção
npm run start    # correr a build de produção localmente
npm test         # correr testes unitários
npm run lint     # verificar problemas no código
```

### Internacionalização

- O segmento `[lang]` na URL controla o idioma (`/pt/...` ou `/en/...`)
- `lib/i18n/config.ts` define os idiomas suportados
- O proxy (`proxy.ts`) redireciona `/` para `/pt`
- Todas as strings traduzíveis vivem em `content/ui/{pt,en}.json` e `content/site/{pt,en}.json`

### SEO

- Cada página tem metadata própria (título, descrição, OG image)
- `hreflang` configurado em todas as páginas para indexação bilingue
- Sitemap gerado automaticamente em `/sitemap.xml`
- OG image dinâmica por idioma em `/<lang>/opengraph-image`

---

## Licença

Portfolio pessoal — todo o conteúdo (textos e imagens) pertence ao Fernando Diogo. A estrutura do código está disponível como referência.
