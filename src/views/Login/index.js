import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState({ bool: false, message: "" });

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      let fetchLogin = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });

      let jsonFetchLogin = await fetchLogin.json();
      let status = jsonFetchLogin.status;

      if (status === 200) {
        localStorage.setItem("token", jsonFetchLogin.data[0]);
        navigate("/dashboard");
      } else {
        setError({ bool: true, message: jsonFetchLogin.message });
        setLogin({ email: "", password: "" });
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde" + error);
    }
  };

  const handleChangeInputString = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-12 col-md-2 col-lg-4"></div>
        <div className="col-12 col-md-8 col-lg-4">
          {error.bool === true && (
            <div
              class="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              {error.message}
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}
          <h2 className="text-center">Imperium S.A.C</h2>
          <form method="POST" onSubmit={handleSubmitForm}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email :
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Ingresa tu email"
                name="email"
                onChange={handleChangeInputString}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password :
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Ingresa tu contraseña"
                name="password"
                onChange={handleChangeInputString}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Iniciar Sesión
            </button>
          </form>
        </div>
        <div className="col-12 col-md-2 col-lg-4"></div>
      </div>
    </div>
  );
};
