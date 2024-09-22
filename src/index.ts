import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { environment } from "./config/dotenvConfig";
import routes from "./routes";
import { HandlingError } from "./utils/HandlingError";

const app = express();
const port = environment.PORT || 8000;
dotenv.config();
app.use(cors());
app.use((req, res, next) => {
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    express.json()(req, res, next);
  } else {
    next();
  }
});
app.use(cookieParser());
// app.use(bodyParser.json())
// app.use(express.json());
app.use(routes);
app.use(HandlingError);

app.listen(port, () => {
  console.log(`Server running on port localhost:${port}🚀`);
});

export default app;
