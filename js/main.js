// WooShop - Main JavaScript File

// Global variables
let products = [];
let cart = [];
let currentProductId = null;
let filteredProducts = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    initializeCart();
    setupEventListeners();
    initDropdownFix(); // Add dropdown positioning fix
    
    // Check which page we're on and initialize accordingly
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'index.html':
        case '':
            initHomePage();
            break;
        case 'shop.html':
            initShopPage();
            break;
        case 'product.html':
            initProductPage();
            break;
        case 'cart.html':
            initCartPage();
            break;
    }
});

// Simple and Effective Dropdown Fix
function initDropdownFix() {
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown._customDropdown').forEach(dropdown => {
                if (dropdown.parentNode) {
                    dropdown.parentNode.removeChild(dropdown);
                }
            });
        }
    });
}

// Load products from JSON file
async function loadProducts() {
    try {
        const response = await fetch('data/products.json');
        products = await response.json();
        filteredProducts = [...products];
    } catch (error) {
        console.error('Error loading products:', error);
        // Fallback to empty array if JSON file fails to load
        products = [];
        filteredProducts = [];
    }
}

// Initialize shopping cart
function initializeCart() {
    const savedCart = localStorage.getItem('wooshop_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartBadge();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('wooshop_cart', JSON.stringify(cart));
    updateCartBadge();
}

// Update cart badge count
function updateCartBadge() {
    const badge = document.querySelector('.badge.rounded-pill');
    if (badge) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
}

// FAQ Toggle Function - Simple approach
function toggleFAQ(button) {
    const faqContainer = button.parentElement;
    const answer = faqContainer.querySelector('.faq-answer');
    const icon = button.querySelector('i');
    
    // Toggle visibility
    if (answer.style.display === 'none' || answer.style.display === '') {
        // Close all other FAQs first
        document.querySelectorAll('.faq-answer').forEach(item => {
            item.style.display = 'none';
        });
        document.querySelectorAll('.faq-item-container i').forEach(item => {
            item.style.transform = 'rotate(0deg)';
        });
        document.querySelectorAll('.faq-item-container').forEach(item => {
            item.style.height = '78px';
        });
        
        // Open current FAQ
        answer.style.display = 'flex';
        icon.style.transform = 'rotate(180deg)';
        faqContainer.style.height = 'auto';
    } else {
        // Close current FAQ
        answer.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
        faqContainer.style.height = '78px';
    }
}

// Make function globally available
window.toggleFAQ = toggleFAQ;

// Setup global event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(searchProducts, 300));
    }
    
    // Add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-add-to-cart')) {
            e.preventDefault();
            const productId = parseInt(e.target.dataset.productId);
            addToCart(productId);
        }
    });
    
    // Mobile menu toggle - handled by Bootstrap collapse
}

// Mobile menu functionality now handled by Bootstrap collapse
// No custom JavaScript needed for mobile menu toggle

// Debounce function for search
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

// Initialize home page
function initHomePage() {
    loadFeaturedProducts();
    loadLatestProducts();
    initProductUnggulanFilters();
}

// Load featured products for home page
function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    
    const featuredProducts = products.filter(product => product.featured).slice(0, 4);
    
    if (featuredProducts.length === 0) {
        container.innerHTML = '<div class="col-12 text-center"><p class="text-muted">No featured products available</p></div>';
        return;
    }
    
    container.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

// Load latest products for home page
function loadLatestProducts() {
    const container = document.getElementById('latest-products');
    if (!container) return;
    
    const latestProducts = products.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)).slice(0, 8);
    
    if (latestProducts.length === 0) {
        container.innerHTML = '<div class="col-12 text-center"><p class="text-muted">No products available</p></div>';
        return;
    }
    
    container.innerHTML = latestProducts.map(product => createProductCard(product)).join('');
}

// Initialize Product Unggulan filters
function initProductUnggulanFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.style.background = 'transparent';
                btn.style.color = '#374151';
            });
            
            // Add active class to clicked button
            this.style.background = '#3698D4';
            this.style.color = 'white';
            
            // Filter products
            const category = this.dataset.category;
            filterProductUnggulan(category);
        });
    });
}

