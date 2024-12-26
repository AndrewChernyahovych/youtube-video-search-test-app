const express = require("express");
const app = express();
const PORT = 9000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
