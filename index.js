const express = require("express");
const app = express();
const path = require("path"); // Used for handling static files like CSS
const bcrypt = require("bcrypt"); // Optional, for password hashing
const collection = require("./config"); // Assuming this connects to your database

const ejs = require("ejs");

const tpath = path.join(__dirname, "../SIH");
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.set("views", tpath);
app.set("view engine", "ejs");

// Middleware for parsing JSON and URL-encoded data




// Routes
app.get("/", (req, res) => {
    res.render("login"); // Render the login.ejs template
});



app.get("/signup", (req, res) => {
    res.render("signup"); // Render the signup.ejs template
});





app.post("/signup", async(req, res) => { // Typo fixed: "/signup"
    const { username, password } = req.body; // Destructuring assignment for cleaner code
    if (!username || !password) { // Basic validation for username and password
        return res.status(400).send("Username and password are required.");
    }

    // Password hashing (optional):
    if (bcrypt) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10); // Adjust salt rounds as needed
            const data = { name: username, password: hashedPassword };
            const userdata = await collection.insertMany(data);
            console.log(data);

        } catch (error) {
            console.error(error);
            res.status(500).send("Error creating user."); // Handle potential errors
        }
    } else {
        // If bcrypt is not used, implement alternative security measures
        const data = { name: username, password }; // Store password in plain text (not recommended)
        const userdata = await collection.insertMany(data);
        console.log(data);

    }
    res.render("home");
});




app.post("/login", async(req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (check && check.password === req.body.password) {
            res.send("home");
        } else {
            res.render("Wrong password");
        }
    } catch (error) {
        console.error(error);
        res.send("Wrong details");
    }
});








// // Set EJS as the view engine
// app.set('view engine', 'ejs');

// // Serve static files from the 'public' directory (adjust if needed)
// app.use(express.static(path.join(__dirname, "public"))); // Ensures correct path




// app.post("/signup", async(req, res) => { // Typo fixed: "/signup"
//     const { username, password } = req.body; // Destructuring assignment for cleaner code
//     if (!username || !password) { // Basic validation for username and password
//         return res.status(400).send("Username and password are required.");
//     }

//     // Password hashing (optional):
//     if (bcrypt) {
//         try {
//             const hashedPassword = await bcrypt.hash(password, 10); // Adjust salt rounds as needed
//             const data = { name: username, password: hashedPassword };
//             const userdata = await collection.insertMany(data);
//             console.log(data);
//             res.render("home");
//         } catch (error) {
//             console.error(error);
//             res.status(500).send("Error creating user."); // Handle potential errors
//         }
//     } else {
//         // If bcrypt is not used, implement alternative security measures
//         const data = { name: username, password }; // Store password in plain text (not recommended)
//         const userdata = await collection.insertMany(data);
//         console.log(data);
//         res.render("home");
//     }
//     res.render("home");
// });


// app.post("/login", async(req, res) => {
//     try {
//         const check = await collection.findOne({ name: req.body.username });
//         if (check && check.password === req.body.password) {
//             res.send("home");
//         } else {
//             res.render("Wrong password");
//         }
//     } catch (error) {
//         console.error(error);
//         res.send("Wrong details");
//     }
// });


app.listen(5000, () => {
    console.log("server connected"); 

});