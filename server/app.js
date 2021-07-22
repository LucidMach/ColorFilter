const { spawn } = require("child_process");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8000;

// middlewares
app.use(cors());
app.use(bodyParser.json({ limit: "5mb" }));

// home route
app.get("/", (req, res) => {
  // for extracting data from the callback inside py.stdout.on() in line 15
  var data2send;

  // creating a python child process
  const py = spawn("python", ["color-filter.py", "After Hours", "Hope"]);

  // when python prints data onto the console
  py.stdout.on("data", function (data) {
    console.log("Pipe Data From Python");
    data2send = data.toString();
  });

  // when the python process ends
  py.on("close", (code) => {
    console.log(code);
    res.send(data2send);
  });
});

app.post("/filter", (req, res) => {
  const body = req.body;
  // console.log(body.image);
  res.json({ STATUS: "SUCCESS" });
});

app.listen(port, () => console.log("..."));
