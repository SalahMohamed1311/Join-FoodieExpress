function login() {
    var user = document.getElementById("email").value.trim();
    var pass = document.getElementById("password").value.trim();

    // ⿡ لو الاتنين فاضين
    if (user === "" && pass === "") {
        alert("Error: Email and Password are empty! Please enter your data.");
        return;
    }

    // ⿢ لو الايميل فاضي
    if (user === "") {
        alert("Error: Email is empty! Please enter your email.");
        return;
    }

    // ⿣ التحقق من وجود @ في الإيميل
    if (!user.includes("@")) {
        alert("Error: Invalid email format! Email must contain @");
        return;
    }

    // ⿤ لو الباسورد فاضي
    if (pass === "") {
        alert("Error: Password is empty! Please enter your password.");
        return;
    }

    if (
        (user === "admin@" && pass === "123") ||
        (user === "user@" && pass === "123") ){
        window.location.href = "Pickup.html";

    } else {
        alert("Error: Wrong email or password");
    }
    
}