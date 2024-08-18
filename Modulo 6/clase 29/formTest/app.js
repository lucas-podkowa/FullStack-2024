const express = require("express");
const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static('public'));



app.post("/persona/guardar", function (req, res) {
  console.log(req.body);
  res.send("<html><body><h1>Datos almacenados<h1><p> req.body </p></body></html>"

  );
});


app.listen(3000, () => {
  console.debug("App escuchando puerto :3000");
});
