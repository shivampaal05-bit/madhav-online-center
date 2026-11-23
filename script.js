/**
 * MADHAV ONLINE CENTER - JAVASCRIPT
 * Belipar, Gorakhpur
 * Implements Services Mega Menu, Contact Online Form with WhatsApp submission & Chatbot
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements - Mega Menu
  const dropdownContainer = document.getElementById('servicesDropdownContainer');
  const navServicesBtn = document.getElementById('navServicesBtn');
  const megaMenu = document.getElementById('servicesMegaMenu');
  const megaSearchInput = document.getElementById('megaSearchInput');
  const megaScrollToServices = document.getElementById('megaScrollToServices');
  
  // Elements - Page Services
  const heroSeeAllBtn = document.getElementById('heroSeeAllBtn');
  const pageServiceSearch = document.getElementById('pageServiceSearch');
  const clearPageSearch = document.getElementById('clearPageSearch');
  const fullServicesGrid = document.getElementById('fullServicesGrid');
  const noPageResults = document.getElementById('noPageResults');

  // Elements - Chatbot Widget
  const chatbotBubble = document.getElementById('chatbotBubble');
  const closeBubbleBtn = document.getElementById('closeBubbleBtn');

  // Elements - Contact & Request Form Modal
  const contactModalOverlay = document.getElementById('contactModalOverlay');
  const navContactTriggerBtn = document.getElementById('navContactTriggerBtn');
  const pageOpenContactModalBtn = document.getElementById('pageOpenContactModalBtn');
  const closeContactModalBtn = document.getElementById('closeContactModalBtn');
  const onlineServiceForm = document.getElementById('onlineServiceForm');
  const formFullName = document.getElementById('formFullName');
  const formPhone = document.getElementById('formPhone');
  const formService = document.getElementById('formService');
  const formMessage = document.getElementById('formMessage');

  // Primary Business Phone
  const PRIMARY_PHONE = '7355788684';

  // --------------------------------------------------------------------------
  // 1. Services Mega Menu Toggle (Click on "Services" in Navbar)
  // --------------------------------------------------------------------------
  function toggleMegaMenu(e) {
    if (e) e.stopPropagation();
    const isOpen = dropdownContainer.classList.contains('active');
    
    if (isOpen) {
      closeMegaMenu();
    } else {
      openMegaMenu();
    }
  }

  function openMegaMenu() {
    dropdownContainer.classList.add('active');
    megaMenu.classList.add('open');
    navServicesBtn.setAttribute('aria-expanded', 'true');
    if (megaSearchInput) {
      setTimeout(() => megaSearchInput.focus(), 150);
    }
  }

  function closeMegaMenu() {
    dropdownContainer.classList.remove('active');
    megaMenu.classList.remove('open');
    navServicesBtn.setAttribute('aria-expanded', 'false');
  }

  if (navServicesBtn) {
    navServicesBtn.addEventListener('click', toggleMegaMenu);
  }

  // Close Mega Menu when clicking outside
  document.addEventListener('click', (e) => {
    if (dropdownContainer && !dropdownContainer.contains(e.target)) {
      closeMegaMenu();
    }
  });

  // Link inside Mega Menu to scroll to services section
  if (megaScrollToServices) {
    megaScrollToServices.addEventListener('click', (e) => {
      e.preventDefault();
      closeMegaMenu();
      scrollToElement('#services');
    });
  }

  // --------------------------------------------------------------------------
  // 2. Live Search Filter inside Mega Menu
  // --------------------------------------------------------------------------
  if (megaSearchInput) {
    megaSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const categories = megaMenu.querySelectorAll('.mega-cat-col');

      categories.forEach(cat => {
        let hasMatch = false;
        const items = cat.querySelectorAll('.mega-service-list li');

        items.forEach(li => {
          const text = li.textContent.toLowerCase();
          if (text.includes(query)) {
            li.style.display = 'block';
            hasMatch = true;
          } else {
            li.style.display = 'none';
          }
        });

        cat.style.display = (hasMatch || !query) ? 'block' : 'none';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. Hero "See all services" Action
  // --------------------------------------------------------------------------
  if (heroSeeAllBtn) {
    heroSeeAllBtn.addEventListener('click', () => {
      scrollToElement('#services');
    });
  }

  // --------------------------------------------------------------------------
  // 4. Live Search Filter on Page Services Grid
  // --------------------------------------------------------------------------
  if (pageServiceSearch && fullServicesGrid) {
    pageServiceSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      if (clearPageSearch) {
        clearPageSearch.style.display = query ? 'block' : 'none';
      }

      const cards = fullServicesGrid.querySelectorAll('.service-card');
      let visibleCount = 0;

      cards.forEach(card => {
        const title = card.querySelector('.service-card-title').textContent.toLowerCase();
        const items = Array.from(card.querySelectorAll('.service-list li'))
                           .map(li => li.textContent.toLowerCase())
                           .join(' ');

        if (title.includes(query) || items.includes(query)) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (noPageResults) {
        noPageResults.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });

    if (clearPageSearch) {
      clearPageSearch.addEventListener('click', () => {
        pageServiceSearch.value = '';
        pageServiceSearch.dispatchEvent(new Event('input'));
        pageServiceSearch.focus();
      });
    }
  }

  // --------------------------------------------------------------------------
  // 5. Contact & Service Request Form Modal
  // --------------------------------------------------------------------------
  function openContactModal(servicePreselect) {
    closeMegaMenu();
    if (servicePreselect && formService) {
      formService.value = servicePreselect;
    }
    contactModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      if (formFullName) formFullName.focus();
    }, 150);
  }

  function closeContactModal() {
    contactModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (navContactTriggerBtn) {
    navContactTriggerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openContactModal();
    });
  }

  if (pageOpenContactModalBtn) {
    pageOpenContactModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openContactModal();
    });
  }

  if (closeContactModalBtn) {
    closeContactModalBtn.addEventListener('click', closeContactModal);
  }

  if (contactModalOverlay) {
    contactModalOverlay.addEventListener('click', (e) => {
      if (e.target === contactModalOverlay) {
        closeContactModal();
      }
    });
  }

  // Handle Form Submission -> Direct WhatsApp Dispatch
  if (onlineServiceForm) {
    onlineServiceForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = formFullName.value.trim();
      const phone = formPhone.value.trim();
      const service = formService.value;
      const message = formMessage.value.trim();

      if (!name) {
        alert('कृपया अपना पूरा नाम दर्ज करें (Please enter your name)');
        formFullName.focus();
        return;
      }

      if (!phone || phone.length < 10) {
        alert('कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें (Please enter valid 10-digit mobile number)');
        formPhone.focus();
        return;
      }

      if (!service) {
        alert('कृपया अपनी आवश्यक सेवा का चयन करें (Please select a service)');
        formService.focus();
        return;
      }

      // Format WhatsApp Message
      const waText = 
`*नमस्ते मनीष जी! माधव ऑनलाइन सेंटर (बेलीपार, गोरखपुर)*
------------------------------------
👤 *ग्राहक का नाम:* ${name}
📱 *मोबाइल नंबर:* ${phone}
📋 *आवश्यक सेवा:* ${service}
💬 *अतिरिक्त विवरण:* ${message ? message : 'मुझे इस सेवा की जानकारी एवं आवेदन चाहिए।'}
------------------------------------
कृपया आवश्यक दस्तावेज़ और शुल्क बताएं।`;

      const encodedUrl = `https://wa.me/91${PRIMARY_PHONE}?text=${encodeURIComponent(waText)}`;

      // Open WhatsApp in new window
      window.open(encodedUrl, '_blank');

      // Success feedback and reset
      closeContactModal();
      onlineServiceForm.reset();
    });
  }

  // --------------------------------------------------------------------------
  // 6. Circular Chatbot Greeting Bubble Dismiss
  // --------------------------------------------------------------------------
  if (closeBubbleBtn && chatbotBubble) {
    closeBubbleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      chatbotBubble.classList.add('hidden');
    });
  }

  // --------------------------------------------------------------------------
  // 7. General Navigation & Escape Key Support
  // --------------------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMegaMenu();
      closeContactModal();
    }
  });

  function scrollToElement(selector) {
    const el = document.querySelector(selector);
    if (el) {
      const headerOffset = 76;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  const navAnchorLinks = document.querySelectorAll('a[href^="#"]:not(#megaScrollToServices)');
  navAnchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        closeMegaMenu();
        scrollToElement(href);
      }
    });
  });

  console.log('Madhav Online Center: Contact form and WhatsApp integration initialized.');
});
