const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Read form data
app.use(express.urlencoded({ extended: true }));


// =========================
// LOGIN PAGE
// =========================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});


// =========================
// LOGIN PROCESS
// =========================

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const userEmail = email.toLowerCase().trim();


    // =================================
    // ADMIN LOGIN
    // Email contains @admin
    // =================================

    if (userEmail.includes("@admin")) {

        if (password === "admin123") {

            return res.redirect("/dashboard");

        }

    }


    // =================================
    // CUSTOMER LOGIN
    // Any other email
    // =================================

    else {

        if (password === "customer123") {

            return res.redirect("/customer");

        }

    }


    // =================================
    // INVALID LOGIN
    // =================================

    res.send(`
        <script>
            alert("Invalid email or password.");
            window.location.href = "/";
        </script>
    `);

});


// =========================
// ADMIN PAGES
// =========================

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});

app.get("/binmanagement", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "bin-management.html"));
});

app.get("/collection", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "collection.html"));
});

app.get("/routes", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "routes.html"));
});

app.get("/reports", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "reports.html"));
});

app.get("/users", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "users.html"));
});


// =========================
// CUSTOMER PAGE
// =========================

app.get("/customer", (req, res) => {
    res.sendFile(
        path.join(__dirname, "views", "customer-dashboard.html")
    );
});


// =========================
// START SERVER
// =========================

app.listen(PORT, () => {
    console.log(
        `Server running at http://localhost:${PORT}`
    );
});