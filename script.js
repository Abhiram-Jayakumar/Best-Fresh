/**
 * Best & Fresh Chapati Website - JavaScript Functionality
 * Handles animations, interactions, form validation, and UI effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Current year for footer copyright
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize all components
    initNavigation();
    initFloatingChapati();
    initTestimonialSlider();
    initScrollToTop();
    initContactForm();
    initScrollAnimations();
  });
  
  /**
   * Navigation functionality
   * - Toggle mobile menu
   * - Highlight active section on scroll
   * - Add sticky header on scroll
   */
  function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        navLinks.classList.remove('active');
      });
    });
    
    // Add sticky header and highlight active section on scroll
    window.addEventListener('scroll', function() {
      // Add sticky header
      if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
      }
      
      // Highlight active section
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
          item.classList.add('active');
        }
      });
    });
  }
  
  /**
   * Floating Chapati Animation
   * Creating and animating the floating chapatis using pure JavaScript
   */
  
  /**
   * Testimonial Slider
   * Handles the testimonial slider navigation and autoplay
   */
  function initTestimonialSlider() {
    const container = document.getElementById('testimonialContainer');
    const dots = document.querySelectorAll('.dot');
    let activeIndex = 0;
    let interval;
    
    if (!container || dots.length === 0) return;
    
    // Slide to the selected testimonial
    function slideTo(index) {
      container.style.transform = `translateX(-${index * 100}%)`;
      
      // Update active dot
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
      
      activeIndex = index;
    }
    
    // Set up click handlers for dots
    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        slideTo(index);
        resetInterval();
      });
    });
    
    // Set up auto rotation
    function startInterval() {
      interval = setInterval(() => {
        activeIndex = (activeIndex + 1) % dots.length;
        slideTo(activeIndex);
      }, 5000);
    }
    
    function resetInterval() {
      clearInterval(interval);
      startInterval();
    }
    
    // Initialize slider
    slideTo(0);
    startInterval();
    
    // Pause autoplay on hover
    container.addEventListener('mouseenter', () => clearInterval(interval));
    container.addEventListener('mouseleave', startInterval);
  }
  
function initScrollToTop() {
  const scrollBtn = document.getElementById('scrollToTop');

  if (!scrollBtn) return;

  // Show/hide scroll-to-top button based on scroll position
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  // Scroll to top when button is clicked
  scrollBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initScrollToTop);

  
  /**
   * Contact Form Handling
   * Form validation and submission
   */
  function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form fields
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const phone = document.getElementById('phone');
      const message = document.getElementById('message');
      const formResponse = document.getElementById('formResponse');
      const submitBtn = document.getElementById('submitBtn');
      
      // Clear previous errors
      clearErrors();
      
      // Validate form
      let isValid = true;
      
      if (name.value.length < 2) {
        showError('nameError', 'Name must be at least 2 characters.');
        isValid = false;
      }
      
      if (!isValidEmail(email.value)) {
        showError('emailError', 'Please enter a valid email address.');
        isValid = false;
      }
      
      if (phone.value.length < 10) {
        showError('phoneError', 'Please enter a valid phone number.');
        isValid = false;
      }
      
      if (message.value.length < 10) {
        showError('messageError', 'Message must be at least 10 characters.');
        isValid = false;
      }
      
      // Submit form if valid
      if (isValid) {
        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Simulate form submission (in a real application, you would send data to server)
        setTimeout(() => {
          // Show success message
          formResponse.textContent = 'Thank you! Your message has been sent successfully.';
          formResponse.classList.add('success');
          
          // Reset form
          contactForm.reset();
          
          // Reset button
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            formResponse.textContent = '';
            formResponse.classList.remove('success');
          }, 5000);
        }, 1500);
      }
    });
    
    // Helper functions
    function clearErrors() {
      const errorElements = document.querySelectorAll('.error-message');
      errorElements.forEach(el => el.textContent = '');
    }
    
    function showError(elementId, message) {
      const errorElement = document.getElementById(elementId);
      if (errorElement) {
        errorElement.textContent = message;
      }
    }
    
    function isValidEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  }
  
  /**
   * Scroll Animations
   * Add animations to elements when they come into view
   */
  function initScrollAnimations() {
    // Elements to animate
    const animatedElements = document.querySelectorAll('.feature, .product-card, .process-step, .about-image');
    
    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });
    
    // Observe each element
    animatedElements.forEach(element => {
      // Add base animation class
      element.classList.add('fade-in');
      
      // Observe element
      observer.observe(element);
    });
    
    // Add animation CSS
    const style = document.createElement('style');
    style.textContent = `
      .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      .fade-in.animated {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    
    document.head.appendChild(style);
  }