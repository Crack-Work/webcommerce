// Authentication utility functions
class AuthManager {
    static getCurrentUser() {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    }
    
    static isLoggedIn() {
        return this.getCurrentUser() !== null;
    }
    
    static logout() {
        localStorage.removeItem('currentUser');
        // Redirect to login page
        window.location.href = 'login.html';
    }
    
    static requireAuth() {
        if (!this.isLoggedIn()) {
            alert('Silakan login terlebih dahulu untuk mengakses halaman ini.');
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }
    
    static updateUserDisplay() {
        const user = this.getCurrentUser();
        
        // Update header actions area
        const headerActions = document.querySelector('.header-actions');
        if (headerActions) {
            if (user) {
                // Show user icons when logged in
                headerActions.innerHTML = `
                    <div class="user-actions d-flex align-items-center gap-3">
                        <!-- Language Switch -->
                        <div class="language-switch">
                            <select class="form-select form-select-sm" style="width: auto; font-size: 14px; border: 1px solid #3698D4; color: #3698D4;">
                                <option value="id">ID</option>
                                <option value="en">EN</option>
                            </select>
                        </div>
                        
                        <!-- Notification Icon -->
                        <a href="#" class="notification-icon" title="Notifications" style="color: #3698D4; font-size: 20px; text-decoration: none; position: relative;">
                            <i class="fas fa-bell"></i>
                            <span class="notification-count badge bg-danger" style="position: absolute; top: -8px; right: -8px; font-size: 10px; min-width: 18px; height: 18px; display: none;">0</span>
                        </a>
                        
                        <!-- Profile Icon -->
                        <a href="profile.html" class="user-icon" title="Profile" style="color: #3698D4; font-size: 20px; text-decoration: none;">
                            <i class="fas fa-user-circle"></i>
                        </a>
                        
                        <!-- Wishlist Icon -->
                        <a href="#" class="wishlist-icon" title="Wishlist" style="color: #3698D4; font-size: 20px; text-decoration: none; position: relative;">
                            <i class="fas fa-heart"></i>
                            <span class="wishlist-count badge bg-danger" style="position: absolute; top: -8px; right: -8px; font-size: 10px; min-width: 18px; height: 18px; display: none;">0</span>
                        </a>
                        
                        <!-- Cart Icon -->
                        <a href="cart.html" class="cart-icon" title="Cart" style="color: #3698D4; font-size: 20px; text-decoration: none; position: relative;">
                            <i class="fas fa-shopping-cart"></i>
                            <span class="cart-count badge bg-danger" style="position: absolute; top: -8px; right: -8px; font-size: 10px; min-width: 18px; height: 18px; display: none;">0</span>
                        </a>
                        
                        <!-- Logout Button -->
                        <button onclick="AuthManager.logout()" class="btn btn-sm" style="background: transparent; border: 1px solid #3698D4; color: #3698D4; padding: 6px 12px; border-radius: 4px;" title="Logout">
                            <i class="fas fa-sign-out-alt"></i>
                        </button>
                    </div>
                `;
            } else {
                // Show login/register buttons when not logged in
                headerActions.innerHTML = `
                    <a href="login.html" class="btn" style="background: #3698D4; color: white; padding: 12px 24px; border-radius: 6px; font-weight: 500; text-decoration: none;">Login</a>
                    <a href="register.html" class="btn" style="border: 1px solid #3698D4; color: #3698D4; padding: 12px 24px; border-radius: 6px; font-weight: 500; text-decoration: none; background: transparent;">Register</a>
                `;
            }
        }
        
        // Update mobile menu if exists
        const mobileMenuContainers = document.querySelectorAll('#mobileNavbar .container-fluid');
        mobileMenuContainers.forEach(container => {
            if (user) {
                // Remove existing mobile CTA buttons
                const existingCTA = container.querySelector('.d-flex.gap-3');
                if (existingCTA && !existingCTA.classList.contains('mobile-user-actions')) {
                    existingCTA.remove();
                }
                
                // Add user actions to mobile menu
                const existingUserActions = container.querySelector('.mobile-user-actions');
                if (!existingUserActions) {
                    const mobileUserActions = document.createElement('div');
                    mobileUserActions.className = 'mobile-user-actions d-flex flex-column gap-2 mt-3 pt-3 border-top';
                    mobileUserActions.innerHTML = `
                        <div class="d-flex align-items-center justify-content-between mb-2">
                            <span class="text-primary fw-500">Halo, ${user.name}</span>
                            <select class="form-select form-select-sm" style="width: auto; font-size: 12px;">
                                <option value="id">ID</option>
                                <option value="en">EN</option>
                            </select>
                        </div>
                        <div class="d-flex flex-wrap gap-3 mb-2">
                            <a href="#" class="text-primary" title="Notifications"><i class="fas fa-bell"></i> Notifications</a>
                            <a href="profile.html" class="text-primary" title="Profile"><i class="fas fa-user-circle"></i> Profile</a>
                            <a href="#" class="text-primary" title="Wishlist"><i class="fas fa-heart"></i> Wishlist</a>
                            <a href="cart.html" class="text-primary" title="Cart"><i class="fas fa-shopping-cart"></i> Cart</a>
                        </div>
                        <button onclick="AuthManager.logout()" class="btn btn-outline-primary btn-sm">Logout</button>
                    `;
                    container.appendChild(mobileUserActions);
                }
            } else {
                // Show login/register buttons for non-authenticated users
                const existingUserActions = container.querySelector('.mobile-user-actions');
                if (existingUserActions) {
                    existingUserActions.remove();
                }
                
                // Add login/register buttons if they don't exist
                const existingCTA = container.querySelector('.d-flex.gap-3');
                if (!existingCTA) {
                    const mobileCTA = document.createElement('div');
                    mobileCTA.className = 'd-flex gap-3';
                    mobileCTA.innerHTML = `
                        <a href="login.html" class="btn flex-fill" style="background: #3698D4; color: white; padding: 12px; border-radius: 6px; font-weight: 500; text-decoration: none;">Login</a>
                        <a href="register.html" class="btn flex-fill" style="border: 1px solid #3698D4; color: #3698D4; padding: 12px; border-radius: 6px; font-weight: 500; text-decoration: none; background: transparent;">Register</a>
                    `;
                    container.appendChild(mobileCTA);
                }
            }
        });
        
        // Update cart, wishlist, and notification counts
        this.updateCartCount();
        this.updateWishlistCount();
        this.updateNotificationCount();
    }
    
    static updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        
        const cartBadges = document.querySelectorAll('.cart-count');
        cartBadges.forEach(badge => {
            if (cartCount > 0) {
                badge.textContent = cartCount;
                badge.style.display = 'flex';
                badge.style.alignItems = 'center';
                badge.style.justifyContent = 'center';
            } else {
                badge.style.display = 'none';
            }
        });
    }
    
