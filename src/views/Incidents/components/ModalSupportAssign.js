import React from "react";

export const ModalSupportAssign = ({supportUsers, handleSubmitSupportAssign}) => {
  return (
    <div
      className="modal fade"
      id="supportAssign"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Asignar Soporte
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form
              method="POST"
              id="formAsignarSoporte"
              onSubmit={handleSubmitSupportAssign}
            >
              <table
                className="table table-striped display responsive nowrap"
                style={{ width: "100%" }}
                id="soporte"
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Elegir</th>
                    <th scope="col">Id</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido Paterno</th>
                    <th scope="col">Apellido Materno</th>
                    <th scope="col">Incidencias Asignadas</th>
                  </tr>
                </thead>
                <tbody>
                  {supportUsers.length === 0 ? (
                    <tr style={{ textAlign: "center" }}>
                      <td colSpan={11}>Sin Registros</td>
                    </tr>
                  ) : (
                    supportUsers.map((el) => (
                      <tr key={el.id}>
                        <td class="text-center">
                          <input
                            type="radio"
                            name="userId"
                            class="userId"
                            value={el.id}
                          />
                        </td>
                        <td>{el.id}</td>
                        <td>{el.name}</td>
                        <td>{el.last_surname}</td>
                        <td>{el.first_surname}</td>
                        <td>{el.quantity}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <div className="modal-footer">
                <input
                  type="hidden"
                  name="incidenceId"
                  id="incidenceId"
                />
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button type="submit" className="btn btn-primary">
                  Asignar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
