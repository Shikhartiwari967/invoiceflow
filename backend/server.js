const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");






const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/invoices", require("./routes/invoiceRoutes"));
app.get("/api/protected", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed successfully",
    user: req.user,
  });
});

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "InvoiceFlow API is running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});