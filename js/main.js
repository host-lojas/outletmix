(() => {
  const root = document.body.dataset.root || './';
  const page = document.body.dataset.page || 'home';
  const products = window.OUTLET_PRODUCTS || [];
  const money = value => value.toLocaleString('pt-BR', {style:'currency', currency:'BRL'});
  const icon = (name, cls='') => {
    const icons = {
      search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
      cart:'<path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20 8H7"/><circle cx="10" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/>',
      menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
      close:'<path d="m6 6 12 12M18 6 6 18"/>',
      arrow:'<path d="m9 18 6-6-6-6"/>',
      truck:'<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
      shield:'<path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6z"/><path d="m9 12 2 2 4-4"/>',
      whatsapp:'<path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z"/><path d="M9 8.5c.5 3 2.2 4.8 5 5.7"/>',
      clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      location:'<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
      filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',
      plus:'<path d="M12 5v14M5 12h14"/>',
      minus:'<path d="M5 12h14"/>',
      instagram:'<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>',
      facebook:'<path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.6.4-1 1-1Z"/>',
      youtube:'<path d="M21 8.5a3 3 0 0 0-2-2C17.5 6 12 6 12 6s-5.5 0-7 .5a3 3 0 0 0-2 2A18 18 0 0 0 2.5 12 18 18 0 0 0 3 15.5a3 3 0 0 0 2 2c1.5.5 7 .5 7 .5s5.5 0 7-.5a3 3 0 0 0 2-2 18 18 0 0 0 .5-3.5 18 18 0 0 0-.5-3.5Z"/><path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none"/>'
    };
    return `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || ''}</svg>`;
  };

  const nav = [
    ['home','Home',root], ['catalogo','Catálogo',root+'catalogo/'], ['promocoes','Promoções',root+'promocoes/'],
    ['historia','Nossa História',root+'historia/'], ['contato','Contato',root+'contato/'], ['politicas','Políticas',root+'politicas/']
  ];

  function header(){
    const el = document.querySelector('[data-site-header]');
    if(!el) return;
    el.innerHTML = `
      <div class="promo-strip" id="promoStrip"><div class="container promo-strip__inner"><strong>OFERTAS DE MOSTRUÁRIO COM PREÇOS ESPECIAIS</strong><span>Retirada em loja • Estoque limitado</span><button aria-label="Fechar aviso" id="closePromo">${icon('close')}</button></div></div>
      <header class="site-header"><div class="container header-inner">
        <a class="brand" href="${root}" aria-label="Outlet Mix - página inicial"><img src="${root}assets/logo.png" alt="Outlet Mix Nordeste"></a>
        <button class="mobile-menu" id="mobileMenu" aria-label="Abrir menu">${icon('menu')}</button>
        <nav class="main-nav" id="mainNav" aria-label="Navegação principal">${nav.map(([id,label,url])=>`<a class="${page===id?'active':''}" href="${url}">${label}</a>`).join('')}</nav>
        <div class="header-actions">
          <button class="search-trigger" id="searchTrigger" aria-label="Abrir pesquisa">${icon('search')}<span>Buscar</span></button>
          <button class="cart-trigger" id="cartTrigger" aria-label="Abrir carrinho">${icon('cart')}<span class="cart-count" id="cartCount">0</span></button>
        </div>
      </div></header>
      <div class="search-panel" id="searchPanel"><div class="container search-panel__inner">${icon('search')}<input id="globalSearch" type="search" placeholder="Busque sofá, geladeira, fogão..." autocomplete="off"><button id="closeSearch" aria-label="Fechar pesquisa">${icon('close')}</button><div class="search-results" id="searchResults"></div></div></div>`;
  }

  function footer(){
    const el = document.querySelector('[data-site-footer]');
    if(!el) return;
    el.innerHTML = `<footer class="site-footer"><div class="container footer-grid">
      <div><img class="footer-logo" src="${root}assets/logo.png" alt="Outlet Mix Nordeste"><p>O mix ideal para deixar sua casa funcional, bonita e com preço de outlet.</p></div>
      <div><h3>Navegação</h3>${nav.slice(0,5).map(([,label,url])=>`<a href="${url}">${label}</a>`).join('')}</div>
      <div><h3>Atendimento</h3><a href="https://wa.me/5581996055149" target="_blank" rel="noopener">WhatsApp (81) 9.9605-5149</a><span>Seg a Sáb: 8h às 17h</span><span>Domingo: Fechado</span></div>
      <div><h3>Siga a Outlet Mix</h3><div class="socials"><a href="#" aria-label="Instagram">${icon('instagram')}</a><a href="#" aria-label="Facebook">${icon('facebook')}</a><a href="#" aria-label="YouTube">${icon('youtube')}</a></div></div>
    </div><div class="container copyright">© ${new Date().getFullYear()} Outlet Mix Nordeste. Site demonstrativo, sem transações reais.</div></footer>`;
  }

  function cartDrawer(){
    document.body.insertAdjacentHTML('beforeend', `<div class="drawer-backdrop" id="drawerBackdrop"></div><aside class="cart-drawer" id="cartDrawer" aria-label="Carrinho de compras"><div class="drawer-head"><div><small>SEU CARRINHO</small><h2>Produtos selecionados</h2></div><button id="closeCart" aria-label="Fechar carrinho">${icon('close')}</button></div><div class="cart-items" id="cartItems"></div><div class="cart-footer"><div class="cart-total"><span>Total estimado</span><strong id="cartTotal">R$ 0,00</strong></div><button class="btn btn-primary btn-block" id="checkoutButton">Simular pedido no WhatsApp</button><small>Este é um site demonstrativo. Nenhum pagamento será processado.</small></div></aside>`);
  }

  let memoryCart = [];
  const getCart = () => { try { return JSON.parse(localStorage.getItem('outletMixCart') || '[]'); } catch { return memoryCart; } };
  const setCart = c => { memoryCart = c; try { localStorage.setItem('outletMixCart', JSON.stringify(c)); } catch {} renderCart(); };
  function addToCart(id){
    const cart = getCart(); const found = cart.find(i=>i.id===id);
    found ? found.qty++ : cart.push({id,qty:1}); setCart(cart); openCart(); toast('Produto adicionado ao carrinho.');
  }
  function changeQty(id, delta){
    const cart = getCart(); const found = cart.find(i=>i.id===id); if(!found) return;
    found.qty += delta; setCart(cart.filter(i=>i.qty>0));
  }
  function renderCart(){
    const cart = getCart(); const wrap = document.getElementById('cartItems'); const count = document.getElementById('cartCount');
    if(count) count.textContent = cart.reduce((s,i)=>s+i.qty,0);
    if(!wrap) return;
    if(!cart.length){ wrap.innerHTML = `<div class="empty-state">${icon('cart')}<h3>Seu carrinho está vazio</h3><p>Adicione produtos do catálogo para simular um pedido.</p><a class="btn btn-outline" href="${root}catalogo/">Explorar catálogo</a></div>`; document.getElementById('cartTotal').textContent=money(0); return; }
    let total=0;
    wrap.innerHTML = cart.map(item=>{ const p=products.find(x=>x.id===item.id); if(!p) return ''; total += p.price*item.qty; return `<article class="cart-item"><img src="${root}${p.image}" alt="${p.name}"><div><h3>${p.name}</h3><strong>${money(p.price)}</strong><div class="qty"><button data-qty="-1" data-id="${p.id}">${icon('minus')}</button><span>${item.qty}</span><button data-qty="1" data-id="${p.id}">${icon('plus')}</button></div></div></article>`; }).join('');
    document.getElementById('cartTotal').textContent=money(total);
  }
  function openCart(){ document.getElementById('cartDrawer')?.classList.add('open'); document.getElementById('drawerBackdrop')?.classList.add('show'); document.getElementById('cartTrigger')?.setAttribute('aria-expanded','true'); document.body.classList.add('no-scroll','drawer-open'); }
  function closeCart(){ document.getElementById('cartDrawer')?.classList.remove('open'); document.getElementById('drawerBackdrop')?.classList.remove('show'); document.getElementById('cartTrigger')?.setAttribute('aria-expanded','false'); document.body.classList.remove('no-scroll','drawer-open'); }
  function toast(msg){ let t=document.getElementById('toast'); if(!t){ document.body.insertAdjacentHTML('beforeend','<div class="toast" id="toast"></div>'); t=document.getElementById('toast'); } t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2500); }

  function productCard(p){
    const discount = Math.round((1-p.price/p.oldPrice)*100);
    return `<article class="product-card" data-name="${p.name.toLowerCase()}" data-category="${p.category}" data-price="${p.price}">
      <a class="product-image" href="${root}produto/?id=${p.id}"><span class="product-badge">${p.badge}</span><img src="${root}${p.image}" alt="${p.name}" loading="lazy"></a>
      <div class="product-info"><small>${p.subcategory}</small><h3><a href="${root}produto/?id=${p.id}">${p.name}</a></h3><div class="price-row"><div><del>${money(p.oldPrice)}</del><strong>${money(p.price)}</strong><span>ou 10x de ${money(p.price/10)}</span></div><em>-${discount}%</em></div><button class="btn btn-dark btn-block" data-add-cart="${p.id}">${icon('cart')}Adicionar ao carrinho</button></div>
    </article>`;
  }

  function initHome(){
    const grid=document.getElementById('featuredGrid'); if(grid) grid.innerHTML=products.slice(0,8).map(productCard).join('');
    const shell=document.querySelector('.hero-shell'), slides=[...document.querySelectorAll('.hero-slide')], dots=[...document.querySelectorAll('.hero-dot')];
    if(!slides.length) return;
    let current=0, timer, touchStartX=0;
    const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const show=i=>{
      current=(i+slides.length)%slides.length;
      slides.forEach((s,n)=>{const active=n===current;s.classList.toggle('active',active);s.setAttribute('aria-hidden',String(!active));});
      dots.forEach((d,n)=>{const active=n===current;d.classList.toggle('active',active);d.setAttribute('aria-current',active?'true':'false');});
    };
    const stop=()=>{if(timer){clearInterval(timer);timer=null;}};
    const start=()=>{stop();if(slides.length>1&&!reducedMotion&&!document.hidden)timer=setInterval(()=>show(current+1),6000);};
    const reset=()=>{start();};
    document.querySelector('[data-slide-next]')?.addEventListener('click',()=>{show(current+1);reset();});
    document.querySelector('[data-slide-prev]')?.addEventListener('click',()=>{show(current-1);reset();});
    dots.forEach((d,i)=>d.addEventListener('click',()=>{show(i);reset();}));
    if(shell){
      shell.tabIndex=0;
      shell.addEventListener('pointerenter',stop);
      shell.addEventListener('pointerleave',start);
      shell.addEventListener('focusin',stop);
      shell.addEventListener('focusout',e=>{if(!shell.contains(e.relatedTarget))start();});
      shell.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();show(current+1);reset();}if(e.key==='ArrowLeft'){e.preventDefault();show(current-1);reset();}});
      shell.addEventListener('touchstart',e=>{touchStartX=e.changedTouches[0].clientX;stop();},{passive:true});
      shell.addEventListener('touchend',e=>{const delta=e.changedTouches[0].clientX-touchStartX;if(Math.abs(delta)>45)show(current+(delta<0?1:-1));start();},{passive:true});
    }
    document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
    show(0);start();
  }

  function initCatalog(){
    const grid=document.getElementById('catalogGrid'); if(!grid) return;
    const search=document.getElementById('catalogSearch'), category=document.getElementById('categoryFilter'), sort=document.getElementById('sortFilter'), count=document.getElementById('catalogCount');
    const initialCategory = new URLSearchParams(location.search).get('categoria');
    if(initialCategory && [...category.options].some(o=>o.value===initialCategory)) category.value=initialCategory;
    const render=()=>{let list=[...products]; const q=(search.value||'').toLowerCase().trim(); if(q) list=list.filter(p=>(p.name+' '+p.subcategory).toLowerCase().includes(q)); if(category.value!=='todos') list=list.filter(p=>p.category===category.value); if(sort.value==='menor') list.sort((a,b)=>a.price-b.price); if(sort.value==='maior') list.sort((a,b)=>b.price-a.price); if(sort.value==='desconto') list.sort((a,b)=>(b.oldPrice-b.price)-(a.oldPrice-a.price)); grid.innerHTML=list.map(productCard).join('') || '<div class="empty-catalog"><h3>Nenhum produto encontrado</h3><p>Tente buscar por outra categoria ou palavra.</p></div>'; count.textContent=`${list.length} produtos`;};
    [search,category,sort].forEach(el=>el.addEventListener('input',render)); render();
  }

  function initProduct(){
    const view=document.getElementById('productView'); if(!view) return;
    const id=new URLSearchParams(location.search).get('id') || products[0].id; const p=products.find(x=>x.id===id) || products[0];
    view.innerHTML=`<div class="product-detail"><div class="product-gallery"><span class="product-badge">${p.badge}</span><img src="${root}${p.image}" alt="${p.name}"></div><div class="product-summary"><nav class="breadcrumb"><a href="${root}">Home</a><span>/</span><a href="${root}catalogo/">Catálogo</a><span>/</span><span>${p.subcategory}</span></nav><small>${p.subcategory.toUpperCase()} • CÓD. ${p.id.slice(0,8).toUpperCase()}</small><h1>${p.name}</h1><div class="stars">★★★★★ <span>4,9 (avaliação demonstrativa)</span></div><p>${p.description}</p><del>${money(p.oldPrice)}</del><div class="detail-price">${money(p.price)}</div><span>10x sem juros de ${money(p.price/10)}</span><div class="stock-note">${p.stock} unidade${p.stock>1?'s':''} disponível${p.stock>1?'is':''} para retirada</div><button class="btn btn-primary btn-lg" data-add-cart="${p.id}">${icon('cart')}Adicionar ao carrinho</button><a class="btn btn-whatsapp btn-lg" href="https://wa.me/5581996055149?text=${encodeURIComponent('Olá! Tenho interesse no produto '+p.name)}" target="_blank">${icon('whatsapp')}Consultar no WhatsApp</a><div class="benefit-list"><span>${icon('shield')} Garantia legal de 3 meses</span><span>${icon('location')} Retirada exclusiva na loja</span><span>${icon('truck')} Frete terceirizado indicado</span></div></div></div>`;
  }

  function initForms(){
    document.querySelectorAll('[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault(); form.reset(); toast('Mensagem registrada na demonstração.'); const feedback=form.querySelector('.form-feedback'); if(feedback) feedback.textContent='Mensagem enviada com sucesso! Em um site real, ela seguiria para a equipe.';}));
  }

  function globalEvents(){
    document.addEventListener('click', e=>{
      const add=e.target.closest('[data-add-cart]'); if(add) addToCart(add.dataset.addCart);
      const qty=e.target.closest('[data-qty]'); if(qty) changeQty(qty.dataset.id, Number(qty.dataset.qty));
    });
    const cartTrigger=document.getElementById('cartTrigger');
    cartTrigger?.setAttribute('aria-expanded','false');
    cartTrigger?.addEventListener('click',openCart); document.getElementById('closeCart')?.addEventListener('click',closeCart); document.getElementById('drawerBackdrop')?.addEventListener('click',closeCart);
    document.getElementById('checkoutButton')?.addEventListener('click',()=>{ const c=getCart(); if(!c.length) return toast('Adicione produtos antes de simular o pedido.'); const lines=c.map(i=>{const p=products.find(x=>x.id===i.id);return `• ${i.qty}x ${p.name}`}).join('\n'); window.open(`https://wa.me/5581996055149?text=${encodeURIComponent('Olá! Gostaria de consultar estes produtos:\n'+lines)}`,'_blank'); });

    const menu=document.getElementById('mobileMenu'), navEl=document.getElementById('mainNav');
    const closeMenu=()=>{navEl?.classList.remove('open');menu?.classList.remove('open');menu?.setAttribute('aria-expanded','false');};
    menu?.setAttribute('aria-expanded','false');
    menu?.addEventListener('click',()=>{const open=!navEl.classList.contains('open');navEl.classList.toggle('open',open);menu.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));});
    navEl?.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
    document.addEventListener('click',e=>{if(navEl?.classList.contains('open')&&!navEl.contains(e.target)&&!menu?.contains(e.target))closeMenu();});

    const panel=document.getElementById('searchPanel'), input=document.getElementById('globalSearch'), results=document.getElementById('searchResults'), searchTrigger=document.getElementById('searchTrigger');
    searchTrigger?.setAttribute('aria-expanded','false');
    const openSearch=()=>{panel?.classList.add('open');document.body.classList.add('search-open');searchTrigger?.setAttribute('aria-expanded','true');setTimeout(()=>input?.focus(),100)};
    const closeSearch=()=>{panel?.classList.remove('open');document.body.classList.remove('search-open');searchTrigger?.setAttribute('aria-expanded','false');if(input)input.value='';if(results)results.innerHTML='';};
    searchTrigger?.addEventListener('click',openSearch); document.getElementById('closeSearch')?.addEventListener('click',closeSearch);
    input?.addEventListener('input',()=>{ const q=input.value.toLowerCase().trim(); const list=q?products.filter(p=>(p.name+' '+p.subcategory).toLowerCase().includes(q)).slice(0,5):[]; results.innerHTML=list.map(p=>`<a href="${root}produto/?id=${p.id}"><img src="${root}${p.image}" alt=""><span>${p.name}<strong>${money(p.price)}</strong></span></a>`).join('') || (q?'<p>Nenhum produto encontrado.</p>':''); });

    document.getElementById('closePromo')?.addEventListener('click',()=>{const promo=document.getElementById('promoStrip');if(!promo)return;promo.classList.add('is-closing');setTimeout(()=>promo.remove(),360);});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeCart();closeSearch();closeMenu();}});
  }

  header(); footer(); cartDrawer(); renderCart(); initHome(); initCatalog(); initProduct(); initForms(); globalEvents();
})();
