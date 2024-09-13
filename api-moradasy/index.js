import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
  try {
    const data = fs.readFileSync("./db.json");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync("./db.json", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  res.send("primera api de moradasy");
});

app.get("/camisetas", (req, res) => {
  const data = readData();
  res.json(data.camisetas);
});

app.get("/camisetas/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const camiseta = data.camisetas.find((camiseta) => camiseta.id === id);
  res.json(camiseta);
});

app.post("/camisetas", (req, res) => {
  const data = readData();
  const body = req.body;
  const newCamiseta = {
    id: data.camisetas.length + 1,
    ...body,
  };
  data.camisetas.push(newCamiseta);
  writeData(data);
  res.json(newCamiseta);
});

app.put("/camisetas/:id", (req, res) => {
  const data = readData();
  const body = req.body;
  const id = parseInt(req.params.id);
  const camisetaIndex = data.camisetas.findIndex((camiseta) => camiseta.id === id);
  data.camisetas[camisetaIndex] = {
    ...data.camisetas[camisetaIndex],
    ...body,
  };
  writeData(data);
  res.json({ message: "Camiseta actualizada correctamente" });
});

app.delete("/camisetas/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const camisetaIndex = data.camisetas.findIndex((camiseta) => camiseta.id === id);
  data.camisetas.splice(camisetaIndex, 1);
  writeData(data);
  res.json({ message: "Camiseta borrada correctamente" });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
