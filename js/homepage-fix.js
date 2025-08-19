// Homepage Fix JavaScript - Nuclear Option
document.addEventListener('DOMContentLoaded', function() {
    
    // Force responsive structure
    function makeResponsive() {
        // Fix all fixed width elements
        const fixedWidthElements = document.querySelectorAll('[style*="width:"][style*="px"]');
        fixedWidthElements.forEach(el => {
            const style = el.getAttribute('style');
            if (style.includes('394.66px') || style.includes('394.67px')) {
                el.style.width = 'calc(33.333% - 20px)';
                el.style.minWidth = '300px';
                el.style.maxWidth = '400px';
            } else if (style.includes('346.66px') || style.includes('346.67px')) {
                el.style.width = '100%';
            } else if (style.includes('1232px') || style.includes('1280px')) {
                el.style.width = '100%';
                el.style.maxWidth = '1200px';
                el.style.margin = '0 auto';
            } else if (style.includes('389.33px')) {
                el.style.width = 'calc(33.333% - 20px)';
                el.style.minWidth = '350px';
            }
        });
        
        // Fix testimonial slides
        const testimonialSlides = document.querySelectorAll('.testimonial-slide');
        testimonialSlides.forEach(slide => {
            slide.style.display = 'flex';
            slide.style.flexWrap = 'wrap';
            slide.style.justifyContent = 'center';
            slide.style.gap = '20px';
            slide.style.padding = '20px';
        });
        
        // Fix Stay Informed grid
        const informesGrid = document.querySelector('.informes-grid') || 
                           document.querySelector('[style*="width: 1232px"]');
        if (informesGrid) {
            informesGrid.style.display = 'grid';
            informesGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
            informesGrid.style.gap = '30px';
            informesGrid.style.width = '100%';
            informesGrid.style.maxWidth = '1200px';
            informesGrid.style.margin = '0 auto';
            informesGrid.style.padding = '0 20px';
        }
        
        // Mobile responsive adjustments
        if (window.innerWidth <= 991) {
            testimonialSlides.forEach(slide => {
                slide.style.flexDirection = 'column';
                slide.style.alignItems = 'center';
            });
            
            const testimonialCards = document.querySelectorAll('[style*="394.6"]');
            testimonialCards.forEach(card => {
                card.style.width = '100%';
                card.style.maxWidth = '500px';
            });
        }
    }
    
    // Run on load and resize
    makeResponsive();
    window.addEventListener('resize', makeResponsive);
    
    // Original fixes
    // Fix testimonial author names
    const testimonialAuthors = document.querySelectorAll('.apa-kata-mereka h4, .apa-kata-mereka h5');
    testimonialAuthors.forEach(el => {
        if (el.style.width && el.style.width.includes('px')) {
            el.style.width = 'auto';
            el.style.minWidth = '150px';
        }
    });
    
    // Fix Stay Informed title
    const stayInformedTitle = document.querySelector('.stay-informed h2');
    if (stayInformedTitle && stayInformedTitle.style.width === '335px') {
        stayInformedTitle.style.width = 'auto';
        stayInformedTitle.style.padding = '0 20px';
    }
    
    // Fix all fixed width paragraphs
    const allParagraphs = document.querySelectorAll('p[style*="width:"]');
    allParagraphs.forEach(p => {
        if (p.style.width && p.style.width.includes('px')) {
            const widthValue = parseInt(p.style.width);
            if (widthValue < 200) {
                p.style.width = '100%';
                p.style.height = 'auto';
            }
        }
    });
    
    // Fix Our Trusted Brands visibility
    const trustedBrands = document.querySelector('.our-trusted-brands');
    if (trustedBrands) {
        trustedBrands.style.position = 'relative';
        trustedBrands.style.zIndex = '1000';
        trustedBrands.style.background = 'white';
    }
    
    // Fix all sections z-index
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.position = 'relative';
        section.style.overflow = 'visible';
    });
    
    // Fix Stay Informed cards width
    const informesCards = document.querySelectorAll('.informes-grid > div');
    informesCards.forEach(card => {
        if (card.style.width === '389.33px') {
            card.style.width = 'calc(33.333% - 20px)';
            card.style.minWidth = '300px';
        }
    });
    
    // Fix container widths
    const containers = document.querySelectorAll('[style*="width: 1232px"]');
    containers.forEach(container => {
        container.style.width = '100%';
        container.style.maxWidth = '1200px';
        container.style.margin = '0 auto';
    });
});