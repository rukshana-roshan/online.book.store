// ── DATA ──
const books = [
  { id:1, title:"Tomorrow, Tomorrow", author:"Lily James", price:14.99, oldPrice:null, genre:"Fiction", rating:"★★★★★", img:"https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=450&fit=crop" },
  { id:2, title:"Sea of Tranquility", author:"Emily St. John", price:12.99, oldPrice:17.99, genre:"Sci-Fi", rating:"★★★★☆", img:"https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=300&h=450&fit=crop" },
  { id:3, title:"Babel", author:"R. F. Kuang", price:18.99, oldPrice:null, genre:"Fantasy", rating:"★★★★★", img:"https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=450&fit=crop" },
  { id:4, title:"The Atlas Six", author:"Olivie Blake", price:15.99, oldPrice:19.99, genre:"Dark Fantasy", rating:"★★★★☆", img:"https://images.unsplash.com/photo-1476275466078-4cdc8b09d9d7?w=300&h=450&fit=crop" },
  { id:5, title:"Lessons in Chemistry", author:"Bonnie Garmus", price:13.99, oldPrice:null, genre:"Literary", rating:"★★★★★", img:"https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=300&h=450&fit=crop" },
  { id:6, title:"Holly", author:"Stephen King", price:17.99, oldPrice:22.99, genre:"Thriller", rating:"★★★★☆", img:"https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=300&h=450&fit=crop" },
  { id:7, title:"Hello Beautiful", author:"Ann Napolitano", price:16.99, oldPrice:null, genre:"Literary", rating:"★★★★★", img:"https://images.unsplash.com/photo-1521587765099-8835e7201186?w=300&h=450&fit=crop" },
  { id:8, title:"Fourth Wing", author:"Rebecca Yarros", price:14.49, oldPrice:18.99, genre:"Fantasy", rating:"★★★★★", img:"https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=300&h=450&fit=crop" },
];

const categories = [
  { name:"Fiction", count:"2,140", icon:"📖", cls:"cat-1" },
  { name:"Non-Fiction", count:"1,830", icon:"📰", cls:"cat-2" },
  { name:"Mystery", count:"940", icon:"🔍", cls:"cat-3" },
  { name:"Sci-Fi", count:"720", icon:"🚀", cls:"cat-4" },
  { name:"History", count:"1,050", icon:"🏛️", cls:"cat-5" },
  { name:"Fantasy", count:"880", icon:"✨", cls:"cat-6" },
  { name:"Self Help", count:"640", icon:"🌱", cls:"cat-7" },
  { name:"Children's", count:"1,200", icon:"🦋", cls:"cat-8" },
];

const reviews = [
  { text:"Folio & Co. is my absolute go-to. The curation is impeccable — I've discovered authors I never would have found elsewhere.", name:"Sarah Chen", meta:"Member since 2022 · 47 books" },
  { text:"The packaging alone is worth mentioning. Every order arrives like a gift. Beautiful touches that show how much they care about readers.", name:"Marcus Rivera", meta:"Member since 2021 · 89 books" },
  { text:"I ordered on a Thursday and had my books by Saturday. Incredible speed, and the staff picks newsletter is genuinely great.", name:"Priya Patel", meta:"Member since 2023 · 23 books" },
  { text:"Finally a bookstore that gets it. The genre filtering is brilliant and I've never had a recommendation miss.", name:"Tom Eriksson", meta:"Member since 2020 · 134 books" },
];

const deals = [
  { title:"The Covenant of Water", author:"Abraham Verghese", price:12.99, oldPrice:27.99, save:"54%", desc:"A sweeping family saga set across three generations in South India, following a family that mysteriously afflicts one person in each generation.", img:"https://images.unsplash.com/photo-1585351737354-204ffbbe584f?w=300&h=440&fit=crop" },
  { title:"Demon Copperhead", author:"Barbara Kingsolver", price:9.99, oldPrice:18.99, save:"47%", img:"https://images.unsplash.com/photo-1580983218765-f663bec07b37?w=300&h=440&fit=crop" },
  { title:"The Fraud", author:"Zadie Smith", price:11.99, oldPrice:20.99, save:"43%", img:"https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=300&h=440&fit=crop" },
];

// ── CART ──
let cart = [];

