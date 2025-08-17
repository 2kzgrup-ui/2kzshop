# alek.shitpost — HUB
Este projeto transforma seu site num **hub**: sem venda direta, apenas **redirecionamento** para as plataformas.

## Estrutura
```
/site-alek-hub
├── index.html
├── /css
│   ├── theme.css     # Paleta, estilos base e componentes
│   └── style.css     # Overrides rápidos (edite aqui)
├── /js
│   └── main.js       # Dados dos produtos + lógica de abas/filtros
└── /img              # Suas imagens (opcional)
```

## Como editar produtos
Abra `js/main.js` e edite o array `DATA.products`:
```js
{
  id: "slug-do-produto",
  name: "Nome do produto",
  price: 99.9,
  category: "Camisetas|Acessórios|Adesivos|Colecionáveis|Outros",
  platforms: ["Shopee","Mercado Livre","Amazon","Americanas"],
  url: "https://link-do-marketplace",
  image: "img/minha-foto.jpg", // opcional
  desc: "Descrição curta",
  featured: true,              // aparece no Início
  recommended: true            // aparece em Recomendações
}
```

## Personalização rápida
- **Cores**: mude em `css/theme.css` nas variáveis `:root`.
- **Fonte**: troque a importação do Google Fonts no `<head>` do `index.html`.
- **Redes sociais**: edite os links na aba **Contato** do `index.html`.

## Hospedagem
Funciona 100% estático (GitHub Pages, Vercel, Netlify, etc.).
