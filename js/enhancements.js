(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const doc = document.documentElement;
  doc.classList.add('motion-ready');

  // Sombra discreta no cabeçalho durante a rolagem.
  const siteHeader = document.querySelector('.site-header');
  let scrollTicking = false;
  const updateHeader = () => {
    siteHeader?.classList.toggle('is-scrolled', window.scrollY > 12);
    scrollTicking = false;
  };
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateHeader);
      scrollTicking = true;
    }
  }, { passive: true });
  updateHeader();

  // Revelação progressiva e reutilizável, inclusive para cards renderizados por JavaScript.
  const revealSelector = [
    '.page-hero .container > *',
    '.section-head',
    '.trust-item',
    '.product-card',
    '.info-card',
    '.policy-card',
    '.promo-card',
    '.timeline-item',
    '.contact-panel',
    '.form-card',
    '.policy-long article',
    '.product-detail > *',
    '.cta-band',
    '.footer-grid > *'
  ].join(',');

  const revealObserver = !reduceMotion && 'IntersectionObserver' in window
    ? new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -35px' })
    : null;

  const registerReveal = (root = document) => {
    const elements = root.matches?.(revealSelector) ? [root] : [...root.querySelectorAll?.(revealSelector) || []];
    elements.forEach((element, index) => {
      if (element.dataset.revealRegistered) return;
      element.dataset.revealRegistered = 'true';
      element.classList.add('reveal-item');

      if (element.classList.contains('product-card') || element.classList.contains('trust-item')) {
        const siblings = [...element.parentElement.children].filter(item => item.matches('.product-card, .trust-item'));
        element.style.setProperty('--reveal-order', Math.min(siblings.indexOf(element), 7));
      } else {
        element.style.setProperty('--reveal-order', Math.min(index, 4));
      }

      if (revealObserver) revealObserver.observe(element);
      else element.classList.add('is-visible');
    });
  };

  // Fade de imagens sem interferir no carregamento lazy.
  const registerImages = (root = document) => {
    const images = root.matches?.('img') ? [root] : [...root.querySelectorAll?.('img') || []];
    images.forEach(image => {
      if (image.dataset.fadeRegistered) return;
      image.dataset.fadeRegistered = 'true';
      image.classList.add('image-fade');
      const reveal = () => image.classList.add('is-image-loaded');
      if (image.complete) reveal();
      else {
        image.addEventListener('load', reveal, { once: true });
        image.addEventListener('error', reveal, { once: true });
      }
    });
  };

  registerReveal();
  registerImages();

  const dynamicObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (!(node instanceof Element)) return;
        registerReveal(node);
        registerImages(node);
      });
    });
  });
  dynamicObserver.observe(document.body, { childList: true, subtree: true });

  // Feedback visual de clique nos botões, sem alterar suas ações.
  document.addEventListener('pointerdown', event => {
    const button = event.target.closest('.btn');
    if (!button || reduceMotion) return;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'click-ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    button.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
  });

  // Anima a quantidade do carrinho somente quando o número muda.
  const cartCount = document.getElementById('cartCount');
  if (cartCount) {
    let previousCount = cartCount.textContent;
    new MutationObserver(() => {
      if (cartCount.textContent === previousCount) return;
      previousCount = cartCount.textContent;
      cartCount.classList.remove('is-bumping');
      void cartCount.offsetWidth;
      cartCount.classList.add('is-bumping');
    }).observe(cartCount, { childList: true, characterData: true, subtree: true });
  }

  // Pequenos ajustes de acessibilidade para os controles existentes.
  const hero = document.querySelector('.hero-shell');
  if (hero) hero.setAttribute('aria-roledescription', 'carrossel');

  document.querySelectorAll('.hero-slide').forEach((slide, index) => {
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-label', `${index + 1} de ${document.querySelectorAll('.hero-slide').length}`);
  });
})();
