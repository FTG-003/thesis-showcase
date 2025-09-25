/**
 * Academic Landing Page Interactive Scripts
 * Features: Navigation, filtering, smooth scrolling, copy functionality
 * 
 * CUSTOMIZATION NOTES:
 * - Search for "CONFIGURATION" comments to modify behavior
 * - Update Google Analytics ID in trackEvent function
 * - Modify animation timings in ANIMATION_CONFIG
 */

// ===========================================
// CONFIGURATION & CONSTANTS
// ===========================================
const CONFIG = {
  // Animation timings (in milliseconds)
  ANIMATION_DURATION: {
    fast: 150,
    normal: 300,
    slow: 500
  },
  
  // Scroll behavior
  SCROLL_OFFSET: 80, // Account for fixed header
  BACK_TO_TOP_THRESHOLD: 500, // Show back-to-top button after scrolling this many pixels
  
  // Copy feedback duration
  COPY_FEEDBACK_DURATION: 2000,
  
  // Intersection Observer thresholds
  OBSERVER_THRESHOLD: 0.1
};

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

/**
 * Debounce function to limit how often a function can be called
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if user prefers reduced motion
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Smooth scroll to element with offset for fixed header
 */
function smoothScrollTo(element) {
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - CONFIG.SCROLL_OFFSET;
  
  if (prefersReducedMotion()) {
    window.scrollTo({ top: offsetPosition });
  } else {
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

/**
 * Simple analytics tracking (replace with your preferred analytics)
 */
function trackEvent(eventName, properties = {}) {
  // CONFIGURATION: Replace with your analytics implementation
  // Example for Google Analytics 4:
  // gtag('event', eventName, properties);
  
  console.log('Event tracked:', eventName, properties);
}

// ===========================================
// NAVIGATION FUNCTIONALITY
// ===========================================
class NavigationManager {
  constructor() {
    this.navToggle = document.querySelector('.nav-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.header = document.querySelector('.header');
    
    this.isMenuOpen = false;
    
    this.init();
  }
  
  init() {
    if (this.navToggle && this.navMenu) {
      this.bindEvents();
      this.setupSmoothScrolling();
      this.setupActiveNavigation();
    }
  }
  
  bindEvents() {
    // Toggle mobile menu
    this.navToggle.addEventListener('click', () => this.toggleMenu());
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.navToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
        this.closeMenu();
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu();
      }
    });
    
    // Close menu when clicking nav links
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMenu();
      });
    });
  }
  
  toggleMenu() {
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }
  
  openMenu() {
    this.navMenu.classList.add('active');
    this.navToggle.classList.add('active');
    this.navToggle.setAttribute('aria-expanded', 'true');
    this.isMenuOpen = true;
    
    // Prevent body scroll when menu is open (mobile)
    if (window.innerWidth <= 768) {
      document.body.style.overflow = 'hidden';
    }
    
    trackEvent('navigation_menu_opened');
  }
  
  closeMenu() {
    this.navMenu.classList.remove('active');
    this.navToggle.classList.remove('active');
    this.navToggle.setAttribute('aria-expanded', 'false');
    this.isMenuOpen = false;
    
    // Restore body scroll
    document.body.style.overflow = '';
  }
  
  setupSmoothScrolling() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Only handle internal anchor links
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          
          if (targetElement) {
            smoothScrollTo(targetElement);
            trackEvent('navigation_link_clicked', { target: href });
          }
        }
      });
    });
  }
  
  setupActiveNavigation() {
    // Highlight active navigation item based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    if (sections.length === 0) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.updateActiveNavItem(entry.target.id);
          }
        });
      },
      {
        threshold: CONFIG.OBSERVER_THRESHOLD,
        rootMargin: `-${CONFIG.SCROLL_OFFSET}px 0px -50% 0px`
      }
    );
    
    sections.forEach(section => observer.observe(section));
  }
  
  updateActiveNavItem(activeId) {
    this.navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

// ===========================================
// CHAPTER FILTERING FUNCTIONALITY
// ===========================================
class ChapterFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.chapterCards = document.querySelectorAll('.chapter-card');
    
    this.init();
  }
  
  init() {
    if (this.filterButtons.length > 0 && this.chapterCards.length > 0) {
      this.bindEvents();
    }
  }
  
  bindEvents() {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        this.applyFilter(filter);
        this.updateActiveButton(button);
        
        trackEvent('chapter_filter_applied', { filter });
      });
    });
  }
  
  applyFilter(filter) {
    this.chapterCards.forEach(card => {
      const keywords = card.getAttribute('data-keywords') || '';
      const shouldShow = filter === 'all' || keywords.includes(filter);
      
      if (shouldShow) {
        card.style.display = 'grid';
        card.style.animation = prefersReducedMotion() ? 'none' : 'fade-in 0.3s ease-out';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
  updateActiveButton(activeButton) {
    this.filterButtons.forEach(button => {
      button.classList.remove('active');
    });
    activeButton.classList.add('active');
  }
}

// ===========================================
// ELEVATOR PITCH FUNCTIONALITY
// ===========================================
class ElevatorPitch {
  constructor() {
    this.trigger = document.querySelector('.elevator-pitch-trigger');
    this.content = document.querySelector('.elevator-pitch-content');
    
    this.isVisible = false;
    
    this.init();
  }
  
  init() {
    if (this.trigger && this.content) {
      this.bindEvents();
    }
  }
  
  bindEvents() {
    this.trigger.addEventListener('click', () => this.toggle());
    
    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.trigger.contains(e.target) && !this.content.contains(e.target)) {
        this.hide();
      }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isVisible) {
        this.hide();
      }
    });
  }
  
  toggle() {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }
  
  show() {
    this.content.hidden = false;
    this.content.style.animation = prefersReducedMotion() ? 'none' : 'scale-in 0.3s ease-out';
    this.isVisible = true;
    
    trackEvent('elevator_pitch_opened');
  }
  
  hide() {
    this.content.hidden = true;
    this.isVisible = false;
  }
}

