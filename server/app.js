const fs = require("fs");
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
  res.json({
    desc: "An node API for a numpy base color filter tool ",
  });
});

app.post("/filter", (req, res) => {
  // Extracting Image from Client
  const body = req.body;
  // Removing Header from base64 string [header,image] = base64 image
  const base64Image = req.body.image.split(";base64,").pop();
  // Saving Image to Disk
  fs.writeFileSync("input/image.png", base64Image, { encoding: "base64" });

  // for extracting data from the callback inside py.stdout.on() in line 15
  var data2send;

  // creating a python child process
  const py = spawn("python", ["color-filter.py", body.color]);

  // when python prints data onto the console
  py.stdout.on("data", function (data) {
    console.log("Pipe Data From Python");
    data2send = data.toString();
  });

  // when the python child process ends
  py.on("close", (code) => {
    // Adding Heading and converting image to base64
    const image = `data:image/png;base64,${fs.readFileSync(
      "./output/image.png",
      {
        encoding: "base64",
      }
    )}`;

    // sending image to client
    res.json({ image });
  });
});

app.listen(port, () => console.log("..."));
