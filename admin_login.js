function adminLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value.trim();
    const alertBox = document.getElementById("alertBox");

    // Demo admin credentials
    const validAdmins = [
        { email: "admin@foodie.com", password: "admin123" },
        { email: "manager@foodie.com", password: "manager123" }
    ];

    // Validate input
    if (!email || !password) {
        showAlert("Please enter both email and password");
        return;
    }

    if (!email.includes("@")) {
        showAlert("Please enter a valid email address");
        return;
    }

    // Check credentials
    const isValid = validAdmins.some(admin => 
        admin.email === email && admin.password === password
    );

    if (isValid) {
        // Save admin session
        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("adminEmail", email);
        localStorage.setItem("adminLoginTime", new Date().toISOString());
        
        // Redirect to admin dashboard
        window.location.href = "admin_dashboard.html";
    } else {
        showAlert("Invalid admin credentials. Please try again.");
    }
}

function showAlert(message) {
    const alertBox = document.getElementById("alertBox");
    alertBox.textContent = message;
    alertBox.style.display = "block";
    
    setTimeout(() => {
        alertBox.style.display = "none";
    }, 5000);
}

// Form submission
document.getElementById("adminLoginForm").addEventListener("submit", adminLogin);
