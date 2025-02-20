import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../api/api";
import { useAuth } from "../Context/ContextProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-[60vh] p-5">
      <div className="bg-slate-200 p-10">
        <h2 className="text-3xl text-violet-400 font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          {["Email", "Password"].map((field) => (
            <div key={field} className="mb-3">
              <label>{field}</label>
              <input
                type={field.toLowerCase()}
                className="w-full border-0 outline-none p-1"
                value={field === "Email" ? email : password}
                onChange={(e) =>
                  field === "Email"
                    ? setEmail(e.target.value)
                    : setPassword(e.target.value)
                }
                required
              />
            </div>
          ))}
          <button className="bg-violet-500 text-white w-full mt-5 p-3">
            Login
          </button>
          <Link
            to="/signup"
            className="text-violet-400 text-sm float-right mt-4"
          >
            Go to Signup
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
