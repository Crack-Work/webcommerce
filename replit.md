# WooShop - eCommerce Platform

## Overview
WooShop is a modern eCommerce platform inspired by WooCommerce, providing a complete online shopping experience. It currently functions as a static frontend application focusing on client-side shopping. The project aims to deliver a responsive, feature-rich online store, ready for future backend integration to support a full-scale eCommerce business.

## User Preferences
```
Preferred communication style: Simple, everyday language.
Brand guidelines: AI Design System with sans-serif typography and specific color palette (blues, greens, oranges, reds).
Design system colors: Primary #5499D3, Secondary #92BDE6, Success #4DD865, Warning #FFB21A, Danger #FF4D4D, Info #639EFD.
Typography: sans-serif font family with specific weights (400, 500, 600, 700) and sizes.
```

## System Architecture
### Frontend Architecture
- **Technology Stack**: HTML5, CSS3, Bootstrap 5.3.0, vanilla JavaScript
- **Design Pattern**: Multi-page application (MPA) with shared components
- **Styling**: Bootstrap 5 with custom CSS overrides, Font Awesome 6.4.0 for icons
- **UI/UX Decisions**:
    - Consistent header and footer across all pages.
    - Responsive design applied comprehensively using Bootstrap and CSS media queries for various screen sizes (mobile, tablet, desktop).
    - AI Design System adherence with sans-serif typography and a defined color palette for a modern, clean aesthetic.
    - Product displays feature interactive elements like wishlist buttons and hover effects.
    - Forms (login, register, profile) are designed with a 50/50 two-column layout for visual balance on desktop, stacking vertically on mobile.
    - Glassmorphism effects and gradient backgrounds are used for visual appeal in banners and certain sections.
    - Card-based layouts are prevalent for products, features, and testimonials, ensuring modularity and readability.
    - UI elements like logos, buttons, and navigation adapt dynamically to screen size.

### Navigation System
- **Brand-Based Navigation**: Replaced "About Us", "Contact", and "Tips Kecantikan" with three brand-specific menus (Jenauli, Hypure, Honiq)
- **Dynamic Content**: Tips-kecantikan.html now handles URL parameters (?brand=) to display brand-specific "Product Knowledge" content
- **Consistent Structure**: Navigation updated across all pages (index.html, shop.html, product.html, cart.html, checkout.html, login.html, register.html)
- **Responsive Design**: Both desktop and mobile navigation menus updated with new brand structure

### Core Features
- Product catalog browsing with detailed product pages.
- Client-side shopping cart functionality (using localStorage for persistence).
- User authentication UI (login/register forms).
- Product search and filtering capabilities (category-based, real-time).
- Comprehensive user profile management interface with various sections (account info, shipping addresses, order history, etc.) and an edit mode.
- Brand-specific product knowledge pages with dynamic content based on URL parameters.
- Category-based filtering for beauty tips and product knowledge articles.
- "Our Trusted Brands" and "Why Choose Us" sections to highlight values and partners.
- Testimonial section with a carousel displaying customer reviews.

### Recent Changes (August 2025)
- **Complete Logo Standardization Across All Pages**: Implemented consistent logo display with proper sizing across all 12+ website pages (August 7, 2025)
  - Updated all page titles from "WooShop" to "Sareo E-commerce" for brand consistency
  - Standardized logo sizing: 80px desktop, 60px mobile with proper aspect ratio maintenance
  - Enhanced logo fallback system with gradient background "SAREO" text for cross-device compatibility
  - Applied header height standardization: 120px desktop, 100px mobile across all pages
  - Fixed logo display issues for external sharing and cross-device accessibility
  - Updated pages: index.html, shop.html, product.html, cart.html, checkout.html, login.html, register.html, tips-kecantikan.html, profile.html, order-detail.html, notification.html
  - Enhanced error handling with onerror fallback to branded gradient logo
