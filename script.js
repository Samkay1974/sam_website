// ===================================
// PORTFOLIO INTERACTIVE FEATURES
// ===================================

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize all features
  initScrollReveal();
  initSmoothScroll();
  initSkillsAnimation();
  initTypingEffect();
  initScrollProgress();
  initProjectHoverEffects();
  
  console.log('Portfolio initialized successfully! 🚀');
});

// ===================================
// SCROLL REVEAL ANIMATION
// ===================================
function initScrollReveal() {
  const reveals = document.querySelectorAll('section, .card');
  
  reveals.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.transitionDelay = `${index * 0.1}s`;
  });
  
  const revealOnScroll = () => {
    reveals.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  };
  
  // Initial check
  revealOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', revealOnScroll);
}

// ===================================
// SMOOTH SCROLL FOR LINKS
// ===================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ===================================
// SKILLS INTERACTIVE ANIMATION
// ===================================
function initSkillsAnimation() {
  const skills = document.querySelectorAll('.skills span');
  
  skills.forEach((skill, index) => {
    // Staggered animation on load
    skill.style.opacity = '0';
    skill.style.transform = 'scale(0.5)';
    
    setTimeout(() => {
      skill.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      skill.style.opacity = '1';
      skill.style.transform = 'scale(1)';
    }, index * 50);
    
    // Click to highlight
    skill.addEventListener('click', function() {
      // Remove highlight from all skills
      skills.forEach(s => s.style.fontWeight = '500');
      
      // Highlight clicked skill
      this.style.fontWeight = '700';
      
      // Create ripple effect
      createRipple(this);
    });
  });
}

// ===================================
// RIPPLE EFFECT
// ===================================
function createRipple(element) {
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.position = 'absolute';
  ripple.style.borderRadius = '50%';
  ripple.style.background = 'rgba(255, 255, 255, 0.6)';
  ripple.style.transform = 'scale(0)';
  ripple.style.animation = 'ripple 0.6s ease-out';
  ripple.style.pointerEvents = 'none';
  
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);
  
  setTimeout(() => ripple.remove(), 600);
}

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ===================================
// TYPING EFFECT FOR SUBTITLE
// ===================================
function initTypingEffect() {
  const subtitle = document.querySelector('.subtitle');
  if (!subtitle) return;
  
  const text = subtitle.textContent;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseDuration = 2000;
  
  // Alternative titles to cycle through
  const titles = [
    'Management Information Systems Student',
    'Full-Stack Developer',
    'Systems Analyst',
    'Tech Enthusiast'
  ];
  
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function type() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
      subtitle.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
    } else {
      subtitle.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
    }
    
    // Add blinking cursor
    subtitle.innerHTML = subtitle.textContent + '<span style="animation: blink 0.7s infinite;">|</span>';
    
    let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;
    
    if (!isDeleting && charIndex === currentTitle.length) {
      typeSpeed = pauseDuration;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  // Start typing effect after initial animation
  setTimeout(() => {
    subtitle.textContent = '';
    type();
  }, 2000);
}

// Add blink animation
const blinkStyle = document.createElement('style');
blinkStyle.textContent = `
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;
document.head.appendChild(blinkStyle);

// ===================================
// SCROLL PROGRESS INDICATOR
// ===================================
function initScrollProgress() {
  // Create progress bar
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 4px;
    background: linear-gradient(90deg, #2563eb, #f59e0b);
    z-index: 9999;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// ===================================
// PROJECT HOVER EFFECTS
// ===================================
function initProjectHoverEffects() {
  const projects = document.querySelectorAll('.project');
  
  projects.forEach(project => {
    project.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.02)';
    });
    
    project.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
}

// ===================================
// EASTER EGG: KONAMI CODE
// ===================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join('') === konamiPattern.join('')) {
    activateEasterEgg();
  }
});

function activateEasterEgg() {
  document.body.style.animation = 'rainbow 2s linear infinite';
  
  const easterEggStyle = document.createElement('style');
  easterEggStyle.textContent = `
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
  `;
  document.head.appendChild(easterEggStyle);
  
  setTimeout(() => {
    document.body.style.animation = '';
    easterEggStyle.remove();
  }, 5000);
  
  console.log('🎉 Easter Egg Activated! You found the secret code!');
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===================================
// ANALYTICS (Optional - for tracking)
// ===================================
function trackEvent(category, action, label) {
  console.log(`Event tracked: ${category} - ${action} - ${label}`);
  // You can integrate with Google Analytics or other services here
}

// Track link clicks
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', function() {
    trackEvent('Navigation', 'Click', this.href);
  });
});
