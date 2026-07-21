import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await api.get("/invoices");
        console.log(response.data);
        setInvoices(response.data.data || []);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }finally {
      setLoading(false);
    }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          InvoiceFlow
        </h1>

        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">
            My Invoices
          </h2>

          <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          onClick={() => navigate("/create-invoice")}
          >
            + New Invoice
          </button>
        </div>

  {loading ? (
    <div className="bg-white rounded-xl shadow p-10 text-center">
      Loading...
    </div>
  ) : invoices.length === 0 ? (
    <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
      No invoices found.
    </div>
  ) : (
    <div className="space-y-4">
      {invoices.map((invoice) => (
    <div
        key={invoice._id}
        onClick={() => navigate(`/invoice/${invoice._id}`)}
        className="bg-white shadow rounded-lg p-4 cursor-pointer hover:shadow-xl transition"
    >
          <h3 className="text-xl font-semibold">
            {invoice.clientName}
          </h3>

          <p>Total: ₹{invoice.total}</p>

          <p>Status: {invoice.status}</p>
        </div>
      ))}
    </div>
  )}
        </div>
      </div>
    );
  };

export default Dashboard;