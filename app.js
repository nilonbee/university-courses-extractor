const express = require("express");
const app = express();
const mainRouter = require("./routes/routes");
const notFound = require("./middlewares/notFound");

const port = 4001;
//middlewares
app.use(express.json());
app.use("/api/v1", mainRouter);
app.use(notFound);

app.listen(port, () => {
  console.log("server is running on port 4001");
});
