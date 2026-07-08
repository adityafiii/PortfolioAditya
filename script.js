document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Hamburger menu toggle for mobile
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            if(navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.right = '2rem';
                navLinks.style.backgroundColor = 'rgba(20, 20, 22, 0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.borderRadius = '8px';
                navLinks.style.border = '1px solid rgba(255,255,255,0.1)';
            }
        });
    }

    // Interactive Premium Features (Parallax, Custom Cursor, 3D Tilt)
    const gridBackground = document.querySelector('.grid-background');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Navbar Glassmorphism Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    document.addEventListener('mousemove', (e) => {
        // 1. Grid Parallax
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        const moveX = (x - 0.5) * 30;
        const moveY = (y - 0.5) * 30;
        if(gridBackground) {
            gridBackground.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
        }
        
        // 2. Custom Cursor Positioning
        if (cursorDot && cursorOutline) {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            // Outline follows with a slight delay using transform via CSS transition, but we set left/top instantly
            // Wait, standard implementation sets left/top and lets CSS `transition` handle the delay, but setting left/top directly avoids jitter.
            // Let's use animate or just set it:
            cursorOutline.style.left = `${e.clientX}px`;
            cursorOutline.style.top = `${e.clientY}px`;
        }
    });

    // Custom Cursor Hover Effects
    const interactables = document.querySelectorAll('a, button, .project-card');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if(cursorOutline) cursorOutline.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            if(cursorOutline) cursorOutline.classList.remove('hover');
        });
    });

    // 3D Tilt Effect for Project Cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const cardX = e.clientX - rect.left; // x position within the element
            const cardY = e.clientY - rect.top;  // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt (max 10 degrees)
            const tiltX = ((cardY - centerY) / centerY) * -10; 
            const tiltY = ((cardX - centerX) / centerX) * 10;
            
            card.style.transform = `translateY(-10px) perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset transform on leave
            card.style.transform = `translateY(0) perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
        });
    });
    
    // Scroll Animations with Intersection Observer
    const animatedElements = document.querySelectorAll('.anim-fade-up, .anim-slide-left, .anim-stagger-parent, .anim-skill-parent, .anim-elastic-up, .typewriter-text');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('out-view');
                entry.target.classList.add('in-view');
                
                // Start Typewriter
                if (entry.target.classList.contains('typewriter-text')) {
                    startTypewriter(entry.target);
                }
            } else {
                entry.target.classList.remove('in-view');
                entry.target.classList.add('out-view');
                
                // Reset Typewriter
                if (entry.target.classList.contains('typewriter-text')) {
                    resetTypewriter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => scrollObserver.observe(el));
    
    // Typewriter Effect Logic
    function startTypewriter(element) {
        if (element.dataset.isTyping === 'true') return;
        element.dataset.isTyping = 'true';
        
        const delay = parseInt(element.getAttribute('data-delay') || '0', 10);
        
        element.typeTimeout = setTimeout(() => {
            element.classList.add('typing');
            
            const text = element.getAttribute('data-text');
            if (!text) return;
            
            element.textContent = ''; // clear initial &nbsp;
            
            // Use a fixed typing speed (ms per character) for a natural feel
            const speed = 25; 
            
            let i = 0;
            element.typeInterval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(element.typeInterval);
                    element.classList.remove('typing');
                }
            }, speed);
        }, delay);
    }
    
    function resetTypewriter(element) {
        clearTimeout(element.typeTimeout);
        clearInterval(element.typeInterval);
        element.dataset.isTyping = 'false';
        element.classList.remove('typing');
        element.textContent = '\u00A0'; // Use non-breaking space to keep layout height stable
    }
});
