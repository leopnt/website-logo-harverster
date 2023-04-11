const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ogs = require("open-graph-scraper");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/logo", async (req, res) => {
  const { url } = req.query;
  try {
    const options = { url: url };
    const data = await ogs(options);
    const { ogImage } = data.result;

    if (!ogImage) {
      res.status(417).send("No image in OpenGraph data for this website");
      return;
    }

    if (!data.result.success) {
      res.send(data.result.error.toString());
      return;
    }

    res.send(ogImage.url);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.result.error.toString());
  }
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