function addToCart(title, author, price, img) {
  const existing = cart.find(i => i.title === title);
  if (existing) {
    showToast(`${title} already on your shelf!`);
    return;
  }
  cart.push({ title, author, price, img });
  renderCart();
  showToast(`${title} added to shelf!`);
  openCart();
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  renderCart();
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const empty = document.getElementById('cartEmpty');
  const total = cart.reduce((s, i) => s + i.price, 0);
  document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
  document.getElementById('cartCount').textContent = cart.length;

  if (cart.length === 0) {
    empty.style.display = 'block';
    const items = container.querySelectorAll('.cart-item');
    items.forEach(el => el.remove());
    return;
  }
  empty.style.display = 'none';
  const existingItems = container.querySelectorAll('.cart-item');
  existingItems.forEach(el => el.remove());

  cart.forEach((item, idx) => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <img class="cart-item-img" src="${item.img}" alt="${item.title}">
      <div>
        <div class="cart-item-title">${item.title}</div>
        <div class="cart-item-author">${item.author}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
      </div>
      <button class="cart-remove" onclick="removeFromCart(${idx})">✕</button>
    `;
    container.appendChild(el);
  });
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
}
function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
}

// ── TOAST ──
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

// ── RENDER BOOKS ──
function renderBooks() {
  const grid = document.getElementById('booksGrid');
  books.forEach((b, i) => {
    const el = document.createElement('div');
    el.className = 'book-item';
    el.style.transitionDelay = `${i * 0.08}s`;
    el.innerHTML = `
      <div class="book-cover">
        <img src="${b.img}" alt="${b.title}" loading="lazy">
        <div class="book-genre-tag">${b.genre}</div>
        <div class="book-overlay">
          <button class="overlay-btn" onclick="addToCart('${b.title}','${b.author}',${b.price},'${b.img}')">Add to Shelf</button>
          <button class="overlay-btn" onclick="showToast('Preview for ${b.title} coming soon!')">Quick View</button>
        </div>
      </div>
      <div class="book-title">${b.title}</div>
      <div class="book-author">${b.author}</div>
      <div class="book-footer">
        <span class="book-price">$${b.price.toFixed(2)}</span>
        <span class="book-stars">${b.rating}</span>
      </div>
    `;
    grid.appendChild(el);
  });
}

// ── RENDER CATEGORIES ──
function renderCategories() {
  const grid = document.getElementById('catsGrid');
  categories.forEach((c, i) => {
    const el = document.createElement('a');
    el.href = '#'; el.className = `cat-card ${c.cls}`;
    el.style.transitionDelay = `${i * 0.06}s`;
    el.onclick = e => { e.preventDefault(); showToast(`Browsing ${c.name}...`); };
    el.innerHTML = `
      <div class="cat-icon">${c.icon}</div>
      <div class="cat-name">${c.name}</div>
      <div class="cat-count">${c.count} books</div>
    `;
    grid.appendChild(el);
  });
}

// ── RENDER DEALS ──
function renderDeals() {
  const grid = document.getElementById('dealsGrid');
  const main = deals[0];
  const mainEl = document.createElement('div');
  mainEl.className = 'deal-main';
  mainEl.innerHTML = `
    <img class="deal-main-img" src="${main.img}" alt="${main.title}">
    <div class="deal-main-body">
      <div>
        <div class="deal-tag">Deal of the Day</div>
        <div class="deal-title">${main.title}</div>
        <div class="deal-author">${main.author}</div>
        <div class="deal-excerpt">${main.desc}</div>
      </div>
      <div>
        <div class="deal-price-row">
          <span class="deal-price-new">$${main.price}</span>
          <span class="deal-price-old">$${main.oldPrice}</span>
          <span class="deal-save">Save ${main.save}</span>
        </div>
        <button class="btn-primary" style="margin-top:1rem;width:100%"
          onclick="addToCart('${main.title}','${main.author}',${main.price},'${main.img}')">
          Add to Shelf
        </button>
      </div>
    </div>
  `;
  grid.appendChild(mainEl);

  deals.slice(1).forEach(d => {
    const el = document.createElement('div');
    el.className = 'deal-mini';
    el.innerHTML = `
      <img src="${d.img}" alt="${d.title}">
      <div class="deal-mini-body">
        <div class="deal-tag">Sale</div>
        <div class="deal-title">${d.title}</div>
        <div class="deal-author">${d.author}</div>
        <div class="deal-price-row" style="margin-top:.75rem">
          <span class="deal-price-new">$${d.price}</span>
          <span class="deal-price-old">$${d.oldPrice}</span>
          <span class="deal-save">Save ${d.save}</span>
        </div>
        <button class="btn-primary" style="margin-top:.75rem;width:100%;padding:10px"
          onclick="addToCart('${d.title}','${d.author}',${d.price},'${d.img}')">Add</button>
      </div>
    `;
    grid.appendChild(el);
  });
}

// ── RENDER REVIEWS ──
function renderReviews() {
  const grid = document.getElementById('reviewsGrid');
  reviews.forEach((r, i) => {
    const initials = r.name.split(' ').map(n => n[0]).join('');
    const el = document.createElement('div');
    el.className = 'review-card';
    el.style.transitionDelay = `${i * 0.1}s`;
    el.innerHTML = `
      <div class="review-quote">"</div>
      <p class="review-text">${r.text}</p>
      <div class="review-author">
        <div class="review-avatar">${initials}</div>
        <div>
          <div class="reviewer-name">${r.name}</div>
          <div class="reviewer-meta">${r.meta}</div>
        </div>
      </div>
    `;
    grid.appendChild(el);
  });
}

// ── SCROLL ANIMATIONS ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

function observeAll() {
  document.querySelectorAll('.book-item, .cat-card, .review-card').forEach(el => observer.observe(el));
}

// ── SCROLL PROGRESS + NAV HIDE ──
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('scrollBar').style.width = `${(scrollTop/docHeight)*100}%`;

  const nav = document.getElementById('navbar');
  if (scrollTop > lastScroll && scrollTop > 200) {
    nav.classList.add('hidden');
  } else {
    nav.classList.remove('hidden');
  }
  if (scrollTop > 50) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
  lastScroll = scrollTop;
});

// ── CURSOR ──
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
});

// ── MOBILE MENU ──
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const btn = document.getElementById('hamburger');
  menu.classList.toggle('open');
  btn.classList.toggle('open');
}

// ── NEWSLETTER ──
function handleNewsletter(e) {
  e.preventDefault();
  showToast('Welcome to the Reading Circle! 🎉');
  e.target.reset();
}

// ── INIT ──
renderBooks();
renderCategories();
renderDeals();
renderReviews();
renderCart();
observeAll();