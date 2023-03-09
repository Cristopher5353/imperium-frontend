import React from "react";

export const ModalSubcategory = ({
  categories,
  subcategory,
  handleChangeInput,
  handleSubmit,
  errors,
}) => {
  return (
    <div
      className="modal fade"
      id="formSubcategory"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Crear Subcategoría
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form method="POST" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">
                  Nombre
                </label>
                <input
                  value={subcategory.name}
                  placeholder="Nombre de la subcategoría"
                  name="name"
                  type="text"
                  className={
                    errors.name !== ""
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  id="recipientname"
                  onChange={handleChangeInput}
                />
                {errors.name !== "" ? (
                  <small className="help-block text-danger">
                    {errors.name}
                  </small>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">
                  Categoría
                </label>
                <select
                  className={
                    errors.category_id !== "" ? "form-select is-invalid" : "form-select"
                  }
                  aria-label="Default select example"
                  name="category_id"
                  value={subcategory.category_id}
                  onChange={handleChangeInput}
                >
                  <option value="0">---Seleccione---</option>
                  {categories.map((el, index) => (
                    <option value={el.id} key={index}>
                      {el.name}
                    </option>
                  ))}
                </select>
                {errors.category_id !== "" ? (
                  <small className="help-block text-danger">
                    {errors.category_id}
                  </small>
                ) : null}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
