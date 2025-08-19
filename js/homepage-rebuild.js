// Homepage Rebuild JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Apply responsive classes and structure
    function applyResponsiveStructure() {
        // Add homepage-container class to key containers
        const containers = document.querySelectorAll('[style*="max-width: 1280px"], [style*="width: 1232px"]');
        containers.forEach(container => {
            container.classList.add('homepage-container');
        });
        
        // Transform testimonial section
        const testimonialSection = document.querySelector('.testimonial-section');
        if (testimonialSection) {
            const carousel = testimonialSection.querySelector('.carousel');
            if (carousel) {
                carousel.classList.add('testimonial-carousel');
            }
            
            const slides = testimonialSection.querySelectorAll('.testimonial-slide');
            slides.forEach(slide => {
                slide.classList.add('testimonial-grid');
                const cards = slide.querySelectorAll('[style*="394.6"]');
                cards.forEach(card => {
                    card.classList.add('testimonial-card');
                });
            });
        }
        
        // Transform brand section
        const brandSection = document.querySelector('.our-trusted-brands');
        if (brandSection) {
            const brandContainer = brandSection.querySelector('[style*="flex-direction: row"]');
            if (brandContainer) {
                brandContainer.classList.add('brand-grid');
            }
            
            const brandCards = brandSection.querySelectorAll('[style*="flex-direction: column"]');
            brandCards.forEach(card => {
                card.classList.add('brand-card');
            });
        }
        
        // Transform Stay Informed section
        const stayInformedSection = document.querySelector('.stay-informed');
        if (stayInformedSection) {
            const grid = stayInformedSection.querySelector('.informes-grid');
            if (grid) {
                grid.classList.add('content-grid');
            }
            
            const cards = stayInformedSection.querySelectorAll('[style*="389.33px"]');
            cards.forEach(card => {
                card.classList.add('content-card');
            });
        }
        
        // Transform Mengapa Memilih Kami section
        const mengapaSection = document.querySelector('.mengapa-memilih-kami');
        if (mengapaSection) {
            const row = mengapaSection.querySelector('.row');
            if (row) {
                row.classList.add('card-grid', 'card-grid-4');
            }
            
            const cards = mengapaSection.querySelectorAll('.col-md-3');
            cards.forEach(card => {
                card.classList.add('homepage-card');
            });
        }
        
        // Transform Contact section
        const contactSection = document.querySelector('.contact-section');
        if (contactSection) {
            const contactContent = contactSection.querySelector('[style*="flex-direction: row"]');
            if (contactContent) {
                contactContent.classList.add('contact-grid');
            }
        }
        
        // Fix product cards
        const productCards = document.querySelectorAll('.product-unggulan .card');
        productCards.forEach(card => {
            card.classList.add('product-card');
            
            // Fix image height
            const img = card.querySelector('img');
            if (img) {
                img.style.height = '200px';
                img.style.objectFit = 'cover';
                img.style.objectPosition = 'center';
            }
        });
    }
    
    // Fix container widths
    function fixContainerWidths() {
        const fixedWidthElements = document.querySelectorAll('[style*="width:"][style*="px"]');
        fixedWidthElements.forEach(el => {
            const style = el.getAttribute('style');
            
            // Skip elements that should keep fixed sizes
            if (el.classList.contains('testimonial-avatar') || 
                el.classList.contains('card-icon') || 
                el.classList.contains('brand-logo')) {
                return;
            }
            
            // Fix large containers
            if (style.includes('1280px') || style.includes('1232px')) {
                el.style.width = '100%';
                el.style.maxWidth = '1200px';
                el.style.margin = '0 auto';
            }
            // Fix testimonial cards
            else if (style.includes('394.6')) {
                el.style.width = 'calc(33.333% - 1.5rem)';
                el.style.minWidth = '300px';
                el.style.maxWidth = '400px';
            }
            // Fix content cards
            else if (style.includes('389.33px')) {
                el.style.width = 'calc(33.333% - 1.5rem)';
                el.style.minWidth = '350px';
            }
            // Fix testimonial content
            else if (style.includes('346.6')) {
                el.style.width = '100%';
            }
            // Fix small text containers
            else if (style.includes('89px') || style.includes('48px')) {
                el.style.width = 'auto';
                el.style.whiteSpace = 'nowrap';
            }
        });
    }
    
    // Mobile responsive adjustments
    function handleMobileLayout() {
        if (window.innerWidth <= 768) {
            // Stack testimonial cards vertically on mobile
            const testimonialSlides = document.querySelectorAll('.testimonial-slide');
            testimonialSlides.forEach(slide => {
                slide.style.flexDirection = 'column';
                slide.style.alignItems = 'center';
            });
            
            // Full width cards on mobile
            const cards = document.querySelectorAll('[style*="394.6"], [style*="389.33px"]');
            cards.forEach(card => {
                card.style.width = '100%';
                card.style.maxWidth = '500px';
            });
            
            // Adjust padding for mobile
            const paddingElements = document.querySelectorAll('[style*="padding: 0px 80px"]');
            paddingElements.forEach(el => {
                el.style.padding = '0 20px';
            });
            
            // Fix contact section on mobile
            const iframe = document.querySelector('iframe[width="528"]');
            if (iframe) {
                iframe.style.width = '100%';
                iframe.style.height = '300px';
                iframe.setAttribute('width', '100%');
                iframe.setAttribute('height', '300');
            }
        }
    }
    
    // Initialize
    applyResponsiveStructure();
    fixContainerWidths();
    handleMobileLayout();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        fixContainerWidths();
        handleMobileLayout();
    });
    
    // Ensure proper section spacing
    const sections = document.querySelectorAll('.homepage-section');
    sections.forEach((section, index) => {
        section.style.position = 'relative';
        section.style.zIndex = index + 1;
        section.style.marginBottom = '0';
    });
});