import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { validatedForm } from "../../custom/validateForm";
import { ModalPriority } from "./components/ModalPriority";
import { TablePriority } from "./components/TablePriority";

export const Priotiry = () => {
  const [priority, setPriority] = useState({ name: "" });
  const [create, setCreate] = useState({ create: false });
  const [idUpdate, setIdUpdate] = useState({ id: 0 });
  const [priotiries, setPriorities] = useState([]);
  const [boolState, setBoolState] = useState(false);
  const [errors, setErrors] = useState({ name: "" });
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const getPriorities = async () => {
    document.querySelector(".table-class").style.opacity = 0;
    document.querySelector(".loader").style.display = "block";

    let token = localStorage.getItem("token");

    try {
      let fetchPriorities = await fetch(
        `http://127.0.0.1:8000/api/priorities/${page}/get`,
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
        setTotalPages(jsonFetchPriorities.totalPages);
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    } finally {
      document.querySelector(".table-class").style.opacity = 1;
      document.querySelector(".loader").style.display = "none";
    }
  };

  const handleClickCreate = () => {
    setPriority({ name: "" });
    setCreate({ create: true });
    setErrors({ name: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let token = localStorage.getItem("token");

    if (create) {
      try {
        let fetchCreatePriority = await fetch(
          `http://127.0.0.1:8000/api/priorities/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(priority),
          }
        );

        let jsonFetchCreatePriority = await fetchCreatePriority.json();
        let status = jsonFetchCreatePriority.status;

        if (status === 201) {
          document.querySelector(".btn-close").click();
          Swal.fire("Tarea completada con exito!", "", "success");
          setErrors({ name: "" });
        } else if (status === 400) {
          validatedForm(jsonFetchCreatePriority, errors, setErrors);
        }
      } catch (error) {
        alert("Error, vuelva a intentarlo más tarde");
      }
    } else {
      try {
        let fetchUpdatePriority = await fetch(
          `http://127.0.0.1:8000/api/priorities/${idUpdate.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(priority),
          }
        );

        let jsonFetchUpdatePriority = await fetchUpdatePriority.json();
        let status = jsonFetchUpdatePriority.status;

        if (status === 200) {
          document.querySelector(".btn-close").click();
          Swal.fire("Tarea completada con exito!", "", "success");
          setErrors({ name: "" });
        } else if (status === 400) {
          validatedForm(jsonFetchUpdatePriority, errors, setErrors);
        } else if (status === 404) {
          alert(jsonFetchUpdatePriority.message);
        }
      } catch (error) {
        alert("Error, vuelva a intentarlo más tarde");
      }
    }

    setBoolState(boolState ? false : true);
  };

  const handleClickChangeState = async (id) => {
    let token = localStorage.getItem("token");

    try {
      let fetchChangeStatePriority = await fetch(
        `http://127.0.0.1:8000/api/priorities/${id}/changeState`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let jsonFetchChangeStatePriority = await fetchChangeStatePriority.json();

      let status = jsonFetchChangeStatePriority.status;

      if (status === 200) {
        Swal.fire("Tarea completada con exito!", "", "success");
      } else if (status === 404) {
        alert(jsonFetchChangeStatePriority.message);
      }

      setBoolState(boolState ? false : true);
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    }
  };

  const handleClickUpdate = async (id) => {
    document.getElementById("formPriority").style.visibility = "hidden";
    try {
      let token = localStorage.getItem("token");

      let fetchGetPriorityById = await fetch(
        `http://127.0.0.1:8000/api/priorities/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let jsonFetchGetPriorityById = await fetchGetPriorityById.json();
      let status = jsonFetchGetPriorityById.status;

      if (status === 200) {
        setPriority({ name: jsonFetchGetPriorityById.data.name });
        setCreate(false);

        setIdUpdate({ id: id });
        setErrors({ name: "" });
      } else if (status === 404) {
        alert(jsonFetchGetPriorityById.message);
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    } finally {
      document.getElementById("formPriority").style.visibility = "visible";
    }
  };

  const handleChangeInputString = (e) => {
    setPriority({ ...priority, [e.target.name]: e.target.value });
  };

  const handleChangeSetPage = (plus) => (plus == true) ?setPage(page + 1) : setPage(page - 1);

  useEffect(() => {
    getPriorities();
  }, [boolState, page]);

  return (
    <>
      <div id="main" className="main bg-light pl-5 pr-5">
        <div className="container-fluid mt-0 p-3 bg-white">
          <NavLink
            to="/dashboard"
            className="btn btn-danger text-white p-2 text-decoration-none"
          >
            <i className="fa-solid fa-house"></i> Volver al Inicio
          </NavLink>
          <button
            type="button"
            className="btn btn-primary text-white p-2 text-decoration-none ms-2"
            data-bs-toggle="modal"
            data-bs-target="#formPriority"
            onClick={handleClickCreate}
          >
            <i className="fa-solid fa-plus"></i> Crear Prioridad
          </button>
          <h2 className="mb-3 mt-3">Listado de Prioridades</h2>
          <div className="container-loader">
            <span className="loader"></span>
          </div>
          <TablePriority
            priotiries={priotiries}
            handleClickUpdate={handleClickUpdate}
            handleClickChangeState={handleClickChangeState}
            page={page}
            totalPages={totalPages}
            handleChangeSetPage={handleChangeSetPage}
          />
        </div>
      </div>
      <ModalPriority
        priority={priority}
        handleChangeInputString={handleChangeInputString}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </>
  );
};
