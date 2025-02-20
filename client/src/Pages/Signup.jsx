import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signupUser } from "../api/api";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signupUser({ name, email, password });
      if (response.data.success) {
        toast.success("User created successfully");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-[70vh] p-5">
      <div className="bg-slate-200 p-10">
        <h2 className="text-3xl text-violet-400 font-bold mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          {["Name", "Email", "Password"].map((field) => (
            <div key={field} className="mb-3">
              <label>{field}</label>
              <input
                type={field.toLowerCase()}
                className="w-full border-0 outline-none p-1"
                value={
                  field === "Name" ? name : field === "Email" ? email : password
                }
                onChange={(e) =>
                  field === "Name"
                    ? setName(e.target.value)
                    : field === "Email"
                    ? setEmail(e.target.value)
                    : setPassword(e.target.value)
                }
                required
              />
            </div>
          ))}
          <button className="bg-violet-500 text-white w-full mt-5 p-3">
            Signup
          </button>
          <Link
            to="/login"
            className="text-violet-400 text-sm float-right mt-4"
          >
            Go to Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