- **Brand-Consistent Icon System Implementation**: Replaced colorful emoji icons with professional SVG icons following brand guidelines (August 6, 2025)
  - Converted all navbar icons to use brand color #2198D6 consistently
  - Replaced emoji icons (🔔, 👤, ❤️, 🛒, 🚪) with professional SVG equivalents
  - Implemented desktop icons (26px) and mobile icons (24px) with proper scaling
  - Added hover effects with background transparency and scale transforms
  - Updated burger menu mobile icon with brand-colored SVG
  - Ensured cross-browser compatibility and consistent rendering
- **Section Title CSS Standardization**: Implemented CSS-based styling for all section titles following product unggulan format (August 5, 2025)
  - Added comprehensive CSS rule targeting all section h2 elements with unified styling
  - Applied styling: font-size: 1.5rem, font-weight: 600, color: #3698D4, margin-bottom: 2rem, text-align: center
  - Removed inline styles from HTML and moved to CSS for better maintainability
  - Standardized 7 sections: Produk Unggulan, Our Trusted Brands, Mengapa Memilih Kami, Apa Kata Mereka, Stay Informed & Inspired, Contact Us, Frequently Asked Questions
  - Enhanced brand consistency with #3698D4 blue color for all section headers
- **Comprehensive Icon System Overhaul**: Implemented professional SVG-based icon system across all pages (August 5, 2025)
  - Replaced Font Awesome dependency with custom SVG icons using data URI backgrounds
  - Added 25+ icon variations: shopping-cart, star, user, heart, search, bell, plus, minus, trash, edit, save, check, eye, lock, unlock, home, cog, user-cog, history, location-arrow, envelope, phone, map-marker-alt, calendar, percent, gift
  - Implemented consistent navbar icon color (#2198D6) following brand guidelines
  - Created JavaScript fallback system (icon-fix.js) with MutationObserver for dynamic content
  - Applied cross-browser compatible SVG rendering with inline and CSS background methods
  - Added icon size standardization: navbar (18px), rating (16px), buttons (14px), mobile (20px)
  - Implemented hover effects and transitions for enhanced user interaction
  - Added comprehensive CSS coverage for all page sections: navbar, footer, product cards, notifications, profile, cart, checkout
  - Deployed icon-fix.js to all 12 HTML pages for consistent icon rendering
- **Mobile-First Complete Redesign**: Created mobile-first-redesign.css with comprehensive responsive solution (August 4, 2025)
  - Implemented true mobile-first approach with progressive enhancement for larger screens
  - Created consistent 16px minimum padding for all sections and proper vertical spacing (24px+)
  - Established responsive typography scale: h1 (1.75rem mobile, 3rem desktop), h2 (1.5rem mobile, 2.5rem desktop)
  - Implemented touch-friendly buttons (44px minimum) and proper tappable areas
  - Created uniform card system with consistent dimensions and spacing across all sections
  - Applied proper image scaling (180px mobile, 200px tablet+) with object-fit cover
  - Implemented stacked mobile layouts that convert to grid systems on larger screens
  - Fixed all text overflow and wrapping issues with proper line-height and word-wrap
  - Ensured contact section maps are properly sized and centered for all screen sizes
  - Created clean footer with proper mobile spacing and touch-friendly links
  - Eliminated all horizontal scrolling and fixed dimension issues for screens 320px-1200px+
  - Added comprehensive responsive breakpoints: 480px, 640px, 768px, 1024px, 1200px
- **Complete Responsive Design Implementation**: Added comprehensive responsive design across all pages (August 4, 2025)
  - Created responsive-fix.css following professional web development standards
  - Implemented proper container system with breakpoints (576px, 768px, 992px, 1200px, 1400px)
  - Fixed all fixed-width elements (1440px, 1248px, etc.) to use 100% width
  - Added responsive typography with proper font sizes for desktop, tablet, and mobile
  - Implemented responsive grid system using CSS Grid with auto-fit and minmax()
  - Fixed product cards to be fully responsive with flexible dimensions
  - Added proper spacing utilities and responsive sections (80px desktop, 60px tablet, 40px mobile)
  - Fixed hero banner responsive behavior with appropriate heights for each device
  - Prevented horizontal scroll with proper overflow handling
  - Ensured all images are responsive with proper object-fit properties
- **Typography and Icon Standards Update**: Optimized font sizes and icon display (August 4, 2025)
  - Implemented professional typography scale based on Major Third ratio (1.25)
  - Reduced oversized fonts: h1 (36px desktop), h2 (30px), h3 (24px) following web standards
  - Fixed hero titles from 4rem to 2.25rem for better readability
  - Reduced decorative icons from 8rem to 3rem to prevent layout issues
  - Added proper font hierarchy for tablets and mobile devices
  - Implemented icon size standards: xs (12px), sm (14px), md (16px), lg (20px), xl (24px)
  - Fixed notification badges with proper sizing (0.625rem)
  - Added alert typography standards (14px body text)
  - Ensured all images display without blocking content using z-index management
- **Navigation Restructure**: Implemented brand-based navigation system replacing generic menu items
- **Product Knowledge Pages**: Converted tips-kecantikan.html to handle three brand categories (Jenauli, Hypure, Honiq)
- **JavaScript Enhancement**: Added URL parameter handling for dynamic content display
- **Cross-Page Consistency**: Updated navigation structure across all 10+ HTML pages
- **Mobile Responsiveness**: Ensured brand navigation works seamlessly on mobile devices
- **Advanced Dropdown Solution**: Implemented robust dropdown positioning using DOM cloning and body-level positioning with z-index 9999999 to ensure "Belanja" dropdown always appears above all content including banners
- **Universal Dropdown Implementation**: Applied consistent dropdown "Belanja" menu functionality across all header navigation pages (index, shop, product, cart, checkout, login, register, tips-kecantikan, profile, order-detail)
- **Dropdown Clone Technology**: Created innovative solution that clones dropdown menu and positions it at document.body level with fixed positioning to prevent any container overflow issues
- **Logo Standardization**: Unified logo sizing to max-height: 40px across all navigation headers and pages to ensure consistent branding display throughout the website
- **Complete Navbar Standardization**: Implemented consistent navigation bar structure across all pages with logout icons, ensuring uniform user experience and functionality throughout the entire website (August 3, 2025)
- **Logout Icon Integration**: Added logout icons (fas fa-sign-out-alt) to both desktop and mobile navigation menus across all pages for consistent user authentication flow
- **Mobile Menu Consistency**: Standardized mobile navigation collapse structure to show only navigation links, removing redundant user action sections that are already available in the mobile action bar
- **Static Notification System**: Created comprehensive notification system with static HTML displays and dummy data across all pages (August 3, 2025)
  - notification.html page with 10 different notification types (order, promo, info, warning)
  - Desktop dropdown notification showing 5 recent notifications with "View All" button
  - Mobile notification icon linking directly to notification.html page
  - Badge counter displaying "3" unread notifications consistently
  - No JavaScript dependencies - pure HTML/CSS implementation with Bootstrap dropdowns
- **Final Navbar Standardization Complete**: Successfully standardized navigation bar template across all 12 website pages (August 3, 2025)
  - Updated profile.html, tips-kecantikan.html, order-detail.html, notification.html with consistent navbar structure
  - Integrated notification dropdown system across all relevant pages with consistent badge counter "3"
  - Maintained brand navigation structure (Jenauli, Hypure, Honiq) and "Belanja" dropdown across all pages
  - Ensured mobile notification links correctly point to notification.html page
  - Verified logout icon consistency on both desktop and mobile navigation menus

### Data Management
- Product data is sourced from `data/products.json`.
- Cart state is managed client-side using browser `localStorage`.

## External Dependencies
### CDN Resources
- **Bootstrap 5.3.0**: Core UI framework and responsive grid system.
- **Font Awesome 6.4.0**: Icon library.

### Third-party Integrations
- No direct external API integrations are currently implemented in the frontend-only version.
- Designed for future integration with payment gateways (e.g., Stripe/PayPal) and various backend APIs (for product management, user authentication, order processing).