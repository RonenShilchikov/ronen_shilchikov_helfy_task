
const express = require("express");
const cors = require("cors");
const tasksRouter = require("./routes/tasks");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/api/tasks", tasksRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
