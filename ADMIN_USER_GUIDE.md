# FoodieExpress - Admin & User System Implementation Guide

## Overview
This guide explains how to integrate the new Admin and User systems into your FoodieExpress project.

---

## 📁 New Files Created

### 1. **Admin Login Page**
- **File:** `admin_login.html`
- **JS File:** `admin_login.js`
- **Purpose:** Dedicated login page for administrators
- **Demo Credentials:**
  - Email: `admin@foodie.com`
  - Password: `admin123`

### 2. **Admin Dashboard**
- **File:** `admin_dashboard.html`
- **CSS File:** `admin_dashboard.css`
- **JS File:** `admin_dashboard.js`
- **Features:**
  - Dashboard with stats and overview
  - Orders Management
  - Users Management
  - Menu Items Management
  - Analytics & Reports
  - Settings Configuration

### 3. **Enhanced Login Page**
- **File:** `login_enhanced.html`
- **Purpose:** Single login page with User/Admin role selection
- **Features:**
  - Toggle between User and Admin modes
  - Role-based routing
  - Demo credentials display

---

## 🚀 Implementation Steps

### Step 1: Update Your Main Login Page
Replace your current `index.html` with `login_enhanced.html` OR add this to your `index.html`:

```html
<!-- Add this role selection section at the top -->
<div class="role-selection">
    <h1>Welcome to FoodieExpress</h1>
    <p>Select your login type</p>
    <div class="role-buttons">
        <button class="role-btn active" onclick="selectRole('user')">
            <i class="fas fa-user"></i> User Login
        </button>
        <button class="role-btn" onclick="selectRole('admin')">
            <i class="fas fa-crown"></i> Admin Login
        </button>
    </div>
</div>
```

### Step 2: Update Navigation
Add a link to Admin Login in your navigation:

```html
<!-- In your navbar -->
<a href="admin_login.html" class="admin-link">
    <i class="fas fa-crown"></i> Admin
</a>
```

### Step 3: Copy All Files to Your Project
1. `admin_login.html` - Admin login page
2. `admin_login.js` - Admin login script
3. `admin_dashboard.html` - Admin dashboard
4. `admin_dashboard.css` - Admin styles
5. `admin_dashboard.js` - Admin dashboard script
6. `login_enhanced.html` - Enhanced login (optional)

### Step 4: Update User Login Script
Modify your `login.js` to differentiate between user and admin:

```javascript
function login() {
    const user = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value.trim();

    // User credentials
    if ((user === "user@" && pass === "123") || 
        (user === "admin@" && pass === "123")) {
        localStorage.setItem("userLoggedIn", "true");
        localStorage.setItem("userEmail", user);
        window.location.href = "Pickup.html";
    } else {
        alert("Invalid user credentials");
    }
}
```

---

## 🔐 Authentication System

### User Authentication Flow
```
User Login (index.html)
    ↓
Validate User Credentials
    ↓
Redirect to Pickup.html (User Dashboard)
```

### Admin Authentication Flow
```
Admin Login (admin_login.html)
    ↓
Validate Admin Credentials
    ↓
Redirect to admin_dashboard.html
```

### Demo Credentials

**User Login:**
- Email: `user@`
- Password: `123`

**Admin Login (Method 1):**
- Email: `admin@foodie.com`
- Password: `admin123`

**Admin Login (Method 2):**
- Email: `manager@foodie.com`
- Password: `manager123`

---

## 👤 User Features

### User Dashboard Access
Users have access to:
- Home Page (Category selection)
- Browse Menu (Burgers, Pizza, Pasta, etc.)
- Shopping Cart
- Order Tracking
- Dashboard with order history
- Profile Management
- Contact Support

### User Session
```javascript
// User is logged in
localStorage.getItem("userLoggedIn"); // "true"
localStorage.getItem("userEmail");    // user email
```

---

## 👨‍💼 Admin Features

### Admin Dashboard Sections

1. **Dashboard**
   - Overview statistics
   - Recent orders
   - Quick actions

2. **Orders Management**
   - View all orders
   - Filter and search
   - Change order status
   - Delete orders

3. **Users Management**
   - View all registered users
   - Search users
   - Deactivate accounts
   - Edit user information

4. **Menu Management**
   - Add new menu items
   - Edit items
   - Delete items
   - Manage stock/availability
   - Category organization

5. **Analytics**
   - Sales metrics
   - Revenue tracking
   - Growth rate
   - Customer ratings

6. **Settings**
   - Restaurant configuration
   - Contact information
   - Business hours
   - Payment settings

### Admin Session
```javascript
// Admin is logged in
localStorage.getItem("adminLoggedIn");  // "true"
localStorage.getItem("adminEmail");     // admin email
localStorage.getItem("adminLoginTime"); // login timestamp
```

---

## 🔒 Session Management

### Logout
Both user and admin can logout:

```javascript
// User Logout
function userLogout() {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("userEmail");
    window.location.href = "index.html";
}

// Admin Logout
function adminLogout() {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminLoginTime");
    window.location.href = "admin_login.html";
}
```

### Session Verification
The admin dashboard automatically checks if user is logged in:

```javascript
function checkAdminSession() {
    const isAdminLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isAdminLoggedIn) {
        window.location.href = "admin_login.html";
    }
}
```

---

## 🎨 Styling

### Color Scheme
- Primary: `#ff7f00` (Orange)
- Secondary: `#ff4500` (Orange-Red)
- Background: `#f5f7fa`
- Text: `#333`

### Responsive Design
All components are mobile-friendly and responsive using CSS Grid and Flexbox.

---

## 📊 Database Integration (Future)

To connect with a real database, replace demo credentials with API calls:

```javascript
// Example for user login
async function authenticateUser(email, password) {
    const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    if (data.success) {
        localStorage.setItem("userLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        window.location.href = "Pickup.html";
    }
}
```

---

## 🔄 Navigation Structure

```
┌─ Home Page
│
├─ User Login (index.html)
│  ├─ Pickup.html (User Dashboard)
│  ├─ Home.html (Browse)
│  ├─ BurgerMenu.html (Menu)
│  ├─ cart_page.html (Cart)
│  ├─ checkout_page.html (Checkout)
│  ├─ track_page.html (Track Orders)
│  └─ dashboard_page.html (User Profile)
│
└─ Admin Login (admin_login.html)
   └─ admin_dashboard.html (Admin Panel)
      ├─ Dashboard
      ├─ Orders Management
      ├─ Users Management
      ├─ Menu Management
      ├─ Analytics
      └─ Settings
```

---

## ✅ Testing Checklist

- [ ] User can login with demo credentials
- [ ] Admin can login with demo credentials
- [ ] User is redirected to Pickup.html after login
- [ ] Admin is redirected to admin_dashboard.html after login
- [ ] Logout works for both user and admin
- [ ] Session is maintained on page reload
- [ ] Admin dashboard sections toggle properly
- [ ] Search functionality works in tables
- [ ] Responsive design works on mobile

---

## 📝 Notes

1. **Demo Mode:** The current system uses localStorage for demo purposes
2. **Security:** For production, use secure backend authentication and encrypted sessions
3. **Admin Privileges:** Implement role-based access control (RBAC)
4. **Data Persistence:** Connect to a real database instead of localStorage

---

## 🆘 Support

For issues or questions about the implementation, refer to the inline comments in each file.

---

**Created:** December 17, 2025
**Version:** 1.0
**Project:** FoodieExpress
