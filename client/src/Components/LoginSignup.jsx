import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [pageName, setPageName] = useState("Login");
  const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();
  if (pageName === "Login") {
    navigate("/viewtickets");
  } else if (pageName === "Sign up") {
    setPageName("Login");
  }
};



  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      }}
    >
      <div
        className={`card shadow-lg p-2 rounded-4 ${
          pageName === "Sign up" ? "col-md-6" : "col-md-4"
        }`}
        style={{ maxWidth: "450px", backgroundColor: "#fff" }}
      >
        <h2 className="text-center mb-4 text-primary fw-bold">{pageName}</h2>

        <form className="row g-3" onSubmit={handleSubmit}>
          {pageName === "Sign up" && (
            <div className="col-md-12">
              <label htmlFor="Name" className="form-label fw-semibold">
                Name
              </label>
              <input
                type="text"
                className="form-control rounded-3"
                id="Name"
                required
              />
            </div>
          )}

          {/* {pageName === "Sign up" && (
            <div className="col-md-4">
              <label htmlFor="Id" className="form-label fw-semibold">
                Employee Id
              </label>
              <input
                type="text"
                className="form-control rounded-3"
                id="Id"
                required
              />
            </div>
          )} */}

          <div
            className={`col-md-${pageName === "Sign up" ? "12" : "12"}`}
          >
            <label htmlFor="Email" className="form-label fw-semibold">
              Email Id
            </label>
            <input
              type="email"
              className="form-control rounded-3"
              id="Email"
              required
            />
          </div>

          <div
            className={`col-md-${pageName === "Sign up" ? "6" : "12"}`}
          >
            <label htmlFor="Password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-3"
              id="Password"
              required
            />
          </div>

          {pageName === "Sign up" && (
            <div className="col-md-6">
              <label
                htmlFor="Confirm-Password"
                className="form-label fw-semibold"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control rounded-3"
                id="Confirm-Password"
                required
              />
            </div>
          )}

          <div className="col-md-12">
            <button
              type="submit"
              className="btn btn-primary w-100 rounded-3 fw-semibold"
            >
              {pageName === "Sign up" ? "Register" : "Login"}
            </button>
          </div>
        </form>

        <div className="col-md-12 text-center mt-3">
          <p className="d-inline text-muted">
            {pageName === "Sign up"
              ? "Already registered?"
              : "New employee?"}
          </p>
          {pageName === "Sign up" ? (
            <button
              type="button"
              onClick={() => setPageName("Login")}
              className="btn btn-link fw-semibold"
            >
              Go to Login
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setPageName("Sign up")}
              className="btn btn-link fw-semibold"
            >
              Go to Sign up
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
