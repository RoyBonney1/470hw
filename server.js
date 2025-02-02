const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_NINJAS_KEY;

// ✅ Serve static files from "public"
app.use(express.static("public"));

// ✅ API Route to fetch a quote
app.get("/quote", async (req, res) => {
  try {
    const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
      headers: { "X-Api-Key": API_KEY },
    });
    res.json(response.data[0]);
  } catch (error) {
    console.error("Error fetching quote:", error);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
});

// ✅ Serve index.html for all other routes (important for frontend)
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
