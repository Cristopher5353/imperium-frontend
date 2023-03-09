import React from "react";
import { NavLink } from "react-router-dom";
import { decodeToken } from "../../../custom/decodeToken";

export const Aside = () => {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <NavLink to="/dashboard" className="nav-link active">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link collapsed" href="users-profile.html">
            <i className="bi bi-person"></i>
            <span>Listado Usuarios</span>
          </a>
        </li> */}
        <li className="nav-item">
          {decodeToken().role === 1 && (
            <NavLink to="prioridades" className="nav-link collapsed">
              <i className="bi bi-person"></i>
              <span>Listar Prioridades</span>
            </NavLink>
          )}
        </li>
        <li className="nav-item">
          {decodeToken().role === 1 && (
            <NavLink to="categorías" className="nav-link collapsed">
              <i className="bi bi-person"></i>
              <span>Listar Categorías</span>
            </NavLink>
          )}
        </li>
        <li className="nav-item">
          {decodeToken().role === 1 && (
            <NavLink to="subcategorías" className="nav-link collapsed">
              <i className="bi bi-person"></i>
              <span>Listar Subcategorias</span>
            </NavLink>
          )}
        </li>
        <li className="nav-item">
          {(decodeToken().role === 1 || decodeToken().role === 2) && (
            <NavLink to="incidencias" className="nav-link collapsed">
              <i className="bi bi-person"></i>
              <span>
                {decodeToken().role == 1
                  ? "Listar Incidencias"
                  : "Incidencias Asignadas"}
              </span>
            </NavLink>
          )}
        </li>
        <li className="nav-item">
          {decodeToken().role === 1 && (
            <NavLink to="incidencias/registrar" className="nav-link collapsed">
              <i className="bi bi-person"></i>
              <span>Crear Incidencias</span>
            </NavLink>
          )}
        </li>
      </ul>
    </aside>
  );
};