// ===========================================
// COPY TO CLIPBOARD FUNCTIONALITY
// ===========================================
class ClipboardManager {
  constructor() {
    this.copyButtons = document.querySelectorAll('.copy-btn');
    
    this.init();
  }
  
  init() {
    if (this.copyButtons.length > 0) {
      this.bindEvents();
    }
  }
  
  bindEvents() {
    this.copyButtons.forEach(button => {
      button.addEventListener('click', () => {
        const textToCopy = button.getAttribute('data-clipboard');
        this.copyToClipboard(textToCopy, button);
      });
    });
  }
  
  async copyToClipboard(text, button) {
    try {
      await navigator.clipboard.writeText(text);
      this.showCopyFeedback(button, true);
      trackEvent('citation_copied', { success: true });
    } catch (err) {
      // Fallback for older browsers
      this.fallbackCopyToClipboard(text, button);
    }
  }
  
  fallbackCopyToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      this.showCopyFeedback(button, successful);
      trackEvent('citation_copied', { success: successful, method: 'fallback' });
    } catch (err) {
      this.showCopyFeedback(button, false);
      trackEvent('citation_copy_failed');
    }
    
    document.body.removeChild(textArea);
  }
  
  showCopyFeedback(button, success) {
    const originalText = button.textContent;
    const originalAriaLabel = button.getAttribute('aria-label');
    
    if (success) {
      button.textContent = '✅';
      button.setAttribute('aria-label', 'Copied to clipboard');
      button.classList.add('copied');
    } else {
      button.textContent = '❌';
      button.setAttribute('aria-label', 'Failed to copy');
    }
    
    // Reset after delay
    setTimeout(() => {
      button.textContent = originalText;
      button.setAttribute('aria-label', originalAriaLabel);
      button.classList.remove('copied');
    }, CONFIG.COPY_FEEDBACK_DURATION);
  }
}

// ===========================================
// BACK TO TOP FUNCTIONALITY
// ===========================================
class BackToTop {
  constructor() {
    this.button = document.querySelector('.back-to-top');
    
    this.init();
  }
  
  init() {
    if (this.button) {
      this.bindEvents();
      this.setupScrollListener();
    }
  }
  
