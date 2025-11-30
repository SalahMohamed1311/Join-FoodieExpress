function redirectToPage() {
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const terms = document.getElementById("terms").checked;

    //✨ هنا الشرط الي إنت عايزه
    if (password !== confirmPassword) {
        alert("password not matching");
        return;
    }

    if (fullName && email && phone && password && confirmPassword && terms) {
        window.location.href = "LoginPage.html";
    } else {
        alert("!please Enter correct data");
    }
}