// Filter Product Unggulan by category
function filterProductUnggulan(category) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Create product card HTML
function createProductCard(product) {
    const discountHTML = product.originalPrice ? 
        `<span class="badge bg-danger position-absolute" style="top: 10px; right: 10px;">-${Math.round((1 - product.price / product.originalPrice) * 100)}%</span>` : '';
    
    const originalPriceHTML = product.originalPrice ? 
        `<span class="text-muted text-decoration-line-through me-2">$${product.originalPrice.toFixed(2)}</span>` : '';
    
    return `
        <div class="col-lg-3 col-md-6 mb-4">
            <div class="product-card">
                <div class="product-image position-relative">
                    ${discountHTML}
                    <svg width="200" height="200" class="text-muted">
                        <rect width="200" height="200" fill="#f8f9fa" stroke="#dee2e6"/>
                        <text x="100" y="90" text-anchor="middle" font-size="14" fill="#6c757d">${product.category}</text>
                        <text x="100" y="110" text-anchor="middle" font-size="12" fill="#6c757d">Product Image</text>
                        <text x="100" y="130" text-anchor="middle" font-size="10" fill="#6c757d">${product.id}</text>
                    </svg>
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <a href="product.html?id=${product.id}" class="product-title">${product.name}</a>
                    <div class="product-rating">
                        ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                        <span class="text-muted">(${product.reviews})</span>
                    </div>
                    <div class="product-price">
                        ${originalPriceHTML}
                        $${product.price.toFixed(2)}
                    </div>
                    <button class="btn btn-primary btn-add-to-cart" data-product-id="${product.id}">
                        <i class="fas fa-cart-plus me-2"></i>Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Initialize shop page
function initShopPage() {
    // Check if we have static HTML products, if not load from JSON
    const container = document.getElementById('products-grid');
    if (container && container.children.length === 0) {
        loadShopProducts();
    }
    setupFilters();
    setupSorting();
    
    // Check for category filter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
        filterByCategory(category);
    }
}

// Load products for shop page
function loadShopProducts() {
    const container = document.getElementById('products-grid');
    const countElement = document.getElementById('product-count');
    
    if (!container) return;
    
    // Check if container already has static HTML content (product cards)
    if (container.children.length > 0) {
        // Don't override existing static HTML content
        console.log('Using static HTML product cards');
        return;
    }
    
    if (filteredProducts.length === 0) {
        container.innerHTML = '<div class="col-12 text-center"><p class="text-muted">No products available</p></div>';
        if (countElement) countElement.textContent = '0';
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
    if (countElement) countElement.textContent = filteredProducts.length;
}

// Setup filters for shop page
function setupFilters() {
    // Category filters
    const categoryCheckboxes = document.querySelectorAll('input[type="checkbox"][value]');
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
}

// Apply filters
function applyFilters() {
    const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => cb.value)
        .filter(value => ['electronics', 'clothing', 'books', 'home', 'sports'].includes(value));
    
    const selectedPriceRanges = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => cb.value)
        .filter(value => value.includes('-') || value.includes('+'));
    
    const selectedRatings = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => cb.value)
        .filter(value => ['3', '4', '5'].includes(value));
    
    filteredProducts = products.filter(product => {
        // Category filter
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
            return false;
        }
        
        // Price filter
        if (selectedPriceRanges.length > 0) {
            const priceMatches = selectedPriceRanges.some(range => {
                if (range === '0-25') return product.price <= 25;
                if (range === '25-50') return product.price > 25 && product.price <= 50;
                if (range === '50-100') return product.price > 50 && product.price <= 100;
                if (range === '100+') return product.price > 100;
                return false;
            });
            if (!priceMatches) return false;
        }
        
        // Rating filter
        if (selectedRatings.length > 0) {
            const ratingMatches = selectedRatings.some(rating => {
                const minRating = parseInt(rating);
                return product.rating >= minRating;
            });
            if (!ratingMatches) return false;
        }
        
        return true;
    });
    
    loadShopProducts();
}

// Clear filters
function clearFilters() {
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    filteredProducts = [...products];
    loadShopProducts();
}

// Setup sorting
function setupSorting() {
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', sortProducts);
    }
}

// Sort products
function sortProducts() {
    const sortSelect = document.getElementById('sortSelect');
    const sortValue = sortSelect.value;
    
    switch(sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            break;
        default:
            filteredProducts.sort((a, b) => a.id - b.id);
    }
    
    loadShopProducts();
}

// Filter by category
function filterByCategory(category) {
    const categoryCheckbox = document.getElementById(category);
    if (categoryCheckbox) {
        categoryCheckbox.checked = true;
        applyFilters();
    }
}

// Search products
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === '') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
    }
    
    // If we're on shop page, reload products
    if (window.location.pathname.includes('shop.html')) {
        loadShopProducts();
    }
}

// Initialize product page
function initProductPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')) || 1;
    currentProductId = productId;
    
    loadProductDetails();
    loadRelatedProducts();
    setupProductVariations();
    setupQuantityControls();
}

// Load product details
function loadProductDetails() {
    const product = products.find(p => p.id === currentProductId);
    if (!product) {
        document.getElementById('product-details').innerHTML = '<div class="col-12 text-center"><p class="text-muted">Product not found</p></div>';
        return;
    }
    
    // Update breadcrumb
    const breadcrumb = document.getElementById('product-breadcrumb');
    if (breadcrumb) {
        breadcrumb.textContent = product.name;
    }
    
    // Update product description tab
    const descriptionTab = document.getElementById('product-description');
    if (descriptionTab) {
        descriptionTab.textContent = product.description;
    }
    
    const originalPriceHTML = product.originalPrice ? 
        `<span class="text-muted text-decoration-line-through me-3">$${product.originalPrice.toFixed(2)}</span>` : '';
    
    const variationsHTML = product.variations ? Object.entries(product.variations).map(([key, values]) => `
        <div class="variation-group">
            <label class="form-label text-capitalize">${key}:</label>
            <div class="variation-options">
                ${values.map(value => `
                    <div class="variation-option" data-variation="${key}" data-value="${value}">
                        ${value}
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('') : '';
    
    const detailsHTML = `
        <div class="col-lg-6">
            <div class="product-gallery">
                <div class="product-main-image">
                    <svg width="400" height="400" class="text-muted">
                        <rect width="400" height="400" fill="#f8f9fa" stroke="#dee2e6"/>
                        <text x="200" y="180" text-anchor="middle" font-size="20" fill="#6c757d">${product.category}</text>
                        <text x="200" y="210" text-anchor="middle" font-size="16" fill="#6c757d">Product Image</text>
                        <text x="200" y="240" text-anchor="middle" font-size="14" fill="#6c757d">${product.name}</text>
                    </svg>
                </div>
                <div class="product-thumbnails">
                    ${Array.from({length: 4}, (_, i) => `
                        <div class="product-thumbnail">
                            <svg width="80" height="80">
                                <rect width="80" height="80" fill="#f8f9fa" stroke="#dee2e6"/>
                                <text x="40" y="45" text-anchor="middle" font-size="10" fill="#6c757d">${i + 1}</text>
                            </svg>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="product-details">
                <h1>${product.name}</h1>
                <div class="product-rating mb-3">
                    ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                    <span class="text-muted ms-2">(${product.reviews} reviews)</span>
                </div>
                <div class="product-price-large">
                    ${originalPriceHTML}
                    $${product.price.toFixed(2)}
                </div>
                <p class="product-description">${product.description}</p>
                
                <div class="product-variations">
                    ${variationsHTML}
                </div>
                
                <div class="quantity-selector">
                    <label class="form-label">Quantity:</label>
                    <div class="quantity-controls">
                        <button type="button" onclick="changeQuantity(-1)">-</button>
                        <input type="number" id="quantity-input" value="1" min="1" max="99">
                        <button type="button" onclick="changeQuantity(1)">+</button>
                    </div>
                </div>
                
                <div class="product-actions">
                    <button class="btn btn-primary btn-lg me-3" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus me-2"></i>Add to Cart
                    </button>
                    <button class="btn btn-outline-secondary btn-lg">
                        <i class="fas fa-heart me-2"></i>Add to Wishlist
                    </button>
                </div>
                
                <div class="product-meta mt-4">
                    <p><strong>Category:</strong> ${product.category}</p>
                    <p><strong>SKU:</strong> ${product.sku || 'WS-' + product.id.toString().padStart(4, '0')}</p>
                    <p><strong>Stock:</strong> ${product.stock || 'In Stock'}</p>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('product-details').innerHTML = detailsHTML;
}

// Load related products
function loadRelatedProducts() {
    const container = document.getElementById('related-products');
    if (!container) return;
    
    const currentProduct = products.find(p => p.id === currentProductId);
    if (!currentProduct) return;
    
    const relatedProducts = products
        .filter(p => p.category === currentProduct.category && p.id !== currentProductId)
        .slice(0, 4);
    
    if (relatedProducts.length === 0) {
        container.innerHTML = '<div class="col-12 text-center"><p class="text-muted">No related products available</p></div>';
        return;
    }
    
    container.innerHTML = relatedProducts.map(product => createProductCard(product)).join('');
}

// Setup product variations
function setupProductVariations() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('variation-option')) {
            const variationType = e.target.dataset.variation;
            const siblings = document.querySelectorAll(`[data-variation="${variationType}"]`);
            
            siblings.forEach(sibling => sibling.classList.remove('active'));
            e.target.classList.add('active');
        }
    });
}

// Setup quantity controls
function setupQuantityControls() {
    const quantityInput = document.getElementById('quantity-input');
    if (quantityInput) {
        quantityInput.addEventListener('input', function() {
            const value = parseInt(this.value);
            if (value < 1) this.value = 1;
            if (value > 99) this.value = 99;
        });
    }
}

// Change quantity
function changeQuantity(change) {
    const quantityInput = document.getElementById('quantity-input');
    if (quantityInput) {
        const currentValue = parseInt(quantityInput.value);
        const newValue = currentValue + change;
        
        if (newValue >= 1 && newValue <= 99) {
            quantityInput.value = newValue;
        }
    }
}

// Add to cart
function addToCart(productId, quantity = null) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const quantityInput = document.getElementById('quantity-input');
    const qty = quantity || (quantityInput ? parseInt(quantityInput.value) : 1);
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: qty,
            image: product.image || null
        });
    }
    
    saveCart();
    showNotification('Product added to cart!', 'success');
}

// Initialize cart page
function initCartPage() {
    updateCartDisplay();
    updateCartSummary();
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-5">
                    <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                    <p class="text-muted">Your cart is empty</p>
                    <a href="shop.html" class="btn btn-primary">Continue Shopping</a>
                </td>
            </tr>
        `;
        return;
    }
    
    const cartHTML = cart.map(item => `
        <tr>
            <td>
                <div class="d-flex align-items-center">
                    <div class="product-image me-3">
                        <svg width="80" height="80" class="bg-light rounded">
                            <rect width="80" height="80" fill="#f8f9fa"/>
                            <text x="40" y="45" text-anchor="middle" font-size="10" fill="#6c757d">Product</text>
                        </svg>
                    </div>
                    <div>
                        <h6 class="mb-0">${item.name}</h6>
                        <small class="text-muted">ID: ${item.id}</small>
                    </div>
                </div>
            </td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <div class="quantity-controls d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <input type="number" class="form-control mx-2" value="${item.quantity}" min="1" style="width: 60px;" onchange="updateQuantity(${item.id}, this.value)">
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    cartItems.innerHTML = cartHTML;
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    
    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
}

// Update quantity in cart
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    if (typeof change === 'string') {
        const newQuantity = parseInt(change);
        if (newQuantity >= 1) {
            item.quantity = newQuantity;
        }
    } else {
        item.quantity += change;
        if (item.quantity < 1) item.quantity = 1;
    }
    
    saveCart();
    updateCartDisplay();
    updateCartSummary();
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
    updateCartSummary();
    showNotification('Product removed from cart', 'info');
}

// Update cart
function updateCart() {
    updateCartDisplay();
    updateCartSummary();
    showNotification('Cart updated', 'success');
}

// Clear cart
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        saveCart();
        updateCartDisplay();
        updateCartSummary();
        showNotification('Cart cleared', 'info');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Utility functions
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
}

function generateStars(rating) {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
}

// Export functions for global use
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.updateCart = updateCart;
window.clearCart = clearCart;
window.changeQuantity = changeQuantity;
window.searchProducts = searchProducts;
window.clearFilters = clearFilters;
window.sortProducts = sortProducts;
window.loadProductDetails = loadProductDetails;
window.loadRelatedProducts = loadRelatedProducts;
window.loadShopProducts = loadShopProducts;
window.setupFilters = setupFilters;
