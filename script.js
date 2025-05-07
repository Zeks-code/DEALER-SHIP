document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    const siteWrapper = document.querySelector('.site-wrapper');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            siteWrapper.classList.add('loaded');
            
            // Initialize AOS animations
            AOS.init({
                duration: 800,
                easing: 'ease-out',
                once: true,
                offset: 100
            });
            
            // Start counting animation for stats
            startCounters();
            
            // Animate logo letters after preloader is gone
            setTimeout(animateLogoLetters, 500);
        }, 1500);
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    hamburgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking on links
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 600) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Counter animation for statistics
    function startCounters() {
        const counters = document.querySelectorAll('.count');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const count = 0;
            const increment = target / speed;
            
            const updateCount = () => {
                const currentCount = +counter.innerText;
                
                if (currentCount < target) {
                    counter.innerText = Math.ceil(currentCount + increment);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target + (target === 98 ? '%' : '+');
                }
            };
            
            updateCount();
        });
    }
    
    // Dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Close any open dropdowns first
            dropdowns.forEach(d => {
                if (d !== dropdown && d.classList.contains('active')) {
                    d.classList.remove('active');
                    const openMenu = d.querySelector('.dropdown-menu');
                    if (openMenu) {
                        openMenu.remove();
                    }
                }
            });
            
            this.classList.toggle('active');
            
            // Create a simple dropdown menu
            const items = ['All', 'New', 'Used', 'Certified Pre-owned'];
            
            // Remove any existing dropdown menus
            const existingMenu = this.querySelector('.dropdown-menu');
            if (existingMenu) {
                existingMenu.remove();
                return;
            }
            
            // Create dropdown menu
            const dropdownMenu = document.createElement('div');
            dropdownMenu.classList.add('dropdown-menu');
            
            items.forEach(item => {
                const dropdownItem = document.createElement('div');
                dropdownItem.classList.add('dropdown-item');
                dropdownItem.textContent = item;
                
                dropdownItem.addEventListener('click', function(e) {
                    e.stopPropagation();
                    dropdown.querySelector('span').textContent = item;
                    dropdown.classList.remove('active');
                    dropdownMenu.remove();
                });
                
                dropdownMenu.appendChild(dropdownItem);
            });
            
            // Add the menu to the DOM
            dropdown.appendChild(dropdownMenu);
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        dropdowns.forEach(dropdown => {
            if (dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    menu.remove();
                }
            }
        });
    });
    
    // Search button functionality
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const usedCars = document.querySelector('.search-category:nth-child(1) .dropdown span').textContent;
            const make = document.querySelector('.search-category:nth-child(2) .dropdown span').textContent;
            const model = document.querySelector('.search-category:nth-child(3) .dropdown span').textContent;
            const pricing = document.querySelector('.search-category:nth-child(4) .dropdown span').textContent;
            
            console.log('Search parameters:');
            console.log('Used Cars:', usedCars);
            console.log('Make:', make);
            console.log('Model:', model);
            console.log('Pricing:', pricing);
            
            // Scroll to featured section
            document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a, .mobile-menu ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Update active menu item on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Contact button
    const contactBtn = document.querySelector('.contact-btn button');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Form input animation
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(control => {
        control.addEventListener('focus', function() {
            this.parentElement.classList.add('focus');
        });
        
        control.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focus');
            }
        });
    });
    
    // Testimonial slider functionality
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const testimonialsContainer = document.querySelector('.testimonials-container');
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Function to show a specific testimonial
    function showTestimonial(index) {
        // Calculate the scroll position
        const scrollPos = testimonials[index].offsetLeft;
        testimonialsContainer.scrollTo({
            left: scrollPos,
            behavior: 'smooth'
        });
        
        // Update active dot
        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });
        testimonialDots[index].classList.add('active');
        
        currentTestimonial = index;
    }
    
    // Add click event listeners to dots
    testimonialDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showTestimonial(index);
        });
    });
    
    // Add touch events for mobile swiping
    testimonialsContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    testimonialsContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const threshold = 50; // Minimum swipe distance
        
        if (touchEndX < touchStartX - threshold) {
            // Swiped left - next testimonial
            if (currentTestimonial < testimonials.length - 1) {
                showTestimonial(currentTestimonial + 1);
            }
        } else if (touchEndX > touchStartX + threshold) {
            // Swiped right - previous testimonial
            if (currentTestimonial > 0) {
                showTestimonial(currentTestimonial - 1);
            }
        }
    }
    
    // Auto-rotate testimonials every 5 seconds
    let testimonialInterval = setInterval(() => {
        const nextIndex = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }, 5000);
    
    // Pause rotation on hover
    testimonialsContainer.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialsContainer.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            const nextIndex = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(nextIndex);
        }, 5000);
    });
    
    // Initialize the first testimonial
    showTestimonial(0);
    
    // Set animation delay for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.setProperty('--i', index);
    });
    
    // Luxury hover effects for service cards
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = (y - centerY) / 10;
            const tiltY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-15px) scale(1.03)`;
            
            const icon = this.querySelector('.service-icon');
            if (icon) {
                const glowX = (x / rect.width) * 100;
                const glowY = (y / rect.height) * 100;
                icon.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(201, 168, 92, 0.3), rgba(255, 255, 255, 0.05) 50%)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.background = '';
            }
        });
    });
    
    // View details buttons
    const detailsBtns = document.querySelectorAll('.details-btn');
    detailsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const carName = this.closest('.car-details').querySelector('h3').textContent;
            alert(`Viewing details for ${carName}`);
            // In a real implementation, this would navigate to a car details page
        });
    });
    
    // View all inventory button
    const viewAllBtn = document.querySelector('.view-all button');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            alert('Viewing all inventory');
            // In a real implementation, this would navigate to the full inventory page
        });
    }
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const message = this.querySelector('textarea').value;
            
            // Validate form
            if (name && email && message) {
                console.log('Form submitted:', { name, email, phone, message });
                alert('Thank you for your message! Our team will contact you shortly.');
                this.reset();
                
                // Remove focus class from form groups
                this.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('focus');
                });
            } else {
                alert('Please fill out all required fields.');
            }
        });
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                console.log('Newsletter subscription:', email);
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
                this.querySelector('.form-group').classList.remove('focus');
            } else {
                alert('Please enter your email address.');
            }
        });
    }
});

// Add an animation for the logo when the page loads
function animateLogoLetters() {
    const logoLetters = document.querySelectorAll('.animated-logo span');
    
    logoLetters.forEach((letter, index) => {
        // Initially hide all letters
        letter.style.opacity = '0';
        letter.style.transform = 'translateY(20px)';
        
        // Animate each letter with a delay
        setTimeout(() => {
            letter.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            letter.style.opacity = '1';
            letter.style.transform = 'translateY(0)';
        }, 100 * index);
    });
} 