import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userscontroller from "./controllers/userscontroller.js";
import errorController from "./controllers/errorController.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/login", userscontroller.login);
app.use(errorController.error404);

app.listen(port, () => {
  console.log(`La api está funcionando en http://localhost:${port}`);
});