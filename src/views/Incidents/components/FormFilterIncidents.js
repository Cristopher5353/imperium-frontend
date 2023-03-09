import React from "react";

export const FormFilterIncidents = ({categories, priotiries, handleChangeInput, handleSubmitFilter, handleClickSeeAll}) => {
  return (
    <form onSubmit={handleSubmitFilter}>
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="row">
            <div className="form-group col-12 col-md-6">
              <label htmlFor="titulo">Categoría</label>
              <select
                className="form-select"
                id="category"
                name="category"
                required
                onChange={handleChangeInput}
              >
                <option value="0">Escoge una opción</option>
                {categories.map((el) => (
                  <option value={el.id} key={el.id}>{el.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group col-12 col-md-6">
              <label htmlFor="titulo">Prioridad</label>
              <select
                className="form-select"
                id="priority"
                name="priority"
                required
                onChange={handleChangeInput}
              >
                <option value="0">Escoge una opción</option>
                {priotiries.map((el) => (
                  <option value={el.id} key={el.id}>{el.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
          <div className="row justify-content-center justify-content-md-end w-100 mt-3">
            <button
              type="submit"
              className="btn btn-primary col-12 col-md-4 rounded me-2 mb-2 mb-md-0 border"
            >
              <i className="fa-solid fa-filter"></i> Filtrar
            </button>

            <button
              type="button"
              className="btn btn-primary col-12 col-md-4 rounded me-2"
              onClick={handleClickSeeAll}
            >
              <i className="fa-solid fa-globe"></i> Ver Todo
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
