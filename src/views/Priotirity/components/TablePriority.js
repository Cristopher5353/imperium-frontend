import moment from "moment/moment";
import React from "react";

export const TablePriority = ({
  priotiries,
  handleClickUpdate,
  handleClickChangeState,
}) => {
  return (
    <div className="table-responsive table-class" style={{opacity : 0}}>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Código</th>
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha Registro</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {priotiries.length === 0 ? (
            <tr style={{ textAlign: "center" }}>
              <td colSpan={4}>Sin Registros</td>
            </tr>
          ) : (
            priotiries.map((el) => (
              <tr key={el.id}>
                <td>{el.id}</td>
                <td>{el.name}</td>
                <td>{el.state === 1 ? "Activado" : "Desactivado"}</td>
                <td>{moment(el.created_at).format("DD/MM/YY")}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#formPriority"
                    onClick={() => handleClickUpdate(el.id)}
                  >
                    Editar
                  </button>
                  {el.state === 1 ? (
                    <button
                      className="btn btn-danger"
                      type="button"
                      data-bs-toggle="modal"
                      onClick={() => handleClickChangeState(el.id)}
                    >
                      Desactivar
                    </button>
                  ) : (
                    <button
                      className="btn btn-success"
                      type="button"
                      data-bs-toggle="modal"
                      onClick={() => handleClickChangeState(el.id)}
                    >
                      Activar
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
