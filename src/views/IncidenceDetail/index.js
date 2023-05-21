import moment from "moment";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { decodeToken } from "../../custom/decodeToken";
import { useLoading } from "../../hooks/useLoading";

export const IncidenceDetail = () => {
  const { id } = useParams();
  const [incidenceDetail, setIncidenceDetail] = useState({});
  const [boolResponse, setBoolResponse] = useState(false);
  const { loading, startLoading, stopLoading } = useLoading();

  const getIncidenceDetail = async () => {
    startLoading();

    let token = localStorage.getItem("token");

    try {
      let fetchIndicenceDetail = await fetch(
        `http://127.0.0.1:8000/api/incidents/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let jsonFetchIncidenceDetail = await fetchIndicenceDetail.json();
      let status = jsonFetchIncidenceDetail.status;

      if (status === 200) {
        setIncidenceDetail(jsonFetchIncidenceDetail.data);

        jsonFetchIncidenceDetail.data.deadline !== null
          ? setBoolResponse(true)
          : setBoolResponse(false);
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    } finally {
      stopLoading();
    }
  };

  const handleClickDownload = async (el, type) => {
    let token = localStorage.getItem("token");

    let url =
      type === "d"
        ? `http://127.0.0.1:8000/api/incidents/document/${el}`
        : `http://127.0.0.1:8000/api/incidents/image/${el}`;

    try {
      let fetchGetDocument = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      let jsonFetchGetDocument = await fetchGetDocument.json();
      let status = jsonFetchGetDocument.status;

      if (status === 200) {
        let url =
          type === "d"
            ? `http://127.0.0.1:8000/api/private/documents/${jsonFetchGetDocument.data.document}`
            : `http://127.0.0.1:8000/api/private/images/${jsonFetchGetDocument.data.image}`;
        try {
          await fetch(url, {
            method: "POST",
            headers: {
              responseType: "blob",
              Authorization: `Bearer ${token}`,
            },
          }).then((response) =>
            response.blob().then((success) => {
              const url = window.URL.createObjectURL(new Blob([success]));
              const link = document.createElement("a");
              link.href = url;

              let name = "";
              let accept =
                type === "d"
                  ? jsonFetchGetDocument.data.document.split(".")[1]
                  : jsonFetchGetDocument.data.image.split(".")[1];

              if (type === "d") {
                name = "documento.pdf";
              } else if (accept === "png") {
                name = "imagen.png";
              } else if (accept === "jpg") {
                name = "imagen.jpg";
              } else if (accept === "jpge") {
                name = "imagen.jpge";
              }

              link.setAttribute("download", name);
              document.body.appendChild(link);
              link.click();
            })
          );
        } catch (error) {
          alert("Error, vuelva a intentarlo más tarde");
        }
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    }
  };

  useEffect(() => {
    getIncidenceDetail();
  }, []);

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
          <h1 className="mt-3">Detalle Incidencia</h1>

          {loading ? (
            <div className="container-loader">
              <span className="loader"></span>
            </div>
          ) : (
            <div className="row" id="detail-show">
              <div>
                {decodeToken().role === 2 && boolResponse === false && (
                  <NavLink
                    to={"/dashboard/incidencias/" + id + "/respuesta"}
                    className="nav-link collapsed"
                  >
                    <button className="btn btn-success">
                      <i class="fa-solid fa-star"></i> Responder
                    </button>
                  </NavLink>
                )}
                {boolResponse && (
                  <NavLink
                    to={"/dashboard/incidencias/" + id + "/respuesta/mostrar"}
                  >
                    <button className="btn btn-success">
                      <i class="fa-solid fa-star"></i> Ver Respuesta
                    </button>
                  </NavLink>
                )}
              </div>
              <div
                className="col-12 mb-3 p-3"
                style={{ borderBottom: "2px solid #eee" }}
              >
                <i className="fa-solid fa-user text-primary me-2"></i>
                <span>
                  {incidenceDetail.technical === null
                    ? "Sin Asignar"
                    : incidenceDetail.technical}
                </span>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-2">
                    <p>
                      {moment(incidenceDetail.created_at).format("DD/MM/YY")}
                    </p>
                  </div>
                  <div className="col-10">
                    <p>{incidenceDetail.title}</p>
                    <p>{incidenceDetail.description}</p>
                    <div>
                      <strong>Documentos Adicionales</strong>
                      {incidenceDetail.id_documents === null ? (
                        <p>No existen documentos registrados</p>
                      ) : (
                        <table className="table table-striped border mt-1">
                          <thead>
                            <tr>
                              <th scope="col">Nombre</th>
                              <th scope="col">Opcion</th>
                            </tr>
                          </thead>
                          <tbody>
                            {String(incidenceDetail.id_documents)
                              .split(",")
                              .map((el, index) => (
                                <tr key={index}>
                                  <td>{"Documento N° " + (index + 1)}</td>
                                  <td>
                                    <button
                                      className="bg-primary rounded text-white pe-3 ps-3 pt-1 pb-1 border-0"
                                      onClick={() =>
                                        handleClickDownload(el, "d")
                                      }
                                    >
                                      Descargar
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                    <div>
                      <strong>Imágenes Adicionales</strong>
                      {incidenceDetail.id_images === null ? (
                        <p>No existen documentos registrados</p>
                      ) : (
                        <table className="table table-striped border mt-1">
                          <thead>
                            <tr>
                              <th scope="col">Nombre</th>
                              <th scope="col">Opcion</th>
                            </tr>
                          </thead>
                          <tbody>
                            {String(incidenceDetail.id_images)
                              .split(",")
                              .map((el, index) => (
                                <tr key={index}>
                                  <td>{"Imagen N° " + (index + 1)}</td>
                                  <td>
                                    <button
                                      className="bg-primary rounded text-white pe-3 ps-3 pt-1 pb-1 border-0"
                                      onClick={() =>
                                        handleClickDownload(el, "i")
                                      }
                                    >
                                      Descargar
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
