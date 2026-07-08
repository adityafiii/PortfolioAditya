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

    // Parallax effect on the background grid based on mouse movement
    const gridBackground = document.querySelector('.grid-background');
    const heroImage = document.querySelector('.hero-image');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Move grid slightly opposite to mouse
        const moveX = (x - 0.5) * 30;
        const moveY = (y - 0.5) * 30;
        
        if(gridBackground) {
            gridBackground.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
        }
        
        // Removed parallax effect on the image as requested by the user
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
