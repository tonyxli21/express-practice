const express = require("express");
// Import path module (Node.js module that deals with file paths)
const path = require("path");
// const logger = require("./middleware/logger");
const exphbs = require("express-handlebars");

const members = require("./Members");

// Initialize variable
const app = express();

// Initialize body parser as middleware
// Allows us to handle raw json
app.use(express.json());
// Allows us to handle form submissions (url-encoded data)
app.use(express.urlencoded({ extended: false }));

// Create route to render index handlebars view
// Homepage Route
app.get("/", (req, res) =>
  res.render("index", {
    title: "Member App",
    // members: members (same thing)
    members
  })
);

// Initialize middleware
// app.use(logger);

// Handlebars middleware
// Set template engine (found in documentation)
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Create routes
// Specify type of request we want to handle
// get request is for going to web pages
// app.get("/", (req, res) => {
//   // Take response object and send something to the browser
//   // res.send("Jiji");
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// Set static folder (for serving regular html files)
// .use() is for including middleware
app.use(express.static(path.join(__dirname, "public")));

// Parent route
// Second parameter is requiring the (separate) file we just created
// Members API Routes
app.use("/api/members", require("./routes/api/members"));

// The server most likely has the port number in an environment variable (check for this value first)
const PORT = process.env.PORT || 5000;
// We need this to run the web server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Must create routes/endpoints before we can load anything

// Create form so we can make a request to our API to add a member from the form
