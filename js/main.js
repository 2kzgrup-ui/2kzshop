/* ==============================
   HUB alek.shitpost — JS principal
   - Edite a lista de produtos em DATA.products
   - Cada item deve apontar para a URL do marketplace
================================= */

const DATA = {
  products: [
    {
      id: "livro",
      name: "Mergulho na escuridão (Five Nights)",
      price: 35.28,
      category: "Livros",
      platforms: ["Mercado Livre"],
      url: "https://mercadolivre.com/sec/2s1Ar3Q", // troque
      image: "https://http2.mlstatic.com/D_NQ_NP_715073-MLU74589312917_022024-O.webp", // opcional: coloque um caminho em img/
      desc: "",
      featured: true,
      recommended: true
    },
    {
      id: "camisa",
      name: "Camiseta Oversized sovereignty",
      price: 39.84,
      category: "Camisetas",
      platforms: ["Mercado Livre"],
      url: "https://mercadolivre.com/sec/25XtEx5",
      image: "https://http2.mlstatic.com/D_NQ_NP_931964-MLB89663238864_082025-O-camiseta-oversized-estampa-moderna-roupas-streetwear-basica.webp",
      desc: "",
      featured: true,
      recommended: false
    },
    {
      id: "stickers-pack",
      name: "Stickers para Notebook (kit 10)",
      price: 24.9,
      category: "Adesivos",
      platforms: ["Amazon", "Mercado Livre"],
      url: "https://amazon.example.com/item/stickers-pack",
      image: "",
      desc: "",
      featured: false,
      recommended: true
    },
    {
      id: "book-collector",
      name: "Livro de Colecionador",
      price: 129.9,
      category: "Livros",
      platforms: ["Amazon"],
      url: "https://amazon.example.com/item/book-collector",
      image: "",
      desc: "",
      featured: false,
      recommended: true
    }
  ]
};

/* --------- Utilidades --------- */
const $ = (q, ctx=document) => ctx.querySelector(q);
const $$ = (q, ctx=document) => Array.from(ctx.querySelectorAll(q));

function money(v){ return v ? `R$ ${v.toFixed(2).replace('.', ',')}` : "" }

function platformIcon(name){
  const map = {
    "Shopee":"fa-solid fa-bag-shopping",
    "Mercado Livre":"fa-solid fa-handshake",
    "Amazon":"fa-brands fa-amazon",
    "Americanas":"fa-solid fa-store"
  };
  return map[name] || "fa-solid fa-link";
}

/* --------- Navegação por abas --------- */
function setActiveTab(tab){
  $$(".nav a").forEach(a=>a.classList.toggle("active", a.dataset.route===tab));
  $$(".tab").forEach(s=>s.classList.toggle("current", s.dataset.tab===tab));
  if(location.hash.replace("#","")!==tab) location.hash = tab;
}

function initNavigation(){
  // toggle menu mobile
  const btn = $(".nav-toggle");
  const list = $("#nav-list");
  if(btn){
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded")==="true";
      btn.setAttribute("aria-expanded", String(!expanded));
      list.classList.toggle("open");
    });
  }

  $$(".nav a").forEach(a=>a.addEventListener("click",(e)=>{
    e.preventDefault();
    setActiveTab(a.dataset.route);
    list?.classList.remove("open");
  }));

  const initial = location.hash ? location.hash.replace("#","") : "inicio";
  setActiveTab(initial);
}

/* --------- Render helpers --------- */
function card(product){
  const img = product.image ? `<img src="${product.image}" alt="${product.name}" />`
                            : `<div class="card-media" aria-hidden="true"><i class="fa-solid fa-image"></i></div>`;
  return `<article class="card" data-id="${product.id}">
    ${product.image ? `<div class="card-media">${img}</div>` : img}
    <div class="card-body">
      <h4 class="card-title">${product.name}</h4>
      <div class="card-price">${money(product.price)}</div>
     
      <div class="badges">${product.platforms.map(p=>`<span class="badge platform"><i class="${platformIcon(p)}"></i> ${p}</span>`).join("")}</div>
      <div class="card-actions">
        <a class="btn btn-primary" href="${product.url}" target="_blank" rel="noopener">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Ver no site
        </a>
    </div>
  </article>`;
}

function renderHighlights(){
  const container = $("#highlights");
  if(!container) return;
  const items = DATA.products.filter(p=>p.featured).slice(0,3);
  container.innerHTML = items.map(card).join("");
}

function renderProducts(list=DATA.products){
  $("#productsGrid").innerHTML = list.map(card).join("");
}

function renderRecs(){
  const recs = DATA.products.filter(p=>p.recommended);
  $("#recGrid").innerHTML = recs.map(card).join("");
}

/* --------- Filtros e busca --------- */
function applyFilters(){
  const plat = $("#platformFilter").value;
  const cat = $("#categoryFilter").value;
  const q = $("#searchInput").value.trim().toLowerCase();

  let list = DATA.products.slice();
  if(plat) list = list.filter(p=>p.platforms.includes(plat));
  if(cat) list = list.filter(p=>p.category===cat);
  if(q) list = list.filter(p=> (p.name+p.desc).toLowerCase().includes(q));

  renderProducts(list);
}

function initFilters(){
  $("#platformFilter").addEventListener("change", applyFilters);
  $("#categoryFilter").addEventListener("change", applyFilters);
  $("#searchBtn").addEventListener("click", applyFilters);
  $("#searchInput").addEventListener("keydown", (e)=>{ if(e.key==="Enter") applyFilters(); });
}

/* --------- Ações --------- */
function initCopyLinks(){
  document.body.addEventListener("click", (e)=>{
    const btn = e.target.closest("[data-copy]");
    if(!btn) return;
    const url = btn.getAttribute("data-copy");
    navigator.clipboard.writeText(url).then(()=>{
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Copiado!';
      setTimeout(()=> btn.innerHTML = '<i class="fa-regular fa-copy"></i> Copiar link', 1200);
    });
  });
}

/* --------- Boot --------- */
function boot(){
  $("#year").textContent = new Date().getFullYear();

  initNavigation();
  renderHighlights();
  renderProducts();
  renderRecs();
  initFilters();
  initCopyLinks();
}

document.addEventListener("DOMContentLoaded", boot);
