// Check if admin is logged in
window.addEventListener('DOMContentLoaded', function() {
    checkAdminSession();
    loadAdminInfo();
});

function checkAdminSession() {
    const isAdminLoggedIn = localStorage.getItem("adminLoggedIn");
    
    if (!isAdminLoggedIn) {
        // Redirect to admin login if not logged in
        window.location.href = "admin_login.html";
    }
}

function loadAdminInfo() {
    const adminEmail = localStorage.getItem("adminEmail") || "admin@foodie.com";
    const adminName = adminEmail.split('@')[0].toUpperCase();
    const initials = adminName.substring(0, 1);
    
    // Update navbar with admin info
    document.getElementById('adminEmailDisplay').textContent = adminEmail;
    document.getElementById('adminNameDisplay').textContent = adminName;
    document.getElementById('adminInitials').textContent = initials;
}

function adminLogout() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("adminLoggedIn");
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("adminLoginTime");
        window.location.href = "admin_login.html";
    }
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }

    // Update active menu link
    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

function openAddMenuModal() {
    document.getElementById('menuModal').style.display = 'block';
}

function closeMenuModal() {
    document.getElementById('menuModal').style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('menuModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchBoxes = document.querySelectorAll('.search-box');
    searchBoxes.forEach(box => {
        box.addEventListener('keyup', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const table = this.closest('.admin-table-container').querySelector('table');
            const rows = table.querySelectorAll('tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });
});

// Button click handlers
document.addEventListener('DOMContentLoaded', function() {
    // Edit buttons
    const editButtons = document.querySelectorAll('.btn-edit');
    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Edit functionality - You can implement edit modal here');
        });
    });

    // Delete buttons
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this item?')) {
                this.closest('tr').remove();
                alert('Item deleted successfully');
            }
        });
    });

    // View buttons
    const viewButtons = document.querySelectorAll('.btn-view');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('View details - You can implement detail modal here');
        });
    });
});
