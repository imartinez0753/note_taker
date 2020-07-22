var express = require("express");
var path = require("path");
var fs = require("fs");
var app = express();

var PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//gets
//----------------------------------------------------------
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/../public/index.html"));
});
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/../public/notes.html"));
});
// api
//------------------------------------------------------------
app.get("/api/notes", function (req, res) {
  fs.readFile("db.json", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    console.log(data);
    return res.json(data);
  });
  //   return res.readFile(path("db.json"));
  // return res.json(db.json);
  //   return res.fs.readFile("db.json", "utf8");
});
//post
//-------------------------------------------
app.post("/api/notes", function (req, res) {
  var newEntry = req.body;
  // const usersInput = require("./db.json");

  // usersInput.push(newEntry);

  fs.appendFile("db.json", JSON.stringify(newEntry), function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Commit logged!");
      return res.json(newEntry);
    }
  });
});

//delete
//-----------------------------------------------------
app.post("/api/delete", function (req, res) {
  tables.length = 0;
  waitList.length = 0;
  res.json({ ok: true });
});
//----------------------------------------------------------
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
