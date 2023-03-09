import React from "react";

export const ModalPriority = ({
  priority,
  handleChangeInputString,
  handleSubmit,
  errors,
}) => {
  return (
    <div
      className="modal fade"
      id="formPriority"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Crear Prioridad
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
                  value={priority.name}
                  placeholder="Nombre de la prioridad"
                  name="name"
                  type="text"
                  className={
                    errors.name != ""
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  id="recipientname"
                  onChange={handleChangeInputString}
                />
                {errors.name != "" ? (
                  <small className="help-block text-danger">
                    {errors.name}
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