  bindEvents() {
    this.button.addEventListener('click', () => {
      if (prefersReducedMotion()) {
        window.scrollTo({ top: 0 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      trackEvent('back_to_top_clicked');
    });
  }
  
  setupScrollListener() {
    const scrollHandler = debounce(() => {
      const shouldShow = window.pageYOffset > CONFIG.BACK_TO_TOP_THRESHOLD;
      
      if (shouldShow) {
        this.button.hidden = false;
      } else {
        this.button.hidden = true;
      }
    }, 100);
    
    window.addEventListener('scroll', scrollHandler);
  }
}

// ===========================================
// DOWNLOAD TRACKING
// ===========================================
class DownloadTracker {
  constructor() {
    this.downloadLinks = document.querySelectorAll('a[href$=".pdf"], a[download]');
    
    this.init();
  }
  
  init() {
    if (this.downloadLinks.length > 0) {
      this.bindEvents();
    }
  }
  
  bindEvents() {
    this.downloadLinks.forEach(link => {
      link.addEventListener('click', () => {
        const fileName = link.getAttribute('href') || link.getAttribute('download') || 'unknown';
        trackEvent('file_downloaded', { 
          fileName: fileName.split('/').pop(),
          linkText: link.textContent.trim()
        });
      });
    });
  }
}

// ===========================================
// SCROLL ANIMATIONS
// ===========================================
class ScrollAnimations {
  constructor() {
    this.animatedElements = document.querySelectorAll('.key-point-card, .impact-card, .chapter-card, .quote-card');
    
    this.init();
  }
  
  init() {
    if (this.animatedElements.length > 0 && !prefersReducedMotion()) {
      this.setupIntersectionObserver();
    }
  }
  
  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animation = 'fade-in 0.6s ease-out forwards';
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: CONFIG.OBSERVER_THRESHOLD,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    
    this.animatedElements.forEach(element => {
      element.style.opacity = '0';
      observer.observe(element);
    });
  }
}

// ===========================================
// KEYBOARD NAVIGATION ENHANCEMENT
// ===========================================
class KeyboardNavigation {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupFocusVisibility();
    this.setupKeyboardShortcuts();
  }
  
  setupFocusVisibility() {
    // Enhance focus visibility for keyboard users
    let isMouseUser = false;
    
    document.addEventListener('mousedown', () => {
      isMouseUser = true;
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        isMouseUser = false;
      }
    });
    
    document.addEventListener('focusin', (e) => {
      if (!isMouseUser) {
        e.target.classList.add('keyboard-focus');
      }
    });
    
    document.addEventListener('focusout', (e) => {
      e.target.classList.remove('keyboard-focus');
    });
  }
  
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Skip if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }
      
      // Alt + H: Go to home/hero
      if (e.altKey && e.key === 'h') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        trackEvent('keyboard_shortcut_used', { shortcut: 'alt_h' });
      }
      
      // Alt + D: Download PDF
      if (e.altKey && e.key === 'd') {
        e.preventDefault();
        const downloadLink = document.querySelector('a[href$=".pdf"]');
        if (downloadLink) {
          downloadLink.click();
          trackEvent('keyboard_shortcut_used', { shortcut: 'alt_d' });
        }
      }
    });
  }
}

// ===========================================
// PERFORMANCE MONITORING
// ===========================================
class PerformanceMonitor {
  constructor() {
    this.init();
  }
  
  init() {
    // Track page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.trackPageLoadMetrics();
      }, 0);
    });
  }
  
  trackPageLoadMetrics() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigation = performance.getEntriesByType('navigation')[0];
      
      if (navigation) {
        const metrics = {
          loadTime: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
          domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
          firstPaint: this.getFirstPaint(),
          largestContentfulPaint: this.getLargestContentfulPaint()
        };
        
        trackEvent('page_performance', metrics);
      }
    }
  }
  
  getFirstPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
    return firstPaint ? Math.round(firstPaint.startTime) : null;
  }
  
  getLargestContentfulPaint() {
    return new Promise((resolve) => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(Math.round(lastEntry.startTime));
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Fallback timeout
        setTimeout(() => resolve(null), 5000);
      } else {
        resolve(null);
      }
    });
  }
}

// ===========================================
// MAIN INITIALIZATION
// ===========================================
class App {
  constructor() {
    this.components = [];
    this.init();
  }
  
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
    } else {
      this.initializeComponents();
    }
  }
  
  initializeComponents() {
    try {
      // Initialize all components
      this.components = [
        new NavigationManager(),
        new ChapterFilter(),
        new ElevatorPitch(),
        new ClipboardManager(),
        new BackToTop(),
        new DownloadTracker(),
        new ScrollAnimations(),
        new KeyboardNavigation(),
        new PerformanceMonitor()
      ];
      
      console.log('Academic landing page initialized successfully');
      trackEvent('app_initialized', { 
        components_loaded: this.components.length,
        user_agent: navigator.userAgent,
        viewport_width: window.innerWidth
      });
      
    } catch (error) {
      console.error('Error initializing app:', error);
      trackEvent('app_initialization_error', { error: error.message });
    }
  }
  
  // Method to reinitialize components if needed (e.g., after dynamic content changes)
  reinitialize() {
    this.components.forEach(component => {
      if (typeof component.init === 'function') {
        component.init();
      }
    });
  }
}

// ===========================================
// START APPLICATION
// ===========================================

// Initialize the application
const app = new App();

// Expose app to global scope for debugging (remove in production if desired)
window.academicLandingApp = app;

// Add some helpful CSS for keyboard focus (if not already in CSS)
if (!document.querySelector('#keyboard-focus-styles')) {
  const style = document.createElement('style');
  style.id = 'keyboard-focus-styles';
  style.textContent = `
    .keyboard-focus {
      outline: 3px solid var(--color-primary, #0B57D0) !important;
      outline-offset: 2px !important;
    }
  `;
  document.head.appendChild(style);
}

// ===========================================
// ERROR HANDLING & FALLBACKS
// ===========================================

// Global error handler
window.addEventListener('error', (event) => {
  console.error('JavaScript error:', event.error);
  trackEvent('javascript_error', {
    message: event.error?.message || 'Unknown error',
    filename: event.filename,
    lineno: event.lineno
  });
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  trackEvent('unhandled_promise_rejection', {
    reason: event.reason?.toString() || 'Unknown reason'
  });
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { App };
}