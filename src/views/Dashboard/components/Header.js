import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../../custom/decodeToken";

export const Header = () => {
  const [user, setUser] = useState({ id: 0, name: "", role: "" });
  const navigate = useNavigate();

  const handleClickLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    let decode = decodeToken();
    let token = localStorage.getItem("token");

    try {
      let fetchUserById = await fetch(
        `http://127.0.0.1:8000/api/users/${decode.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let jsonFetchUserById = await fetchUserById.json();
      let status = jsonFetchUserById.status;

      if (status == 200) {
        setUser(jsonFetchUserById.data);
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    }
  };

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <a href="index.html" className="logo d-flex align-items-center">
          <img src="/assets/img/logo.png" alt="" />
          <span className="d-none d-lg-block">Imperium SAC</span>
        </a>
        <i className="bi bi-list toggle-sidebar-btn"></i>
      </div>
      <div className="search-bar"></div>
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item d-block d-lg-none"></li>
          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <img
                src="/assets/img/profile-img.jpg"
                alt="Profile"
                className="rounded-circle"
              />
              <span className="d-none d-md-block dropdown-toggle ps-2">
                Usuario
              </span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>{user.name}</h6>
                <span>{user.role}</span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  onClick={handleClickLogout}
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Cerrar Sesión</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};
