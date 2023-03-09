import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { validatedForm } from "../../custom/validateForm";
import { useNavigate } from "react-router-dom";

export const IncidenceResponse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    response: "",
    documents: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({
      response: "",
      documents: "",
    });

    let token = localStorage.getItem("token");

    try {
      let fetchIncidenceResponse = await fetch(
        `http://127.0.0.1:8000/api/incidents/${id}/response`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: new FormData(
            document.getElementById("form-incidence-response")
          ),
        }
      );

      let jsonFetchIncidenceResponse = await fetchIncidenceResponse.json();
      let status = jsonFetchIncidenceResponse.status;

      if (status === 201) {
        Swal.fire("Tarea completada con exito!", "", "success");
        navigate("/dashboard/incidencias");
      } else if (status === 400) {
        validatedForm(jsonFetchIncidenceResponse, errors, setErrors);
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    }
  };

  return (
    <>
      <div id="main" className="main bg-light pl-5 pr-5">
        <div className="container mt-1 mb-1 pt-3 pb-3 pl-4 pr-4 bg-white">
          <NavLink
            to="/dashboard"
            className="btn btn-danger text-white p-2 text-decoration-none"
          >
            <i className="fa-solid fa-house"></i> Volver al Inicio
          </NavLink>
          <h1 className="mt-3">Respuesta Incidencia</h1>
          <form
            method="POST"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            id="form-incidence-response"
          >
            <div className="form-group mb-3">
              <label htmlFor="response">Respuesta</label>
              <textarea
                className={
                  errors.response !== ""
                    ? "form-control is-invalid"
                    : "form-control"
                }
                id="response"
                name="response"
                rows="10"
                placeholder="Ingresa una descripción sobre la incidencia"
              ></textarea>
              {errors.response !== "" ? (
                <small className="help-block text-danger">
                  {errors.response}
                </small>
              ) : null}
            </div>
            <div className="form-group row mb-3">
              <div className="col-6">
                <label htmlFor="documents">Documentos Adicionales</label>
                <input
                  type="file"
                  id="documents"
                  name="documents[]"
                  multiple
                  accept=".pdf"
                  className={
                    errors.documents !== ""
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
              </div>
              {errors.documents !== "" ? (
                <small className="help-block text-danger">
                  {errors.documents}
                </small>
              ) : null}
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              name="accion"
              value="cp"
            >
              <i class="fa-solid fa-folder-closed me-2"></i>Cerrar Incidencia
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
