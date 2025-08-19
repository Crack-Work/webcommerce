// Professional Responsive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Set viewport height for mobile browsers
    function setViewportHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    
    // Fix elements causing horizontal scroll
    function preventOverflow() {
        const docWidth = document.documentElement.clientWidth;
        const problematicSelectors = [
            '[style*="width:"]',
            '[style*="max-width:"]',
            '.container-fluid',
            '.row',
            'section'
        ];
        
        problematicSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                if (el.scrollWidth > docWidth) {
                    el.style.width = '100%';
                    el.style.maxWidth = '100%';
                    el.style.overflow = 'hidden';
                }
            });
        });
    }
    
    preventOverflow();
    window.addEventListener('resize', preventOverflow);
    
    // Fix product cards on mobile
    function adjustProductCards() {
        const cards = document.querySelectorAll('.product-card, .card');
        const isMobile = window.innerWidth < 768;
        
        cards.forEach(card => {
            if (isMobile) {
                card.style.width = '100%';
                card.style.marginBottom = '20px';
            }
        });
    }
    
    adjustProductCards();
    window.addEventListener('resize', adjustProductCards);
    
    // Fix hero banner on mobile
    function adjustHeroBanner() {
        const heroBanner = document.querySelector('.hero-banner');
        if (heroBanner && window.innerWidth < 768) {
            const carousel = heroBanner.querySelector('.carousel');
            if (carousel) {
                carousel.style.height = '50vh';
                carousel.style.minHeight = '300px';
            }
        }
    }
    
    adjustHeroBanner();
    window.addEventListener('resize', adjustHeroBanner);
    
    // Ensure images don't overflow
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
    });
    
    // Fix navigation dropdown on mobile
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach(dropdown => {
        if (window.innerWidth < 768) {
            dropdown.style.position = 'static';
            dropdown.style.width = '100%';
        }
    });
});