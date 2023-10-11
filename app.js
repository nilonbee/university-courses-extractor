const express = require("express");
const app = express();
const mainRouter = require("./routes/routes");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const notFound = require("./middlewares/notFound");

const port = 4001;
//middlewares
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(cors());
app.use("/api/v1", mainRouter);
app.use(notFound);

app.listen(port, () => {
  console.log("server is running on port 4001");
});
