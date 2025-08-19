// Notification Dropdown Handler
document.addEventListener('DOMContentLoaded', function() {
    // Manual notification dropdown handler
    function initNotificationDropdown() {
        const notificationDropdown = document.getElementById('notificationDropdown');
        const dropdownMenu = notificationDropdown ? notificationDropdown.nextElementSibling : null;
        
        if (notificationDropdown && dropdownMenu) {
            // Remove existing Bootstrap dropdown toggle
            notificationDropdown.removeAttribute('data-bs-toggle');
            notificationDropdown.classList.remove('dropdown-toggle');
            
            notificationDropdown.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = this.closest('.dropdown');
                const isOpen = dropdown.classList.contains('show');
                
                // Close all other dropdowns first
                document.querySelectorAll('.dropdown.show').forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('show');
                        const menu = d.querySelector('.dropdown-menu');
                        if (menu) {
                            menu.classList.remove('show');
                        }
                    }
                });
                
                // Toggle current dropdown
                if (!isOpen) {
                    dropdown.classList.add('show');
                    dropdownMenu.classList.add('show');
                } else {
                    dropdown.classList.remove('show');
                    dropdownMenu.classList.remove('show');
                }
            });
        }
    }
    
    // Initialize notification dropdown
    initNotificationDropdown();
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown.show').forEach(d => {
                d.classList.remove('show');
                const menu = d.querySelector('.dropdown-menu');
                if (menu) {
                    menu.classList.remove('show');
                }
            });
        }
    });
    
    // Prevent dropdown menu from closing when clicking inside
    document.querySelectorAll('.dropdown-menu.notification-dropdown').forEach(menu => {
        menu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
});