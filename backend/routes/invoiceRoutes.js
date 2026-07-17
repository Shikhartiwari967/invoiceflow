const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
} = require("../controllers/invoiceController");

// Create Invoice
router.post("/", protect, createInvoice);

// Get All Invoices
router.get("/", protect, getInvoices);

//Get single invoice by ID
router.get("/:id", protect, getInvoiceById);

//Update invoice by ID
router.put("/:id",protect,updateInvoice);

//Delete invoice by ID
router.delete("/:id", protect, deleteInvoice);

module.exports = router;