import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await api.post("/auth/register", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    console.log(response.data);
    alert("Registration Successful!");
  } catch (error) {
    console.error(error.response?.data || error.message);
    alert(error.response?.data?.message || "Registration Failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          InvoiceFlow
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Create your account
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border rounded-lg px-4 py-3 pr-16 outline-none focus:ring-2 focus:ring-blue-500"
            />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:text-blue-800"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

         {/* Confirm Password */}
    <div>
     <label className="block text-sm font-medium mb-2">
    Confirm Password
  </label>

  <div className="relative">
    <input
  type={showConfirmPassword ? "text" : "password"}
  name="confirmPassword"
  value={formData.confirmPassword}
  onChange={handleChange}
  placeholder="Confirm your password"
  className="w-full border rounded-lg px-4 py-3 pr-16 outline-none focus:ring-2 focus:ring-blue-500"
/>

    <button
      type="button"
      onClick={() =>
        setShowConfirmPassword(!showConfirmPassword)
      }
      className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:text-blue-800"
    >
      {showConfirmPassword ? "Hide" : "Show"}
    </button>
  </div>
</div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;