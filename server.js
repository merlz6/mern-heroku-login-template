const express =  require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");

const app = express();


// ------ MIDDLEWARE --------- //
app.use(
  bodyParser.urlencoded({
    extended:false
  })
);
app.use(bodyParser.json());

// ------ DB CONNECTION -------- //
const db = require("./config/keys").mongoURI;

mongoose.connect(
  db, {useNewUrlParser:true}
).then(()=> console.log("MONGO DB CONNECTED"))
.catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);



// ----- Heroku's port and local ----- //
const port = process.env.port || 3000;


app.listen(port, () => console.log(`Server up and running on port ${port} !`));
