const express = require("express");
const app = express();
const router = require("./routes/route");

// Middleware to parse JSON bodies
app.use(express.json());

// Mount routes
app.use("/api", router);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
