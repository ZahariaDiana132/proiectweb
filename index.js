const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuidv1 = require('uuid/v1');

const fs = require("fs");

// Aplicatia
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());


// Link SPA static files 
app.use("/", express.static('frontend'));


// Create
app.post("/poezii", (req, res) => {
  const poeziiList = readJSONFile();
  const Newpoezie = req.body;
  Newpoezie.id = uuidv1();
  const NewpoezieList = [...poeziiList, Newpoezie];
  writeJSONFile(NewpoezieList);
  res.json(Newpoezie);
});

// Read One
app.get("/poezii/:id", (req, res) => {
  const poeziiList = readJSONFile();
  const id = req.params.id;
  let idFound = false;
  let foundArticle;

  poeziiList.forEach(poezie => {
    if (id==poezie.id) {
      idFound = true;
      foundArticle = poezie
    }
  });

  if (idFound) {
    res.json(foundArticle);
  } else {
    res.status(404).send(`poezie ${id} was not found`);
  }
});

// Read All
app.get("/poezii", (req, res) => {
  const poeziiList = readJSONFile();
  res.json(poeziiList);
});

// Update
app.put("/poezii/:id", (req, res) => {
  const poeziiList = readJSONFile();
  const id = req.params.id;
  const Newpoezie = req.body;
  Newpoezie.id = id;
  idFound = false;

  const NewpoeziiList = poeziiList.map((poezie) => {
     if (poezie.id==id) {
       idFound = true;
       return Newpoezie
     }
    return poezie
  })
  
  writeJSONFile(NewpoeziiList);

  if (idFound) {
    res.json(Newpoezie);
  } else {
    res.status(404).send(`poezie ${id} was not found`);
  }

});

// Delete
app.delete("/poezii/:id", (req, res) => {
  const poeziiList = readJSONFile();
  const id = req.params.id;
  const NewpoeziiList = poeziiList.filter((poezie) => poezie.id !== id)

  if (poeziiList.length !== NewpoeziiList.length) {
    res.status(200).send(`poezie ${id} was removed`);
    writeJSONFile(NewpoeziiList);
  } else {
    res.status(404).send(`poezie ${id} was not found`);
  }
});

// Functia de citire din fisierul db.json
function readJSONFile() {
  return JSON.parse(fs.readFileSync("db.json"))["poezii"];
}

// Functia de scriere in fisierul db.json
function writeJSONFile(content) {
  fs.writeFileSync(
    "db.json",
    JSON.stringify({ poezii: content }),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

// Pornim server-ul
app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);