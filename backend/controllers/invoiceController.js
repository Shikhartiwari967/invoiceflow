const Invoice = require("../models/Invoice");

// Create Invoice


const createInvoice = async (req, res) => {
  try {
    const {
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

// Generate Invoice Number
const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });

let invoiceNumber = "INV-1001";

if (lastInvoice && lastInvoice.invoiceNumber) {
  const lastNumber = parseInt(lastInvoice.invoiceNumber.split("-")[1]);

  invoiceNumber = `INV-${lastNumber + 1}`;


    // Check if invoice number already exists
    const existingInvoice = await Invoice.findOne({ invoiceNumber });

    if (existingInvoice) {
      return res.status(400).json({
        success: false,
        message: "Invoice number already exists",
      });
    }
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


// Get All Invoices


const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: invoices.length,
      data: invoices,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// Get Single Invoice


const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
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



// Update Invoice


const updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
      data: updatedInvoice,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// Delete Invoice


const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    await invoice.deleteOne();

    res.status(200).json({
      success: true,
      message: "Invoice deleted successfully",
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
getInvoices,
getInvoiceById,
updateInvoice,
deleteInvoice,
};