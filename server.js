var express = require("express");
var path = require("path");
var fs = require("fs");
var app = express();
const db = require("./db/db.json");

var PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
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
  const userInput = fromUser.body;
  for (i = 0; i <= db.length; ++i) {
    userInput["id"] = i + 1;
  }
  db.push(userInput);
  fs.writeFile("db/db.json", JSON.stringify(db), (err) => {
    // Checking for errors
    if (err) throw err;

    console.log("Done writing");
    return res.json(userInput); // Success
  });
});

//delete------------------------------------------
//TODO;
app.post("/api/notes/:id", function (req, res) {
  var chosen = req.params.id;

  console.log(chosen);

  fs.readFile("/db/db.json", function (err, dataFromDB) {
    if (err) throw err;
    const resultsFromDB = JSON.parse(dataFromDB);
    console.log(resultsFromDB);
  });

  // var chosen = req.params.id;

  // console.log(chosen);

  // for (var i = 0; i < characters.length; i++) {
  //   if (chosen === characters[i].routeName) {
  //     return res.json(characters[i]);
  //   }
  // }

  // return res.json(false);
});
//----------------------------------------------------------
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
// const id = db[1].id;
// console.log(id);
