 // Navbar scroll behavior
 let prevScrollPos = window.pageYOffset;
 const navbar = document.querySelector('.navbar');
 
  window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
      navbar.classList.remove('hidden');
    } else {
      navbar.classList.add('hidden');
    }
    prevScrollPos = currentScrollPos;
  }

  // Search icon functionality
  const searchIcon = document.querySelector('.search-icon');
  const searchDropdown = document.querySelector('.search-dropdown');

  searchIcon.addEventListener('click', () => {
    searchDropdown.style.display = searchDropdown.style.display === 'block' ? 'none' : 'block';
  });

 // Mobile menu functionality
 const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
 const mobileMenuClose = document.querySelector('.mobile-menu-close');
 const navLinks = document.querySelector('.nav-links');

  mobileMenuIcon.addEventListener('click', () => {
    navLinks.classList.add('active');
  });

  mobileMenuClose.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });

  // Mobile dropdown functionality
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links') && 
      !e.target.closest('.mobile-menu-icon') && 
      !e.target.closest('.mobile-menu-close')) {
      navLinks.classList.remove('active');
    }
  });

  //  banner section js 

  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Auto advance slides every 5 seconds
  setInterval(nextSlide, 8000);

  
  // statistics functionalities 
  // Counter animation function
  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const interval = duration / 100;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = Math.round(target) + '+';
        clearInterval(timer);
      } else {
        element.textContent = Math.round(current) + '+';
      }
    }, interval);
  }

  // Intersection Observer for triggering animations when in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  // Observe all counter elements
  document.querySelectorAll('.stat-number').forEach(counter => {
    observer.observe(counter);
  });

 // Our Gallery section js functionalities

  const galleryData = [
    {
      id: 1,
      category: 'events',
      title: 'Color Festival',
      image: 'assets/images/events-1.jpg',
    },
    {
      id: 2,
      category: 'library',
      title: 'Student Workshop',
      image: 'assets/images/lib-1.jpg',
    },
    {
      id: 3,
      category: 'events',
      title: 'Student Workshop',
      image: 'assets/images/events-2.jpg',
    },
    {
      id: 4,
      category: 'library',
      title: 'Student Workshop',
      image: 'assets/images/lib-3.jpg',
    },
    {
      id: 5,
      category: 'library',
      title: 'Student Workshop',
      image: 'assets/images/lib-4.jpg',
    },
    {
      id: 6,
      category: 'library',
      title: 'Student Workshop',
      image: 'assets/images/lib-5.jpg',
    },
    {
      id: 7,
      category: 'campus',
      title: 'Main Building',
      image: 'assets/images/lib-1.jpg',
    },
    {
      id: 8,
      category: 'events',
      title: 'Group reading',
      image: 'assets/images/events-3.jpg',
    },
    {
      id: 9,
      category: 'events',
      title: 'Annual Concert',
      image: 'assets/images/events-4.jpg',
    },
    {
      id: 10,
      category: 'campus',
      title: 'Annual Concert',
      image: 'assets/images/camp-3.jpg',
    },
    {
      id: 11,
      category: 'campus',
      title: 'Annual Concert',
      image: 'assets/images/camp-4.jpg',
    },
    {
      id: 12,
      category: 'campus',
      title: 'Annual Concert',
      image: 'assets/images/camp-1.jpg',
    },
    {
      id: 13,
      category: 'campus',
      title: 'Annual Concert',
      image: 'assets/images/camp-2.jpg',
    },
    {
      id: 14,
      category: 'events',
      title: '65th graduating sets',
      image: 'assets/images/activity-1.jpg',
    },
    {
      id: 15,
      category: 'events',
      title: 'The 80th matriculation',
      image: 'assets/images/activity-2.jpg',
    },
    {
      id: 16,
      category: 'events',
      title: 'Annual Concert',
      image: 'assets/images/camp-4.jpg',
    },
    {
      id: 14,
      category: 'events',
      title: '65th graduating sets',
      image: 'assets/images/activity-1.jpg',
    },
    {
      id: 15,
      category: 'events',
      title: 'The 80th matriculation',
      image: 'assets/images/camp-2.jpg',
    },
  ];

  const galleryGrid = document.querySelector('.gallery-grid');
  const modal = document.querySelector('.modal');
  const modalImg = modal.querySelector('img');
  const navButtons = document.querySelectorAll('.gallery-nav button');

  function createGalleryItem(item) {
    return `
      <div class="gallery-item" data-category="${item.category}">
        <img src="${item.image}" alt="${item.title}">
        <div class="overlay">
          <h3>${item.title}</h3>
          <button class="expand-btn">
            <i class="fas fa-expand-arrows-alt"></i>
          </button>
        </div>
      </div>
    `;
  }

  function populateGallery(category = 'all') {
    const filteredItems = category === 'all' 
      ? galleryData 
      : galleryData.filter(item => item.category === category);
    
    galleryGrid.innerHTML = filteredItems.map(createGalleryItem).join('');
    
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
      item.addEventListener('click', () => {
        const img = filteredItems[index].image;
        modalImg.src = img;
        modal.classList.add('active');
      });
    });
  }

  // Initial population
  populateGallery();

  // Navigation
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      navButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      populateGallery(button.dataset.category);
    });
  });

  // Modal handling
  document.querySelector('.close-modal').addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // Keyboard handling
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });

  // tastimonial script 
  const wrapper = document.querySelector('.testimonial-wrapper');
    const Buttons = document.querySelectorAll('.testimonial-nav-btn');
    let currentIndex = 0;

    function updateSlider(index) {
      const cards = document.querySelectorAll('.testimonial-card');
      const cardWidth = cards[0].offsetWidth;
      const gap = parseInt(window.getComputedStyle(wrapper).gap);
      
      // Calculate total width (card width + gap) to slide
      const slideAmount = index * -(cardWidth + gap);
      wrapper.style.transform = `translateX(${slideAmount}px)`;
      
      // Update active button
      navButtons.forEach(btn => btn.classList.remove('active'));
      navButtons[Math.floor(index/2)].classList.add('active');
    }

    navButtons.forEach(button => {
      button.addEventListener('click', () => {
        const index = parseInt(button.dataset.index) * 2;
        currentIndex = index;
        updateSlider(currentIndex);
      });
    });

    // Handle responsive layout
    window.addEventListener('resize', () => {
    updateSlider(currentIndex);
  });