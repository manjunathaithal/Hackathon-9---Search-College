const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const { collegeModel } = require("./connector");
// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connections } = require("mongoose");

app.get("/findColleges", async (req, res) => {
  try {
    const data = await collegeModel.find();
    res.log(data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
