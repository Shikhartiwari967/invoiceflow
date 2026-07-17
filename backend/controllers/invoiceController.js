const Invoice = require("../models/Invoice");

// Create Invoice


const createInvoice = async (req, res) => {
  try {
    const {
      invoiceNumber,
      clientName,
      clientEmail,
      issueDate,
      dueDate,
      items,
      subtotal,
      tax,
      discount,
      total,
      notes,
    } = req.body;

    // Check if invoice number already exists
    const existingInvoice = await Invoice.findOne({ invoiceNumber });

    if (existingInvoice) {
      return res.status(400).json({
        success: false,
        message: "Invoice number already exists",
      });
    }

    const invoice = await Invoice.create({
      user: req.user.id,
      invoiceNumber,
      clientName,
      clientEmail,
      issueDate,
      dueDate,
      items,
      subtotal,
      tax,
      discount,
      total,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      data: invoice,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createInvoice,
};