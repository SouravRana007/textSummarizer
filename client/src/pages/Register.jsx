import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import Loader from "../components/Loader";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: register,
    onError: (error) => {
      toast.error(error.response?.data?.error || "Something wnet wrong!");
    },
    onSuccess: () => {
      setName("");
      setEmail("");
      setPassword("");
      toast.success("Registration Success!");
      navigate("/login");
    },
  });

  const validate = () => {
    let formErrors = {};
    let valid = true;

    if (!email) {
      formErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email is invalid";
      valid = false;
    }

    if (!password) {
      formErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // Handle successful login
      console.log("Form is valid");
      registerMutation.mutate({ name, email, password });
    }
  };
  console.log("muattion: ", registerMutation.isPending);
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      {registerMutation.isPending && <Loader />}
      <div className="card w-96 border-2 border-primary-content shadow-md text-primary-content ">
        <div className="card-body">
          <h2 className="card-title text-center"> Register</h2>
          <form className="" onSubmit={handleSubmit}>
            <div className="form-control">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered text-black "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered text-black "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="input input-bordered text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-neutral">
                Sign up
              </button>
            </div>
            <div className="mt-3">
              Already have account?
              <button
                className="btn btn-link text-primary-content"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
