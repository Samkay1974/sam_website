// ===================================
// PORTFOLIO INTERACTIVE FEATURES
// Professional & Optimized
// ===================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize all features
  initNavigation();
  initScrollReveal();
  initSmoothScrolling();
  initTypingEffect();
  initScrollProgress();
  initCardAnimations();
  initDownloadCV();
  
  console.log('✨ Portfolio loaded successfully!');
});

// ===================================
// NAVIGATION BAR FUNCTIONALITY
// ===================================
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu li a');
  
  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
  
  // Add shadow to navbar on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Highlight active section in navigation
  highlightActiveSection();
  window.addEventListener('scroll', highlightActiveSection);
  
  // Scroll to top when clicking logo
  const navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

function highlightActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu li a:not(.download-btn)');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= (sectionTop - 100)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// ===================================
// DOWNLOAD CV FUNCTIONALITY
// ===================================
function initDownloadCV() {
  const downloadBtn = document.getElementById('download-cv');
  
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Method 1: Print to PDF (browser's print dialog)
      window.print();
      
      // Method 2: If you have a PDF file, uncomment below and add your CV file
      // const link = document.createElement('a');
      // link.href = 'path/to/your/cv.pdf';
      // link.download = 'Samuel_Inkoom_Ninson_CV.pdf';
      // link.click();
    });
  }
}

// ===================================
// SCROLL REVEAL ANIMATION
// ===================================
function initScrollReveal() {
  const elements = document.querySelectorAll('section, .card, .header');
  
  // Add reveal class to all elements
  elements.forEach((element, index) => {
    element.classList.add('reveal');
  });
  
  // Function to reveal elements on scroll
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  };
  
  // Initial check
  revealOnScroll();
  
  // Check on scroll with throttle for performance
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
      revealOnScroll();
    });
  });
}

// ===================================
// SMOOTH SCROLLING FOR LINKS
// ===================================
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Check if target exists
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===================================
// TYPING EFFECT FOR SUBTITLE
// ===================================
function initTypingEffect() {
  const subtitle = document.querySelector('.subtitle');
  if (!subtitle) return;
  
  // Store original text
  const originalText = subtitle.textContent;
  
  // Job titles to cycle through
  const titles = [
    'Management Information Systems Student | Aspiring IT & Data Professional',
    'Data Analyst | Systems Designer',
    'Full-Stack Developer | Tech Enthusiast',
    'IT Support Specialist | Problem Solver'
  ];
  
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;
  
  function type() {
    const currentTitle = titles[titleIndex];
    
    // Update text
    if (isDeleting) {
      subtitle.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
    } else {
      subtitle.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
    }
    
    // Add blinking cursor
    subtitle.innerHTML = subtitle.textContent + '<span class="cursor">|</span>';
    
    // Determine typing speed
    let typeSpeed = isDeleting ? 50 : 100;
    
    // Pause at end of typing
    if (!isDeleting && charIndex === currentTitle.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } 
    // Move to next title after deleting
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  // Add cursor blink animation
  const style = document.createElement('style');
  style.textContent = `
    .cursor {
      animation: blink 0.7s infinite;
    }
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  
  // Start typing effect after 1 second
  setTimeout(() => {
    subtitle.textContent = '';
    type();
  }, 1000);
}

// ===================================
// SCROLL PROGRESS INDICATOR
// ===================================
function initScrollProgress() {
  // Create progress bar element
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #2563eb, #f59e0b);
    z-index: 9999;
    transition: width 0.2s ease;
  `;
  document.body.appendChild(progressBar);
  
  // Update progress on scroll
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      progressBar.style.width = scrolled + '%';
    });
  });
}

// ===================================
// CARD HOVER ANIMATIONS
// ===================================
function initCardAnimations() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    // Add smooth transform on hover
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transition = 'all 0.3s ease';
    });
  });
  
  // Add interactive effect to profile image
  const profileImg = document.querySelector('.profile-img');
  if (profileImg) {
    let isAnimating = false;
    
    profileImg.addEventListener('click', function() {
      if (isAnimating) return;
      isAnimating = true;
      
      this.style.animation = 'none';
      setTimeout(() => {
        this.style.animation = 'scaleIn 0.6s ease-out';
        isAnimating = false;
      }, 10);
    });
  }
}

// ===================================
// LAZY LOAD IMAGES (Performance Optimization)
// ===================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Load image if data-src exists
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });
  
  // Observe all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===================================
// PRINT FUNCTIONALITY
// ===================================
function printCV() {
  window.print();
}

// Add print button listener if exists
const printButton = document.getElementById('print-btn');
if (printButton) {
  printButton.addEventListener('click', printCV);
}

// ===================================
// KEYBOARD SHORTCUTS
// ===================================
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + P for print
  if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
    e.preventDefault();
    printCV();
  }
  
  // Scroll to top with Home key
  if (e.key === 'Home') {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // Scroll to bottom with End key
  if (e.key === 'End') {
    e.preventDefault();
    window.scrollTo({ 
      top: document.documentElement.scrollHeight, 
      behavior: 'smooth' 
    });
  }
});

// ===================================
// PERFORMANCE MONITORING
// ===================================
window.addEventListener('load', () => {
  // Log performance metrics
  if (window.performance) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`📊 Page Load Time: ${pageLoadTime}ms`);
  }
});

// ===================================
// HANDLE ERRORS GRACEFULLY
// ===================================
window.addEventListener('error', (e) => {
  console.error('An error occurred:', e.message);
  // Prevent the error from disrupting user experience
});

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================
function initAccessibility() {
  // Add skip to content link
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #2563eb;
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    z-index: 10000;
  `;
  skipLink.addEventListener('focus', function() {
    this.style.top = '0';
  });
  skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add main content id if not exists
  const firstSection = document.querySelector('section');
  if (firstSection && !document.getElementById('main-content')) {
    firstSection.id = 'main-content';
  }
}

initAccessibility();
