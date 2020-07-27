var express = require("express");
var path = require("path");
var fs = require("fs");
var app = express();
const db = require("./db/db.json");
var idCount = null;
var idFinder = null;
var PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

if (db.length === 0) {
  idCount = 0;
} else {
  idFinder = db.length - 1;
  idCount = db[idFinder].id;
}

//gets
//----------------------------------------------------------
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
// api
//------------------------------------------------------------
app.get("/api/notes", function (req, resultToUser) {
  fs.readFile("db/db.json", function (err, dataFromDB) {
    if (err) throw err;
    const resultsFromDB = JSON.parse(dataFromDB);
    // console.log(resultsFromDB);
    return resultToUser.json(resultsFromDB);
  });
});
//post
//-------------------------------------------
app.post("/api/notes", function (fromUser, res) {
  idCount++;
  const userInput = fromUser.body;
  userInput["id"] = idCount;
  db.push(userInput);
  fs.writeFile("db/db.json", JSON.stringify(db), (err) => {
    // Checking for errors
    if (err) throw err;

    // console.log("Done writing");
    return res.json(userInput); // Success
  });
});

//delete------------------------------------------

app.post("/api/notes/:id", function (req, res) {
  var chosen = parseInt(req.params.id);
  console.log(chosen);
  for (i = 0; i < db.length; i++) {
    if (chosen === db[i].id) {
      console.log(db[i]);
      result = db.splice([i], 1);
      // console.log(result);
      console.log(db);
      // return res.json(false);
      fs.writeFile("db/db.json", JSON.stringify(db), (err) => {
        // Checking for errors
        if (err) throw err;

        // console.log("Done writing");
        return res.json(db); // Success
      });
    }
  }
});
//----------------------------------------------------------
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
// const id = db[1].id;
// console.log(id);
