// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

// timestamp endpoint

app.get("/api/timestamp/:date_string?", function(req, res) {
  var date = req.params.date_string;

  function dateformat(x) {
    if (x) {
      if (/^[0-9]*$/g.test(x)) {
        return new Date(parseInt(x, 10));
      } else return new Date(x);
    } else return new Date();
  }

  if (isNaN(dateformat(date).getTime())) {
    return res.send({ error: "Invalid Date" });
  } else
    return res.send({
      unix: dateformat(date).getTime(),
      utc: dateformat(date).toUTCString()
    });
});
