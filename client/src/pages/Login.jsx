import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: login,
    onError: (error) => {
      toast.error(error.response?.data?.error || "Something went wrong!");
    },
    onSuccess: () => {
      setEmail("");
      setPassword("");
      toast.success("Login Success!");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      navigate("/files");
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
      loginMutation.mutate({
        email,
        password,
      });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      {loginMutation.isPending && <Loader />}
      <div className="card w-96 border-2 border-primary-content text-primary-content shadow-md">
        <div className="card-body">
          <h2 className="card-title text-center mt-4 "> Login</h2>
          <form className="" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered text-black "
                value={email}
                onChange={(e) => {
                  setErrors((errors) => ({
                    ...errors,
                    email: null,
                  }));
                  setEmail(e.target.value);
                }}
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
                onChange={(e) => {
                  setErrors((errors) => ({
                    ...errors,
                    password: null,
                  }));
                  setPassword(e.target.value);
                }}
              />

              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-neutral">
                Login
              </button>
            </div>
            <div className="mt-3">
              <button
                className="btn btn-link text-primary-content"
                onClick={() => navigate("/register")}
              >
                Sign up?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
