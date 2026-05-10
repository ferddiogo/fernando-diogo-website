# Guia de Edição — Site do Fernando Diogo

Este guia mostra como atualizar **textos**, **imagens**, **projetos**, **paleta de cores**, **idiomas** e **dashboard PowerBI** sem precisar saber programar.

> Você só precisa: clonar o repo, abrir os arquivos num editor (recomendo [VS Code](https://code.visualstudio.com/)), salvar, e dar push no GitHub. O Vercel publica sozinho em ~1 minuto.

## Tabela de tarefas comuns

| O que quero mudar | Onde editar |
|---|---|
| Textos da página inicial | `content/site/pt.json` (português) e `content/site/en.json` (inglês) |
| Itens do menu | `content/ui/pt.json` e `content/ui/en.json` |
| Adicionar um novo projeto | Veja seção **"Adicionar projeto"** abaixo |
| Editar um projeto existente | `content/projects/<slug>/meta.json` (dados) e `pt.mdx` / `en.mdx` (texto longo) |
| Esconder ou reordenar projetos | `content/projects/_index.json` |
| Trocar uma imagem | Substitua o arquivo em `public/images/...` mantendo o mesmo nome |
| Mudar cor da paleta | `styles/tokens.css` |
| Lista de hobbies | `content/hobbies/pt.json` e `content/hobbies/en.json` |
| Email/redes sociais | `content/site/pt.json` → bloco `social` |
| Embed do dashboard PowerBI | `content/projects/<slug>/meta.json` → campo `dashboardEmbed` |

---

## Adicionar projeto

1. Crie a pasta: `content/projects/meu-novo-projeto/`
2. Crie 3 arquivos dentro:
   - `meta.json` — dados estruturados
   - `pt.mdx` — texto em português
   - `en.mdx` — texto em inglês
3. Coloque imagens em `public/images/projects/meu-novo-projeto/`
4. Adicione o slug `"meu-novo-projeto"` no array `all` de `content/projects/_index.json`
5. (Opcional) Para destacar na home, adicione também no array `featured`

### `meta.json` mínimo

```json
{
  "slug": "meu-novo-projeto",
  "category": "architecture",
  "year": 2025,
  "location": { "pt": "São Paulo, BR", "en": "São Paulo, Brazil" },
  "cover": "/images/projects/meu-novo-projeto/cover.jpg",
  "gallery": [],
  "tags": [],
  "title": { "pt": "Meu Novo Projeto", "en": "My New Project" },
  "summary": {
    "pt": "Resumo de uma frase.",
    "en": "One sentence summary."
  }
}
```

Categorias válidas: `architecture`, `data-intelligence`, `urban-study`, `interior`.

### `pt.mdx` exemplo

```markdown
## O conceito

Texto livre aqui. Você pode usar **negrito**, *itálico*, e listas:

- Item 1
- Item 2

## Como foi feito

Mais texto.
```

---

## Trocar imagens

Cada imagem tem um caminho fixo no código. Para trocar uma imagem:

1. Encontre o arquivo atual em `public/images/...`
2. Substitua por uma nova com **o mesmo nome**
3. Tamanho recomendado: máximo 2400px de largura, formato JPG
4. Salve, commit, push.

Se quiser usar uma imagem com nome diferente, mude o caminho no JSON correspondente (ex: `meta.json` do projeto, `content/site/pt.json`, etc).

---

## Embed do dashboard PowerBI

Para projetos da categoria `data-intelligence`, o site mostra automaticamente um placeholder "Dashboard interativo em breve" sobre a imagem de capa. Para substituir pelo dashboard real e interativo:

1. No PowerBI Service do Fernando, abra o relatório.
2. Vá em **File → Embed report → Publish to web (public)**.
3. PowerBI gera uma URL tipo `https://app.powerbi.com/view?r=eyJrIjoi...`
4. Copie essa URL.
5. Abra o `meta.json` do projeto (ex: `content/projects/linha-verde-mercado-imobiliario/meta.json`)
6. Cole a URL no campo `"dashboardEmbed": "..."`
7. Salve, commit, push.

O site renderiza automaticamente como iframe interativo (filtros, slicers, drill-down funcionam).

> **Importante:** "Publish to web" exige licença Power BI Pro do publicador. Visitantes não precisam de nada.

---

## Mudar a paleta de cores

Edite `styles/tokens.css`:

```css
:root {
  --bg-base:    #F5F2ED;  /* fundo principal */
  --accent:     #FF6B35;  /* laranja dos botões e destaques */
  --steel:      #0F1E3D;  /* azul escuro */
  /* ... */
}
```

Mude qualquer hex para o que quiser. O site inteiro se adapta automaticamente.

---

## Publicar mudanças

1. Salve seus arquivos
2. No terminal, rode:
   ```bash
   git add .
   git commit -m "Atualizei textos da home"
   git push
   ```
3. O Vercel detecta o push e publica em ~1 minuto.

---

## Configurar email do formulário (uma vez só)

1. Crie conta grátis em https://formspree.io
2. Crie um novo "form" — copie o ID (algo como `xpzgkqwe`)
3. No painel do Vercel, em **Settings → Environment Variables**, adicione:
   - Nome: `NEXT_PUBLIC_FORMSPREE_ID`
   - Valor: o ID que você copiou
4. Faça um redeploy.

Pronto — toda mensagem enviada pelo formulário cai no email cadastrado no Formspree.

---

## Mudar URL canônica

Por padrão o site usa `https://fernandodiogo.com` como URL base nos metadados. Para mudar:

- `app/sitemap.ts` → constante `BASE`
- `lib/i18n/alternates.ts` → parâmetro `baseUrl`
- `app/layout.tsx` → `metadataBase`

---

## Problemas comuns

**O site quebrou depois que editei algo.**
Provavelmente o JSON ficou inválido. Cole o conteúdo em https://jsonlint.com e ele aponta o erro. JSON exige aspas duplas e nada de vírgula sobrando.

**A imagem não aparece.**
Confira se o caminho no JSON começa com `/` (ex: `/images/projects/foo/cover.jpg`). Sem `/` antes não funciona.

**Mudei a paleta e algo ficou ilegível.**
Volte ao git: `git checkout styles/tokens.css`. Tente uma cor por vez.

**O dashboard PowerBI não aparece embutido.**
Verifique se a URL no `meta.json` começa com `https://`. Se começar com qualquer outra coisa (caminho de imagem, vazio), o site mostra o placeholder.
