import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CreateInvoice = () => {
  const navigate = useNavigate();

const [formData, setFormData] = useState({
  clientName: "",
  clientEmail: "",
  issueDate: "",
  dueDate: "",
  items: [
    {
    description: "",
    quantity: 1,
    price: 0,
    },
  ],
  tax: 0,
  discount: 0,
  notes: "",
});
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleItemChange = (index, e) => {
  const updatedItems = [...formData.items];

  updatedItems[index][e.target.name] = e.target.value;

  setFormData({
    ...formData,
    items: updatedItems,
  });
};
const addItem = () => {
  setFormData({
    ...formData,
    items: [
      ...formData.items,
      {
        description: "",
        quantity: 1,
        price: 0,
      },
    ],
  });
};
const removeItem = (index) => {
if (formData.items.length === 1) {
    return;
}

const updatedItems = formData.items.filter((_, i) => i !== index);

  setFormData({
    ...formData,
    items: updatedItems,
  });
};

const subtotal = formData.items.reduce((sum, item) => {
  return sum + Number(item.quantity) * Number(item.price);
}, 0);
const grandTotal =
  subtotal +
  Number(formData.tax || 0) -
  Number(formData.discount || 0);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.clientName.trim()) {
  alert("Client name is required");
  return;
}

if (!formData.clientEmail.trim()) {
  alert("Client email is required");
  return;
}

if (!formData.issueDate) {
  alert("Issue date is required");
  return;
}

if (!formData.dueDate) {
  alert("Due date is required");
  return;
}

const hasInvalidItem = formData.items.some(
  (item) =>
    !item.description.trim() ||
    Number(item.quantity) <= 0 ||
    Number(item.price) < 0
);

if (hasInvalidItem) {
  alert("Please complete all invoice items.");
  return;
}

  try {
    const invoiceData = {
      ...formData,
      subtotal,
      total: grandTotal,
    };

    await api.post("/invoices", invoiceData);

    alert("Invoice created successfully!");

    navigate("/dashboard");
  } catch (error) {
    console.error(error.response?.data || error.message);

    alert(error.response?.data?.message || "Failed to create invoice");
  }
};

  return (
  
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
      <h2 className="text-3xl font-bold text-center mb-6">
        Create Invoice
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2 font-medium">
            Client Name
          </label>

          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            placeholder="Enter client name"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
           <label className="block mb-2 font-medium">
            Client Email
           </label>

            <input
            type="email"
            name="clientEmail"
            value={formData.clientEmail}
            onChange={handleChange}
            placeholder="Enter client email"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div>
           <label className="block mb-2 font-medium">
           Issue Date
           </label>

           <input
           type="date"
           name="issueDate"
           value={formData.issueDate}
           onChange={handleChange}
           className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
           />
        </div>
        <div>
            <label className="block mb-2 font-medium">
             Due Date
            </label>

                <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        {/* <div>
          <label className="block mb-2 font-medium">
            Amount
          </label>

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}


    
    <h3 className="text-xl font-semibold mb-4">Invoice Items</h3>

        {formData.items.map((item, index) => (
    <div
        key={index}
        className="space-y-4 border rounded-lg p-4 mb-4"
    >
        <div>
        <label className="block mb-2 font-medium">
            Description
        </label>

        <input
            type="text"
            name="description"
            value={item.description}
            onChange={(e) => handleItemChange(index, e)}
            placeholder="Enter item description"
            className="w-full border rounded-lg px-4 py-3"
        />
        </div>

        <div className="grid grid-cols-2 gap-4">
        <div>
            <label className="block mb-2 font-medium">
            Quantity
            </label>

            <input
            type="number"
            name="quantity"
            min="1"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, e)}
            className="w-full border rounded-lg px-4 py-3"
            />
        </div>

        <div>
            <label className="block mb-2 font-medium">
            Price
            </label>

            <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            value={item.price}
            onChange={(e) => handleItemChange(index, e)}
            className="w-full border rounded-lg px-4 py-3"
            />
        </div>
        <p className="mt-3 font-semibold text-right">
        Item Total: ₹{item.quantity * item.price}
        </p>
        

        
        <div className="flex justify-end mt-3">
        <button
            type="button"
            onClick={() => removeItem(index)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
            Remove Item
        </button>
        </div>
        </div>
 </div>
))}
    <div className="mt-4">
    <button
        type="button"
        onClick={addItem}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
    >
        + Add Item
    </button>
    </div>

<div className="bg-gray-100 rounded-lg p-4 mt-5">
  <h3 className="text-xl font-semibold">
    Subtotal: ₹{subtotal}
  </h3>
</div>
    <div className="mt-4">
        <label className="block mb-2 font-medium">
            Tax (₹)
        </label>

        <input
            type="number"
            name="tax"
            min="0"
            value={formData.tax}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>
        <div className="bg-gray-100 rounded-lg p-4 mt-5">

        <div className="mt-4">
        <label className="block mb-2 font-medium">
            Discount (₹)
        </label>

        <input
            type="number"
            name="discount"
            min="0"
            value={formData.discount}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>

    

    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-5">
    <h2 className="text-2xl font-bold text-blue-700">
        Grand Total: ₹{grandTotal}
    </h2>
    </div>

    <div>
      <label className="block mb-2 font-medium">
        Notes
      </label>

      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        rows="4"
        placeholder="Additional notes (optional)"
        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />
    </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
        >
          Create Invoice
        </button>
      </form>
    </div>
  </div>
  
);
  
};

export default CreateInvoice;