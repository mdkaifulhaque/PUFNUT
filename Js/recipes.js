// recipes.js - background-image loader + add-to-cart + fallback handling

const STORAGE_KEY = "PUFNUT_PRODUCTS";
let recipeProducts = [];

(function loadRecipeProducts(){
  const saved = localStorage.getItem(STORAGE_KEY);
  const allProducts = saved ? JSON.parse(saved) : [];
  recipeProducts = allProducts.filter(p => p.category === 'recipes');
  renderRecipeCards();
})();

// cart helpers (simple)
const CART_KEY = "pufnut_cart_v3";
function readCart(){ try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch { return []; } }
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartCount(); }
function addToCart(pid){ const prod = recipeProducts.find(x=>x.id===pid); if(!prod) return {ok:false}; const cart = readCart(); const ex = cart.find(i=>i.id===pid); if(ex) ex.qty=(ex.qty||1)+1; else cart.push({id:prod.id,name:prod.name,price:prod.price,qty:1,img:prod.img}); saveCart(cart); return {ok:true}; }
function updateCartCount(){ const t = readCart().reduce((s,i)=>s+(i.qty||1),0); document.querySelectorAll('.nav-cart-count').forEach(el=>el.textContent = t); }

// toast
(function makeToast(){
  if(document.getElementById('pufnut-toast')) return;
  const t = document.createElement('div'); t.id='pufnut-toast';
  Object.assign(t.style, { position:'fixed', right:'16px', bottom:'20px', padding:'8px 12px', borderRadius:'8px', zIndex:99999, display:'none', color:'#fff', fontFamily:'Arial, sans-serif' });
  document.body.appendChild(t);
  window.pufToast = function(msg, isErr=false){ t.textContent=msg; t.style.background = isErr ? '#ff4d4f' : '#111'; t.style.display='block'; t.style.opacity='0'; if(window.gsap){ gsap.to(t,{opacity:1,duration:0.12}); gsap.to(t,{opacity:0,duration:0.28,delay:1.2,onComplete:()=>t.style.display='none'}); } else setTimeout(()=>t.style.display='none',1400); };
})();

function renderRecipeCards(){
  const container = document.getElementById('recipeList');
  if(!container) return;
  container.innerHTML = '';

  if (recipeProducts.length === 0) {
    container.innerHTML = "<p style='color:#fff;text-align:center;padding:20px;'>No recipes available at the moment.</p>";
    return;
  }

  recipeProducts.forEach(p=>{
    const el = document.createElement('div'); el.className = 'product-card';

    // create image wrapper (background applied via JS loader)
    const imgWrap = document.createElement('div'); imgWrap.className = 'img-wrap';
    // keep an <img> for accessibility/screen readers but hide visually (CSS hides it)
    const visImg = document.createElement('img'); visImg.alt = p.name; visImg.src = p.img;
    imgWrap.appendChild(visImg);

    // content
    const badge = document.createElement('div'); badge.className = 'sale-badge'; badge.textContent = 'ON SALE';
    const title = document.createElement('div'); title.className = 'title'; title.textContent = p.name;
    const priceRow = document.createElement('div'); priceRow.className = 'price-row';
    priceRow.innerHTML = `<div class="mrp">Rs. ${Number(p.mrp).toFixed(2)}</div><div class="price">Rs. ${Number(p.price).toFixed(2)}<span class="price-suffix">+</span></div>`;
    const btn = document.createElement('button'); btn.className = 'btn-add'; btn.dataset.id = p.id; btn.textContent = 'Add to Cart';
    const bottom = document.createElement('div'); bottom.className = 'bottom-space';

    el.appendChild(imgWrap);
    el.appendChild(badge);
    el.appendChild(title);
    el.appendChild(priceRow);
    el.appendChild(btn);
    el.appendChild(bottom);

    container.appendChild(el);

    // load image into background using Image() to detect success/failure
    (function loadIntoBg(src, wrapper){
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = function(){
        // remove failed class if any
        wrapper.classList.remove('failed');
        wrapper.style.backgroundImage = `url('${src}')`;
        wrapper.style.backgroundSize = 'contain';
        wrapper.style.backgroundPosition = 'center center';
        wrapper.style.backgroundRepeat = 'no-repeat';
      };
      img.onerror = function(){
        // set failed placeholder via class
        wrapper.classList.add('failed');
        wrapper.style.backgroundImage = 'none';
        console.warn('BG image failed to load:', src);
      };
      // start loading
      img.src = src;
      // safety: if browser cached but onload didn't fire yet, handle via timeout check
      setTimeout(()=>{ if(!img.complete){ /* do nothing - wait */ } }, 2500);
    })(p.img, imgWrap);
  });

  // attach add-to-cart handlers
  container.querySelectorAll('.btn-add').forEach(b=>{
    b.addEventListener('click', function(){
      const id = this.dataset.id;
      if(window.gsap) gsap.fromTo(this,{scale:1},{scale:0.95,duration:0.06,yoyo:true,repeat:1});
      const res = addToCart(id);
      if(res.ok) pufToast('Added to cart'); else pufToast('Failed to add', true);
    });
  });

  // entrance animation
  if(window.gsap) gsap.from('.product-card', { opacity:0, y:26, duration:0.6, stagger:0.08, ease:'power3.out' });

  // update cart count
  updateCartCount();
}

