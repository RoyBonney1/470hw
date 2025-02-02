const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config(); // Load API key

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_NINJAS_KEY; // API key from .env

app.use(cors());
app.use(express.static("public")); // Serve frontend files

// ✅ Correct /quote route
app.get("/quote", async (req, res) => {
  try {
    const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
      headers: { "X-Api-Key": API_KEY },
    });
    res.json(response.data[0]); // API returns an array, send the first quote
  } catch (error) {
    console.error("Error fetching quote:", error);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
