import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { validatedForm } from "../../custom/validateForm";
import { ModalCategory } from "./components/ModalCategory";
import { TableCategory } from "./components/TableCategory";

export const Category = () => {
  const [category, setCategory] = useState({ name: "" });
  const [create, setCreate] = useState({ create: false });
  const [idUpdate, setIdUpdate] = useState({ id: 0 });
  const [categories, setCategories] = useState([]);
  const [boolState, setBoolState] = useState(false);
  const [errors, setErrors] = useState({ name: "" });
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const getCategories = async () => {
    document.querySelector(".table-class").style.opacity = 0;
    document.querySelector(".loader").style.display = "block";
    let token = localStorage.getItem("token");

    try {
      let fetchCategories = await fetch(
        `http://127.0.0.1:8000/api/categories/${page}/get`,
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
        setTotalPages(jsonFetchCategories.totalPages);
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    } finally {
      document.querySelector(".table-class").style.opacity = 1;
      document.querySelector(".loader").style.display = "none";
    }
  };

  const handleClickCreate = () => {
    setCategory({ name: "" });
    setCreate({ create: true });
    setErrors({ name: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let token = localStorage.getItem("token");

    if (create) {
      try {
        let fetchCreateCategory = await fetch(
          `http://127.0.0.1:8000/api/categories/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(category),
          }
        );

        let jsonFetchCreateCategory = await fetchCreateCategory.json();
        let status = jsonFetchCreateCategory.status;

        if (status === 201) {
          document.querySelector(".btn-close").click();
          Swal.fire("Tarea completada con exito!", "", "success");
          setErrors({ name: "" });
        } else if (status === 400) {
          validatedForm(jsonFetchCreateCategory, errors, setErrors);
        }
      } catch (error) {
        alert("Error, vuelva a intentarlo más tarde");
      }
    } else {
      try {
        let fetchUpdateCategory = await fetch(
          `http://127.0.0.1:8000/api/categories/${idUpdate.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(category),
          }
        );

        let jsonFetchUpdateCategory = await fetchUpdateCategory.json();
        let status = jsonFetchUpdateCategory.status;

        if (status === 200) {
          document.querySelector(".btn-close").click();
          Swal.fire("Tarea completada con exito!", "", "success");
          setErrors({ name: "" });
        } else if (status === 400) {
          validatedForm(jsonFetchUpdateCategory, errors, setErrors);
        } else if (status === 404) {
          alert(jsonFetchUpdateCategory.message);
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
      let fetchChangeStateCategory = await fetch(
        `http://127.0.0.1:8000/api/categories/${id}/changeState`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let jsonFetchChangeStateCategory = await fetchChangeStateCategory.json();

      let status = jsonFetchChangeStateCategory.status;

      if (status === 200) {
        Swal.fire("Tarea completada con exito!", "", "success");
      } else if (status === 404) {
        alert(jsonFetchChangeStateCategory.message);
      }

      setBoolState(boolState ? false : true);
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    }
  };

  const handleClickUpdate = async (id) => {
    document.getElementById("formCategory").style.visibility = "hidden";
    try {
      let token = localStorage.getItem("token");

      let fetchGetCategoryById = await fetch(
        `http://127.0.0.1:8000/api/categories/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let jsonFetchGetCategoryById = await fetchGetCategoryById.json();
      let status = jsonFetchGetCategoryById.status;

      if (status === 200) {
        setCategory({ name: jsonFetchGetCategoryById.data.name });
        setCreate(false);

        setIdUpdate({ id: id });
        setErrors({ name: "" });
      } else if (status === 404) {
        alert(jsonFetchGetCategoryById.message);
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    } finally {
      document.getElementById("formCategory").style.visibility = "visible";
    }
  };

  const handleChangeInputString = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleChangeSetPage = (plus) => (plus === true) ?setPage(page + 1) : setPage(page - 1);

  useEffect(() => {
    getCategories();
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
            data-bs-target="#formCategory"
            onClick={handleClickCreate}
          >
            <i className="fa-solid fa-plus"></i> Crear Categoría
          </button>
          <h2 className="mb-3 mt-3">Listado de Categorías</h2>
          <div className="container-loader">
            <span className="loader"></span>
          </div>
          <TableCategory
            categories={categories}
            handleClickUpdate={handleClickUpdate}
            handleClickChangeState={handleClickChangeState}
            page={page}
            totalPages={totalPages}
            handleChangeSetPage={handleChangeSetPage}
          />
        </div>
      </div>
      <ModalCategory
        category={category}
        handleChangeInputString={handleChangeInputString}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </>
  );
};
