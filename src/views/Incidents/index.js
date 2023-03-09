import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FormFilterIncidents } from "./components/FormFilterIncidents";
import { TableIncidents } from "./components/TableIncidents";
import { ModalSupportAssign } from "./components/ModalSupportAssign";
import Swal from "sweetalert2";
import { decodeToken } from "../../custom/decodeToken";

export const Incidence = () => {
  const [incidents, setIncidents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priotiries, setPriorities] = useState([]);
  const [supportUsers, setSupportUsers] = useState([]);
  const [filter, setFilter] = useState({ category: "0", priority: "0" });

  const getIncidents = async () => {
    let token = localStorage.getItem("token");

    let url = `http://127.0.0.1:8000/api/incidents`;

    if(decodeToken().role === 2) {
      url = `http://127.0.0.1:8000/api/incidents/users/${decodeToken().id}`;
    } 

    try {
      let fetchIncidents = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      let jsonFetchIncidents = await fetchIncidents.json();
      let status = jsonFetchIncidents.status;

      if (status === 200) {
        setIncidents(jsonFetchIncidents.data);
        document.querySelector(".table-class").style.opacity = 1;
        document.querySelector(".loader").style.display = "none";
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde" + error);
    }
  };

  const getCategories = async () => {
    let token = localStorage.getItem("token");

    try {
      let fetchCategories = await fetch(
        `http://127.0.0.1:8000/api/categories`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let jsonFetchCategories = await fetchCategories.json();
      let status = jsonFetchCategories.status;

      if (status === 200) {
        setCategories(jsonFetchCategories.data);
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    }
  };

  const getPriorities = async () => {
    let token = localStorage.getItem("token");

    try {
      let fetchPriorities = await fetch(
        `http://127.0.0.1:8000/api/priorities`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let jsonFetchPriorities = await fetchPriorities.json();
      let status = jsonFetchPriorities.status;

      if (status === 200) {
        setPriorities(jsonFetchPriorities.data);
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    }
  };

  const handleChangeInput = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSubmitFilter = async (e) => {
    e.preventDefault();

    let token = localStorage.getItem("token");
    let url = `http://127.0.0.1:8000/api/incidents/category/0/priority/0/user/0`;

    if(decodeToken().role === 1) {
      url = `http://127.0.0.1:8000/api/incidents/category/${filter.category}/priority/${filter.priority}/user/0`;
    } else {
      url = `http://127.0.0.1:8000/api/incidents/category/${filter.category}/priority/${filter.priority}/user/${decodeToken().id}`;
    }

    try {
      let fetchFilter = await fetch(
        url,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let jsonFetchFilter = await fetchFilter.json();
      let status = jsonFetchFilter.status;

      if (status === 200) {
        setIncidents(jsonFetchFilter.data);
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    }
  };

  const handleClickSeeAll = () => {
    getIncidents();
  };

  const getSupportUsersWithAssignIncidentsQuantity = async (e) => {
    document.getElementById("supportAssign").style.visibility = "hidden";

    let token = localStorage.getItem("token");

    try {
      let fetchSupportUsers = await fetch(
        `http://127.0.0.1:8000/api/incidents/get/supportUsers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let jsonFetchSupportUsers = await fetchSupportUsers.json();
      let status = jsonFetchSupportUsers.status;

      if (status === 200) {
        setSupportUsers(jsonFetchSupportUsers.data);
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde" + error);
    } finally {
      let inputsUsers = Array.from(document.querySelectorAll(".userId"));

      for (let i = 0; i < inputsUsers.length; i++) {
        inputsUsers[i].checked = false;
      }

      let value = e.target.getAttribute("data-incidence");
      document.getElementById("incidenceId").value = value;

      document.getElementById("supportAssign").style.visibility = "visible";
    }
  };

  const handleSubmitSupportAssign = async (e) => {
    e.preventDefault();

    let value = document.querySelector("input[name=userId]:checked")

    if (value === null) {
      Swal.fire({
        title: "Debes seleccionar una opción",
        confirmButtonColor: "#0275d8",
      });
    } else {
      let incidenceId = document.getElementById("incidenceId").value;
      let token = localStorage.getItem("token");

      try {
        let fetchFilter = await fetch(
          `http://127.0.0.1:8000/api/incidents/${incidenceId}/assignUserTechnical`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ user_id: value.value }),
          }
        );

        let jsonFetchFilter = await fetchFilter.json();
        let status = jsonFetchFilter.status;

        if (status === 200) {
          handleClickSeeAll();
          document.querySelector(".btn-close").click();
          Swal.fire({
            title: "Usuario de soporte asignado correctamente",
            confirmButtonColor: "#0275d8",
          });
        }
      } catch (error) {
        alert("Error, vuelva a intentarlo más tarde");
      }
    }
  };

  const deleteSupport = async (e) => {
    let token = localStorage.getItem("token");
    let incidenceId = e.target.getAttribute("data-delete-incidence");

    try {
      let fetchCategories = await fetch(
        `http://127.0.0.1:8000/api/incidents/${incidenceId}/deleteAssignedUser`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let jsonFetchCategories = await fetchCategories.json();
      let status = jsonFetchCategories.status;

      if (status === 200) {
        Swal.fire({
          title: "Usuario de soporte eliminado correctamente",
          confirmButtonColor: "#0275d8",
        });
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    } finally {
      handleClickSeeAll();
    }
  };

  const handleSubmitDeleteSupportAssign = (e) => {
    let value = e.target.getAttribute("id");
    let valueState = e.target.getAttribute("data-state");

    if (value === "0") {
      Swal.fire({
        title: "Esta incidencia no tiene soporte asignado",
        confirmButtonColor: "#0275d8",
      });
    } else if (valueState === "1") {
      Swal.fire({
        title: "Esta incidencia ya fue cerrada",
        confirmButtonColor: "#0275d8",
      });
    } else {
      Swal.fire({
        title: "¿Estás seguro que quieres dejar sin asignar a la incidencia?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0275d8",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sí, elimínalo",
      }).then(function (result) {
        if (result.isConfirmed) {
          deleteSupport(e);
        }
      });
    }
  };

  useEffect(() => {
    getCategories();
    getPriorities();
    getIncidents();
  }, []);

  return (
    <div id="main" className="main bg-light pl-5 pr-5">
      <div className="container-fluid mt-0 p-3 bg-white">
        <NavLink
          to="/dashboard"
          className="btn btn-danger text-white p-2 text-decoration-none"
        >
          <i className="fa-solid fa-house"></i> Volver al Inicio
        </NavLink>
        <h2 className="mb-3 mt-3">Listado de Incidencias</h2>

        <FormFilterIncidents
          categories={categories}
          priotiries={priotiries}
          handleChangeInput={handleChangeInput}
          handleSubmitFilter={handleSubmitFilter}
          handleClickSeeAll={handleClickSeeAll}
        />

        <div className="container-loader">
          <span className="loader"></span>
        </div>

        <TableIncidents
          incidents={incidents}
          getSupportUsersWithAssignIncidentsQuantity={
            getSupportUsersWithAssignIncidentsQuantity
          }
          handleSubmitDeleteSupportAssign={handleSubmitDeleteSupportAssign}
        />

        <ModalSupportAssign
          supportUsers={supportUsers}
          handleSubmitSupportAssign={handleSubmitSupportAssign}
        />
      </div>
    </div>
  );
};
