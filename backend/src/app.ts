import express from "express";
import cors from "cors";
import Routes from "./Routes/Routes";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

Routes.forEach((route) => {
  app.use(route.path, route.router);
  console.log(`Added route for path ${route.path}`);
});

app.listen(50000);