    static updateWishlistCount() {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const wishlistCount = wishlist.length;
        
        const wishlistBadges = document.querySelectorAll('.wishlist-count');
        wishlistBadges.forEach(badge => {
            if (wishlistCount > 0) {
                badge.textContent = wishlistCount;
                badge.style.display = 'flex';
                badge.style.alignItems = 'center';
                badge.style.justifyContent = 'center';
            } else {
                badge.style.display = 'none';
            }
        });
    }
    
    static updateNotificationCount() {
        const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        const unreadCount = notifications.filter(n => !n.read).length;
        
        const notificationBadges = document.querySelectorAll('.notification-count');
        notificationBadges.forEach(badge => {
            if (unreadCount > 0) {
                badge.textContent = unreadCount;
                badge.style.display = 'flex';
                badge.style.alignItems = 'center';
                badge.style.justifyContent = 'center';
            } else {
                badge.style.display = 'none';
            }
        });
    }
    
    static addNotification(title, message, type = 'info') {
        const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        const newNotification = {
            id: Date.now(),
            title: title,
            message: message,
            type: type, // 'info', 'success', 'warning', 'error'
            timestamp: new Date().toISOString(),
            read: false
        };
        
        notifications.unshift(newNotification); // Add to beginning
        
        // Keep only last 20 notifications
        if (notifications.length > 20) {
            notifications.splice(20);
        }
        
        localStorage.setItem('notifications', JSON.stringify(notifications));
        this.updateNotificationCount();
        
        return newNotification;
    }
    
