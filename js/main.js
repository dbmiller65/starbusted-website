// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('#hero');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition < window.innerHeight) {
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });
    
    // Photo upload preview
    const photoInput = document.getElementById('photo');
    let photoPreview;
    
    if (photoInput) {
        // Create a preview container
        photoPreview = document.createElement('div');
        photoPreview.className = 'photo-preview';
        photoPreview.style.marginTop = '10px';
        photoPreview.style.display = 'none';
        photoInput.parentNode.appendChild(photoPreview);
        
        photoInput.addEventListener('change', function() {
            const file = this.files[0];
            
            if (file) {
                const reader = new FileReader();
                
                reader.addEventListener('load', function() {
                    photoPreview.innerHTML = `<img src="${this.result}" style="max-width: 100%; max-height: 200px; border-radius: 5px;">`;
                    photoPreview.style.display = 'block';
                });
                
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Upload form submission handler
    const uploadForm = document.getElementById('upload-form');
    
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const yourName = document.getElementById('your-name').value;
            const email = document.getElementById('email').value;
            const cupName = document.getElementById('cup-name').value;
            const location = document.getElementById('location').value;
            const photo = document.getElementById('photo').files[0];
            
            // Simple validation
            if (!yourName || !email || !cupName || !location || !photo) {
                alert('Please fill out all required fields and upload a photo');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            alert(`Thank you for busting ${cupName}! Your submission will be reviewed and added to our gallery.`);
            
            // Reset the form
            uploadForm.reset();
            photoPreview.style.display = 'none';
        });
    }
    
    // Contact form submission handler
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill out all fields');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Mobile menu toggle (for future implementation)
    // This is a placeholder for when you want to add a mobile hamburger menu
    const mobileMenuToggle = function() {
        // Code for mobile menu toggle will go here
    };
});

// Coffee cup floating animation (decorative)
function createFloatingCups() {
    const cupsContainer = document.createElement('div');
    cupsContainer.classList.add('cups-container');
    cupsContainer.style.position = 'fixed';
    cupsContainer.style.top = '0';
    cupsContainer.style.left = '0';
    cupsContainer.style.width = '100%';
    cupsContainer.style.height = '100%';
    cupsContainer.style.pointerEvents = 'none';
    cupsContainer.style.zIndex = '-1';
    cupsContainer.style.overflow = 'hidden';
    document.body.appendChild(cupsContainer);
    
    // Cup emoji and SVG representations
    const cupSymbols = [
        '☕',
        '🥤',
        '<svg width="20" height="24" viewBox="0 0 20 24" fill="#006241"><path d="M10,2 L18,2 L18,4 C18,5.1 17.1,6 16,6 L12,6 C10.9,6 10,5.1 10,4 L10,2 Z M4,19 L16,19 C17.1,19 18,18.1 18,17 L18,7 L2,7 L2,17 C2,18.1 2.9,19 4,19 Z"></path></svg>'
    ];
    
    for (let i = 0; i < 15; i++) {
        const cup = document.createElement('div');
        cup.classList.add('floating-cup');
        
        // Random position
        cup.style.top = `${Math.random() * 100}%`;
        cup.style.left = `${Math.random() * 100}%`;
        
        // Random size
        const size = 20 + Math.random() * 30;
        cup.style.fontSize = `${size}px`;
        
        // Random rotation
        const rotation = Math.random() * 360;
        cup.style.transform = `rotate(${rotation}deg)`;
        
        // Random animation duration and delay
        const duration = 15 + Math.random() * 30;
        const delay = Math.random() * 15;
        cup.style.animation = `float ${duration}s linear ${delay}s infinite`;
        
        // Random cup symbol
        const symbolIndex = Math.floor(Math.random() * cupSymbols.length);
        cup.innerHTML = cupSymbols[symbolIndex];
        
        // Style
        cup.style.position = 'absolute';
        cup.style.opacity = '0.1';
        
        cupsContainer.appendChild(cup);
    }
    
    // Add the animation to the stylesheet
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

// Uncomment the line below if you want to add floating cups in the background
// createFloatingCups();
