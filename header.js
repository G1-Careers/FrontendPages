fetch('header.html')
  .then(response => response.text())
  .then(data => {
    // Inject header.html into the DOM
    const headerContainer = document.getElementById('header');
    headerContainer.innerHTML = data;

    // Clone navigation menu for mobile before event listeners
    const desktopMenu = headerContainer.querySelector('.main-menu .navigation');
    const mobileMenuOuter = document.querySelector('.mobile-menu .menu-outer');
    if (desktopMenu && mobileMenuOuter) {
      mobileMenuOuter.innerHTML = desktopMenu.outerHTML;
    }

    // Highlight current page
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = headerContainer.querySelectorAll('.main-menu .navigation a');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (href === "index.html" && (currentPage === "" || currentPage === "index.html"))) {
        link.parentElement.classList.add('current');
      } else {
        link.parentElement.classList.remove('current');
      }
    });

    // Set up mobile menu toggling
    const menuToggler = headerContainer.querySelector('.mobile-nav-toggler');
    const mobileMenu = document.querySelector('.mobile-menu');
    const backdrop = document.querySelector('.menu-backdrop');
    const closeBtn = document.querySelector('.mobile-menu .close-btn');

    const openMenu = () => {
      mobileMenu.classList.add('menu-visible');
      document.body.classList.add('mobile-menu-visible');
    };

    const closeMenu = () => {
      mobileMenu.classList.remove('menu-visible');
      document.body.classList.remove('mobile-menu-visible');
    };

    if (menuToggler) menuToggler.addEventListener('click', openMenu);
    if (backdrop) backdrop.addEventListener('click', closeMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    // ✅ Mobile dropdown toggle logic (must be inside this block!)
    const handleMobileDropdowns = (selector) => {
        document.querySelectorAll(selector).forEach(link => {
          link.addEventListener('click', function (e) {
            const isMobile = window.innerWidth <= 991;
            if (isMobile) {
              e.preventDefault();
              const parentLi = this.parentElement;
              parentLi.classList.toggle('open');
              const subMenu = parentLi.querySelector('ul');
              if (subMenu) {
                subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
              }
            }
          });
        });
      };
      
      // Apply to both main and mobile menu dropdowns
      handleMobileDropdowns('.main-menu .navigation > li.dropdown > a');
      handleMobileDropdowns('.mobile-menu .navigation > li.dropdown > a');
      

  })
  .catch(error => console.error('Error loading header:', error));