    static markNotificationAsRead(notificationId) {
        const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        const notification = notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            localStorage.setItem('notifications', JSON.stringify(notifications));
            this.updateNotificationCount();
        }
    }
    
    static markAllNotificationsAsRead() {
        const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        notifications.forEach(n => n.read = true);
        localStorage.setItem('notifications', JSON.stringify(notifications));
        this.updateNotificationCount();
    }
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', function() {
    // Update user display if logged in
    AuthManager.updateUserDisplay();
    
    // Add logout functionality to existing logout buttons
    const logoutButtons = document.querySelectorAll('[data-logout]');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            AuthManager.logout();
        });
    });
    
    // Add wishlist functionality
    document.addEventListener('click', function(e) {
        if (e.target.closest('.wishlist-icon') || e.target.closest('[data-wishlist]')) {
            e.preventDefault();
            // Toggle wishlist functionality can be added here
            console.log('Wishlist clicked');
        }
        
        // Add notification functionality
        if (e.target.closest('.notification-icon') || (e.target.closest('a') && e.target.closest('a').textContent.includes('Notifications'))) {
            e.preventDefault();
            const iconElement = e.target.closest('.notification-icon') || e.target.closest('a');
            showNotificationDropdown(iconElement);
        }
    });
    
    // Show notification dropdown
    function showNotificationDropdown(iconElement) {
        // Remove existing dropdown
        const existingDropdown = document.querySelector('.notification-dropdown');
        if (existingDropdown) {
            existingDropdown.remove();
            return;
        }
        
        const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        
        const dropdown = document.createElement('div');
        dropdown.className = 'notification-dropdown';
        dropdown.style.cssText = `
            position: absolute;
            top: 100%;
            right: 0;
            width: 350px;
            max-height: 400px;
            overflow-y: auto;
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            margin-top: 8px;
        `;
        
        let dropdownContent = `
            <div style="padding: 16px; border-bottom: 1px solid #eee; display: flex; justify-content: between; align-items: center;">
                <h6 style="margin: 0; color: #333; font-weight: 600;">Notifications</h6>
                <button onclick="AuthManager.markAllNotificationsAsRead(); this.closest('.notification-dropdown').remove();" style="background: none; border: none; color: #3698D4; font-size: 12px; cursor: pointer;">Mark all read</button>
            </div>
        `;
        
        if (notifications.length === 0) {
            dropdownContent += `
                <div style="padding: 20px; text-align: center; color: #666;">
                    <i class="fas fa-bell-slash" style="font-size: 24px; color: #ddd; margin-bottom: 8px;"></i>
                    <p style="margin: 0; font-size: 14px;">No notifications yet</p>
                </div>
            `;
        } else {
            notifications.slice(0, 10).forEach(notification => {
                const timeAgo = getTimeAgo(new Date(notification.timestamp));
                const bgColor = notification.read ? '#f9f9f9' : '#f0f8ff';
                const typeIcon = getNotificationIcon(notification.type);
                
                dropdownContent += `
                    <div style="padding: 12px 16px; border-bottom: 1px solid #eee; background: ${bgColor}; cursor: pointer;" onclick="AuthManager.markNotificationAsRead(${notification.id}); this.style.background='#f9f9f9';">
                        <div style="display: flex; gap: 8px;">
                            <div style="color: #3698D4; font-size: 16px; margin-top: 2px;">${typeIcon}</div>
                            <div style="flex: 1;">
                                <div style="font-weight: ${notification.read ? '400' : '600'}; font-size: 14px; color: #333; margin-bottom: 4px;">${notification.title}</div>
                                <div style="font-size: 12px; color: #666; line-height: 1.4;">${notification.message}</div>
                                <div style="font-size: 11px; color: #999; margin-top: 4px;">${timeAgo}</div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
        
        dropdown.innerHTML = dropdownContent;
        
        // Position dropdown relative to notification icon
        const iconRect = iconElement.getBoundingClientRect();
        iconElement.parentElement.style.position = 'relative';
        iconElement.parentElement.appendChild(dropdown);
        
        // Close dropdown when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeDropdown(e) {
                if (!dropdown.contains(e.target) && !iconElement.contains(e.target)) {
                    dropdown.remove();
                    document.removeEventListener('click', closeDropdown);
                }
            });
        }, 100);
    }
    
    // Helper function to get time ago string
    function getTimeAgo(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${diffDays}d ago`;
    }
    
    // Helper function to get notification icon
    function getNotificationIcon(type) {
        switch(type) {
            case 'success': return '<i class="fas fa-check-circle"></i>';
            case 'warning': return '<i class="fas fa-exclamation-triangle"></i>';
            case 'error': return '<i class="fas fa-times-circle"></i>';
            default: return '<i class="fas fa-info-circle"></i>';
        }
    }
    
    // Language switcher functionality
    document.addEventListener('change', function(e) {
        if (e.target.matches('.language-switch select, .mobile-user-actions select')) {
            const selectedLang = e.target.value;
            localStorage.setItem('selectedLanguage', selectedLang);
            // Language switching functionality can be added here
            console.log('Language changed to:', selectedLang);
        }
    });
    
    // Load saved language preference
    const savedLang = localStorage.getItem('selectedLanguage') || 'id';
    const langSelectors = document.querySelectorAll('.language-switch select, .mobile-user-actions select');
    langSelectors.forEach(selector => {
        selector.value = savedLang;
    });
});

// Export for global access
window.AuthManager = AuthManager;