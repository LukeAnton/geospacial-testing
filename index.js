const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const DBURL =
  "mongodb+srv://lukeanton:5853luke@cluster0-95upn.mongodb.net/test?retryWrites=true";
// mongodb connection
mongoose.connect(
  DBURL,
  { useNewUrlParser: true }
);

//stupid dep error fixes
//i think i can ref this above ^^^ CBF TESTING THIS NOW WILL DO LATER
// mongoose.set('useNewUrlParser', true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

//more middleware
app.use(express.static("public"));
//body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use("/api", require("./routes/api"));

// error handling
app.use(function(err, req, res, next) {
  console.log(err); // to see properties of message in our console
  res.status(422).send({ error: err.message });
});

// listen for requests
app.listen(process.env.port || 4000, function() {
  console.log("now listening for requests");
});
