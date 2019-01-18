require("dotenv").config();
var express = require("express");
const path = require("path");
// var exphbs = require("express-handlebars");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Static directory
app.use(express.static("public"));

// Requiring our models for syncing
const db = require(path.join(__dirname, "models"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// // Set Handlebars.
// app.engine(".hbs", exphbs({
//     "defaultLayout": "main",
//     "extname"      : ".hbs"
// }));

// app.set("view engine", ".hbs");

app.set("view engine", "pug");


// Routes
// =============================================================
// require("./routes/htmlRoutes")(app);
// require("./routes/recipeApiRoutes")(app);
// require("./routes/userApiRoutes")(app);

// var syncOptions = { force: false };
// if (process.env.NODE_ENV === "test") {
//     syncOptions.force = true;
//   }

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync(syncOptions).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});

module.exports = app;