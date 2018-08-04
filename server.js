var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var reservations = [
  {
    routeName: "hakefamily",
    name: "Hake Family",
    phoneNumber: "555-692-4372",
    email: "fake-email@gmail.com"
  },
  {
    routeName: "gigantifamily",
    name: "Giganti Family",
    phoneNumber: "555-495-7393",
    email: "fake-email@hotmail.com"
  },
  {
    routeName: "thomsonfamily",
    name: "Thomson Family",
    phoneNumber: "555-321-9876",
    email: "fake-email@yahoo.com"
  }
];

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
  });

app.get("/api/reservations", function(req, res) {
  return res.json(reservations);
});

app.get("/api/characters/:reservation", function(req, res) {
  var chosen = req.params.reservation;

  console.log(chosen);

  for (var i = 0; i < reservations.length; i++) {
    if (chosen === reservations[i].routeName) {
      return res.json(reservations[i]);
    }
  }

  return res.json(false);
});

app.post("/api/reservations", function(req, res) {
  
  var newReservation = req.body;

  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);

  characters.push(newReservation);

  res.json(newReservation);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
