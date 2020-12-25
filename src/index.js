const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const { connection } = require("./connector");
// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connections } = require("mongoose");

app.get("/findColleges", async (req, res) => {
  let data;
  const name = req.query.name === undefined ? "" : req.query.name;
  const state = req.query.state === undefined ? "" : req.query.state;
  const city = req.query.city === undefined ? "" : req.query.city;
  const minPackage = Number(
    req.query.minPackage === undefined
      ? 10.5
      : isNaN(req.query.minPackage)
      ? 10.5
      : req.query.minPackage
  );
  const maxFees =
    req.query.maxFees === undefined
      ? Number(10)
      : isNaN(req.query.maxFees)
      ? Number(10)
      : Number(req.query.maxFees);
  const course = req.query.course === undefined ? "" : req.query.course;
  const exam = req.query.exam === undefined ? "" : req.query.exam;
  console.log(Object.keys(req.query).length);
  if (Object.keys(req.query).length !== 0) {
    data = await connection.find({
      name: { $regex: `${name}`, $options: "i" },
      state: { $regex: `${state}`, $options: "i" },
      city: { $regex: `${city}`, $options: "i" },
      minPackage: { $gte: `${minPackage}` },
      maxFees: { $lte: `${maxFees}` },
      course: { $regex: `${course}`, $options: "i" },
      exam: { $regex: `${exam}`, $options: "i" },
    });
    console.log("if");
  } else {
    data = await connection.find();
  }
  res.send(data);
  //   console.log("hwllo");
  // } else {
  //   data = await connection.find();
  // }
  // res.send(data);
  // console.log(data);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
