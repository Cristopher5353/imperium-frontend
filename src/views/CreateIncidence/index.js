import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { validatedForm } from "../../custom/validateForm";

export const CreateIncidence = () => {
  const [priotiries, setPriorities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [errors, setErrors] = useState({
    title: "",
    subcategory_id: "",
    priority_id: "",
    description: "",
    documents: "",
    images: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      title: "",
      subcategory_id: "",
      priority_id: "",
      description: "",
      documents: "",
      images: "",
    });

    let token = localStorage.getItem("token");

    try {
      let fetchCreateIncidence = await fetch(
        `http://127.0.0.1:8000/api/incidents/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: new FormData(document.getElementById("form-incidence")),
        }
      );

      let jsonFetchCreateIncidence = await fetchCreateIncidence.json();
      let status = jsonFetchCreateIncidence.status;

      if (status === 201) {
        Swal.fire("Tarea completada con exito!", "", "success");
        document.getElementById("form-incidence").reset();
      } else if (status === 400) {
        validatedForm(jsonFetchCreateIncidence, errors, setErrors);
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    }
  };

  const getPrioritiesActive = async () => {
    let token = localStorage.getItem("token");

    try {
      let fetchPrioritiesActive = await fetch(
        `http://127.0.0.1:8000/api/priorities/active`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let jsonFetchPrioritiesActive = await fetchPrioritiesActive.json();
      let status = jsonFetchPrioritiesActive.status;

      if (status === 200) {
        setPriorities(jsonFetchPrioritiesActive.data);
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    }
  };

  const getCategoriesActive = async () => {
    let token = localStorage.getItem("token");

    try {
      let fetchCategoriesActive = await fetch(
        `http://127.0.0.1:8000/api/categories/active`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let jsonFetchCategoriesActive = await fetchCategoriesActive.json();
      let status = jsonFetchCategoriesActive.status;

      if (status === 200) {
        setCategories(jsonFetchCategoriesActive.data);
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    }
  };

  const getSubcategoriesByIdCategory = async (e) => {
    let token = localStorage.getItem("token");

    try {
      let fetchSubcategoriesByIdCategory = await fetch(
        `http://127.0.0.1:8000/api/categories/${e.target.value}/subcategories`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let jsonFetchSubcategoriesByIdCategory =
        await fetchSubcategoriesByIdCategory.json();
      let status = jsonFetchSubcategoriesByIdCategory.status;

      if (status === 200) {
        setSubcategories(jsonFetchSubcategoriesByIdCategory.data);
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    }
  };

  useEffect(() => {
    getPrioritiesActive();
    getCategoriesActive();
  }, []);

  return (
    <>
      <div id="main" className="main bg-light mt-2 pl-5 pr-5">
        <div className="container-fluid mt-5 mb-5 pt-3 pb-3 pl-4 pr-4 bg-white">
          <NavLink
            to="/dashboard"
            className="btn btn-danger text-white p-2 text-decoration-none"
          >
            <i className="fa-solid fa-house"></i> Volver al Inicio
          </NavLink>
          <h1 className="mt-3">Registrar Indidencias</h1>
          <p>Desde esta ventana podrá generar nuevas incidencias</p>
          <form
            method="POST"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            id="form-incidence"
          >
            <div className="form-group mb-3">
              <label htmlFor="title">Título</label>
              <input
                type="text"
                className={
                  errors.title !== ""
                    ? "form-control is-invalid"
                    : "form-control"
                }
                id="title"
                name="title"
                placeholder="Ingresa el título de la incidencia"
              />
              {errors.title !== "" ? (
                <small className="help-block text-danger">{errors.title}</small>
              ) : null}
            </div>
            <div className="form-group row mb-3">
              <div className="col-6">
                <label htmlFor="category">Categoría</label>
                <select
                  className="form-select"
                  id="category"
                  onChange={getSubcategoriesByIdCategory}
                >
                  <option value="0">--Seleccione--</option>
                  {categories.map((el, index) => (
                    <option value={el.id} key={index}>
                      {el.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-6">
                <label htmlFor="subcategory">Subcategoria</label>
                <select
                  className={
                    errors.subcategory_id !== ""
                      ? "form-select is-invalid"
                      : "form-select"
                  }
                  id="subcategory"
                  name="subcategory_id"
                >
                  <option value="0">--Seleccione--</option>
                  {subcategories.map((el, index) => (
                    <option value={el.id} key={index}>
                      {el.name}
                    </option>
                  ))}
                </select>
                {errors.subcategory_id !== "" ? (
                  <small className="help-block text-danger">
                    {errors.subcategory_id}
                  </small>
                ) : null}
              </div>
            </div>
            <div className="form-group row mb-3">
              <div className="col-6">
                <label htmlFor="priority">Prioridades</label>
                <select
                  className={
                    errors.priority_id !== ""
                      ? "form-select is-invalid"
                      : "form-select"
                  }
                  id="priority"
                  name="priority_id"
                >
                  <option value="0">--Seleccione--</option>
                  {priotiries.map((el, index) => (
                    <option value={el.id} key={index}>
                      {el.name}
                    </option>
                  ))}
                </select>
                {errors.priority_id !== "" ? (
                  <small className="help-block text-danger">
                    {errors.priority_id}
                  </small>
                ) : null}
              </div>
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
                {errors.documents !== "" ? (
                  <small className="help-block text-danger">
                    {errors.documents}
                  </small>
                ) : null}
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="images">Imágenes</label>
              <input
                type="file"
                id="images"
                name="images[]"
                multiple
                accept=".jpg,.png,.jpge"
                className={
                  errors.images !== ""
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
              {errors.images !== "" ? (
                <small className="help-block text-danger">
                  {errors.images}
                </small>
              ) : null}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="description">Descripción</label>
              <textarea
                className={
                  errors.description !== ""
                    ? "form-control is-invalid"
                    : "form-control"
                }
                id="description"
                name="description"
                rows="10"
                placeholder="Ingresa una descripción sobre la incidencia"
              ></textarea>
              {errors.description !== "" ? (
                <small className="help-block text-danger">
                  {errors.description}
                </small>
              ) : null}
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              name="accion"
              value="cp"
            >
              <i className="fa-solid fa-floppy-disk"></i> Guardar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
