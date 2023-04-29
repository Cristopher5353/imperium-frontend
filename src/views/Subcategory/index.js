import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { validatedForm } from "../../custom/validateForm";
import { ModalSubcategory } from "./components/ModalSubcategory";
import { TableSubcategory } from "./components/TableSubcategory";

export const Subcategory = () => {
  const [subcategory, setSubcategory] = useState({ category_id: 0, name: "" });
  const [create, setCreate] = useState({ create: false });
  const [idUpdate, setIdUpdate] = useState({ id: 0 });
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [boolState, setBoolState] = useState(false);
  const [errors, setErrors] = useState({ category_id: "", name: "" });
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const getSubcategories = async () => {
    document.querySelector(".table-class").style.opacity = 0;
    document.querySelector(".loader").style.display = "block";
    let token = localStorage.getItem("token");

    try {
      let fetchSubcategories = await fetch(
        `http://127.0.0.1:8000/api/subcategories/${page}/get`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let jsonFetchSubcategories = await fetchSubcategories.json();
      let status = jsonFetchSubcategories.status;

      console.log(jsonFetchSubcategories);

      if (status === 200) {
        setSubcategories(jsonFetchSubcategories.data);
        setTotalPages(jsonFetchSubcategories.totalPages);
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    } finally {
      document.querySelector(".table-class").style.opacity = 1;
      document.querySelector(".loader").style.display = "none";
    }
  };

  const handleClickCreate = () => {
    setSubcategory({ category_id: 0, name: "" });
    setCreate({ create: true });
    setErrors({ category_id: "", name: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let token = localStorage.getItem("token");

    if (create) {
      try {
        let fetchCreateSubcategory = await fetch(
          `http://127.0.0.1:8000/api/subcategories/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(subcategory),
          }
        );

        let jsonFetchCreateSubcategory = await fetchCreateSubcategory.json();
        let status = jsonFetchCreateSubcategory.status;

        if (status === 201) {
          document.querySelector(".btn-close").click();
          Swal.fire("Tarea completada con exito!", "", "success");
          setErrors({ category_id: "", name: "" });
        } else if (status === 400) {
          setErrors({ category_id: "", name: "" });
          validatedForm(jsonFetchCreateSubcategory, errors, setErrors);
        }
      } catch (error) {
        alert("Error, vuelva a intentarlo más tarde");
      }
    } else {
      try {
        let fetchUpdateSubcategory = await fetch(
          `http://127.0.0.1:8000/api/subcategories/${idUpdate.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(subcategory),
          }
        );
        let jsonFetchUpdateSubcategory = await fetchUpdateSubcategory.json();
        let status = jsonFetchUpdateSubcategory.status;

        if (status === 200) {
          document.querySelector(".btn-close").click();
          Swal.fire("Tarea completada con exito!", "", "success");
          setErrors({ category_id: "", name: "" });
        } else if (status === 400) {
          validatedForm(jsonFetchUpdateSubcategory, errors, setErrors);
        } else if (status === 404) {
          alert(jsonFetchUpdateSubcategory.message);
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
      let fetchChangeStateSubcategory = await fetch(
        `http://127.0.0.1:8000/api/subcategories/${id}/changeState`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let jsonFetchChangeStateSubcategory =
        await fetchChangeStateSubcategory.json();

      let status = jsonFetchChangeStateSubcategory.status;

      if (status === 200) {
        Swal.fire("Tarea completada con exito!", "", "success");
      } else if (status === 404) {
        alert(jsonFetchChangeStateSubcategory.message);
      }

      setBoolState(boolState ? false : true);
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    }
  };

  const handleClickUpdate = async (id) => {
    document.getElementById("formSubcategory").style.visibility = "hidden";
    try {
      let token = localStorage.getItem("token");

      let fetchGetSubcategoryById = await fetch(
        `http://127.0.0.1:8000/api/subcategories/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let jsonFetchGetSubcategoryById = await fetchGetSubcategoryById.json();
      let status = jsonFetchGetSubcategoryById.status;

      if (status === 200) {
        setSubcategory({
          category_id: jsonFetchGetSubcategoryById.data.category_id,
          name: jsonFetchGetSubcategoryById.data.name,
        });
        setCreate(false);

        setIdUpdate({ id: id });
        setErrors({ category_id: "", name: "" });
      } else if (status === 404) {
        alert(jsonFetchGetSubcategoryById.message);
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    } finally {
      document.getElementById("formSubcategory").style.visibility = "visible";
    }
  };

  const handleChangeInput = (e) => {
    setSubcategory({ ...subcategory, [e.target.name]: e.target.value });
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

  const handleChangeSetPage = (plus) => (plus == true) ?setPage(page + 1) : setPage(page - 1);

  useEffect(() => {
    getCategories();
    getSubcategories();
  }, [boolState]);

  useEffect(() => {
    getSubcategories();
  },[page])

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
            data-bs-target="#formSubcategory"
            onClick={handleClickCreate}
          >
            <i className="fa-solid fa-plus"></i> Crear Subcategoría
          </button>
          <h2 className="mb-3 mt-3">Listado de Subcategorías</h2>
          <div className="container-loader">
            <span className="loader"></span>
          </div>
          <TableSubcategory
            subcategories={subcategories}
            handleClickUpdate={handleClickUpdate}
            handleClickChangeState={handleClickChangeState}
            page={page}
            totalPages={totalPages}
            handleChangeSetPage={handleChangeSetPage}
          />
        </div>
      </div>
      <ModalSubcategory
        categories={categories}
        subcategory={subcategory}
        handleChangeInput={handleChangeInput}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </>
  );
};
