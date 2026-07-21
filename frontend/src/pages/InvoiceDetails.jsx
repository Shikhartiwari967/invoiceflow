import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const InvoiceDetails = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await api.get(`/invoices/${id}`);
        setInvoice(response.data.data);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  if (loading) {
    return <div className="bg-white rounded-xl shadow p-10 text-center">Loading...</div>;
  }

  if (!invoice) {
    return <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">Invoice not found.</div>;
  }

  return (
  <div className="min-h-screen bg-gray-100 py-10 px-4">
    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <div className="bg-white rounded-xl shadow p-8 mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold">
            Invoice Details
          </h1>

          <p className="text-gray-500 mt-2">
            {invoice.invoiceNumber}
          </p>
        </div>

        <span
          className={`px-5 py-2 rounded-full text-white font-semibold ${
            invoice.status === "Paid"
              ? "bg-green-500"
              : invoice.status === "Pending"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        >
          {invoice.status}
        </span>
      </div>

      {/* Client Information */}
      <div className="bg-white rounded-xl shadow p-8 mb-6">
        <h2 className="text-2xl font-bold mb-5">
          Client Information
        </h2>

 <div className="grid grid-cols-2 gap-6">

  <div>
    <p className="text-gray-500 text-sm">Client Name</p>
    <p className="font-semibold text-lg">
      {invoice.clientName}
    </p>
  </div>

  <div>
    <p className="text-gray-500 text-sm">Email</p>
    <p className="font-semibold text-lg">
      {invoice.clientEmail}
    </p>
  </div>

  <div>
    <p className="text-gray-500 text-sm">Issue Date</p>
    <p className="font-semibold">
      {invoice.issueDate?.slice(0,10)}
    </p>
  </div>

  <div>
    <p className="text-gray-500 text-sm">Due Date</p>
    <p className="font-semibold">
      {invoice.dueDate?.slice(0,10)}
    </p>
  </div>

</div>
      </div>

      {/* Invoice Items */}
      <div className="bg-white rounded-xl shadow p-8 mb-6">
        <h2 className="text-2xl font-bold mb-5">
          Invoice Items
        </h2>

      <div className="overflow-x-auto">
  <table className="w-full border-collapse">

    <thead>
      <tr className="bg-blue-50 text-blue-700">

        <th className="text-left p-4">
          Description
        </th>

        <th className="text-center p-4">
          Qty
        </th>

        <th className="text-center p-4">
          Price
        </th>

        <th className="text-right p-4">
          Total
        </th>

      </tr>
    </thead>

    <tbody>

      {invoice.items.map((item, index) => (

        <tr
          key={index}
          className="border-b"
        >

          <td className="p-4">
            {item.description}
          </td>

          <td className="text-center">
            {item.quantity}
          </td>

          <td className="text-center">
            ₹{item.price}
          </td>

          <td className="text-right font-semibold pr-4">
            ₹{item.quantity * item.price}
          </td>

        </tr>

      ))}

    </tbody>

  </table>
</div> 
        </div>
      </div>

      {/* Summary */}
  <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">

  <h2 className="text-2xl font-bold mb-6 text-blue-700">
    Invoice Summary
  </h2>

  <div className="space-y-4">

    <div className="flex justify-between text-lg">
      <span className="text-gray-600">Subtotal</span>
      <span className="font-semibold">
        {formatCurrency(invoice.subtotal)}
      </span>
    </div>

    <div className="flex justify-between text-lg">
      <span className="text-gray-600">Tax</span>
      <span className="font-semibold">
      {formatCurrency(invoice.tax)}
      </span>
    </div>

    <div className="flex justify-between text-lg">
      <span className="text-gray-600">Discount</span>
      <span className="font-semibold text-red-500">
        {formatCurrency(invoice.discount)}
      </span>
    </div>

    <hr className="my-4" />

    <div className="flex justify-between items-center">

      <span className="text-3xl font-bold">
        Grand Total
      </span>

      <span className="text-4xl font-bold text-blue-700">
       {formatCurrency(invoice.total)}
      </span>

    </div>

  </div>

</div>

    </div>
);
};

export default InvoiceDetails;