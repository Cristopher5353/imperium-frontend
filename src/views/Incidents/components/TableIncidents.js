import moment from "moment";
import React from "react";
import { NavLink } from "react-router-dom";
import { decodeToken } from "../../../custom/decodeToken";

export const TableIncidents = ({
  incidents,
  getSupportUsersWithAssignIncidentsQuantity,
  handleSubmitDeleteSupportAssign,
}) => {
  return (
    <div className="table-responsive table-class" style={{ opacity: 0 }}>
      <table className="table table-striped mt-4" id="incidencias">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Categoría</th>
            <th scope="col">Título</th>
            <th scope="col">Prioridad</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha Creación</th>
            {decodeToken().role === 1 && <th scope="col">Fecha Asignación</th>}
            <th scope="col">Fecha Cierre</th>
            {decodeToken().role === 1 && <th scope="col">Soporte</th>}
            <th scope="col">Ver</th>
            {decodeToken().role === 1 && <th scope="col">Editar</th>}
          </tr>
        </thead>
        <tbody>
          {incidents.length === 0 ? (
            <tr style={{ textAlign: "center" }}>
              <td colSpan={11}>Sin Registros</td>
            </tr>
          ) : (
            incidents.map((el) => (
              <tr key={el.id}>
                <td>{el.id}</td>
                <td>{el.category}</td>
                <td>{el.title}</td>
                <td>{el.priority}</td>
                <td>
                  {el.deadline == null ? (
                    <p className="bg-success pl-3 pr-3 pt-1 pb-1 text-light rounded text-center">
                      Abierto
                    </p>
                  ) : (
                    <p className="bg-danger pl-3 pr-3 pt-1 pb-1 text-light rounded text-center">
                      Cerrado
                    </p>
                  )}
                </td>
                <td>{moment(el.created_at).format("DD/MM/YY")}</td>
                {decodeToken().role === 1 && (
                  <td>
                    {el.date_assignment == null ? (
                      <p className="bg-secondary pl-3 pr-3 pt-1 pb-1 text-light rounded text-center">
                        Sin Asignar
                      </p>
                    ) : (
                      moment(el.date_assignment).format("DD/MM/YY")
                    )}
                  </td>
                )}
                <td>
                  {el.deadline == null ? (
                    <p className="bg-secondary pl-3 pr-3 pt-1 pb-1 text-light rounded text-center">
                      Sin Cerrar
                    </p>
                  ) : (
                    moment(el.deadline).format("DD/MM/YY")
                  )}
                </td>
                {decodeToken().role === 1 && (
                  <td>
                    {el.date_assignment == null ? (
                      <p class="bg-warning pl-3 pr-3 pt-1 pb-1 text-light rounded text-center">
                        Sin Asignar
                      </p>
                    ) : (
                      <p class="bg-secondary pl-3 pr-3 pt-1 pb-1 text-light rounded text-center">
                        Asignado
                      </p>
                    )}
                  </td>
                )}
                <td>
                  <NavLink to={"/dashboard/incidencias/" + el.id}>
                    <i
                      className="fa-solid fa-eye bg-primary text-light p-2 rounded"
                      style={{ cursor: "pointer" }}
                    ></i>
                  </NavLink>
                </td>
                {decodeToken().role === 1 && (
                  <td>
                    <div class="dropdown">
                      <button
                        class="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          {el.date_assignment == null && (
                            <a
                              className="dropdown-item asignar-soporte"
                              href="#"x
                              data-bs-toggle="modal"
                              data-bs-target="#supportAssign"
                              data-incidence={el.id}
                              onClick={
                                getSupportUsersWithAssignIncidentsQuantity
                              }
                            >
                              Asignar Soporte
                            </a>
                          )}
                        </li>
                        <li>
                          <a
                            className="dropdown-item delete-support"
                            href="#"
                            data-toggle="modal"
                            id={el.user != null ? el.user : 0}
                            onClick={handleSubmitDeleteSupportAssign}
                            data-delete-incidence={el.id}
                            data-state={el.deadline != null ? 1 : 0}
                          >
                            Eliminar Soporte
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
