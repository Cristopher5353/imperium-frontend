import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useLoading } from "../../hooks/useLoading";

export const IncidenceResponseShow = () => {
  const { id } = useParams();
  const [incidenceResponse, setIncidenceResponse] = useState({});
  const { loading, startLoading, stopLoading } = useLoading();

  const getIncidenceResponse = async () => {
    startLoading();

    let token = localStorage.getItem("token");

    try {
      let fetchIndicenceResponse = await fetch(
        `http://127.0.0.1:8000/api/incidents/${id}/response`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let jsonFetchIncidenceResponse = await fetchIndicenceResponse.json();
      let status = jsonFetchIncidenceResponse.status;

      if (status === 200) {
        setIncidenceResponse(jsonFetchIncidenceResponse.data);
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    } finally {
      stopLoading();
    }
  };

  const handleClickDownload = async (el) => {
    let token = localStorage.getItem("token");

    try {
      let fetchGetDocument = await fetch(
        `http://127.0.0.1:8000/api/incidents/response/document/${el}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let jsonFetchGetDocument = await fetchGetDocument.json();
      let status = jsonFetchGetDocument.status;

      if (status === 200) {
        try {
          await fetch(
            `http://127.0.0.1:8000/api/private/documents_response/${jsonFetchGetDocument.data.document}`,
            {
              method: "POST",
              headers: {
                responseType: "blob",
                Authorization: `Bearer ${token}`,
              },
            }
          ).then((response) =>
            response.blob().then((success) => {
              const url = window.URL.createObjectURL(new Blob([success]));
              const link = document.createElement("a");
              link.href = url;

              link.setAttribute("download", "documento.pdf");
              document.body.appendChild(link);
              link.click();
            })
          );
        } catch (error) {
          alert("Error, vuelva a intentarlo más tarde" + error);
        }
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde", error);
    }
  };

  useEffect(() => {
    getIncidenceResponse();
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
          <h1 className="mt-3">Respuesta Incidencia</h1>

          {loading ? (
            <div className="container-loader">
              <span className="loader"></span>
            </div>
          ) : (
            <div id="response-incidence-show">
              <strong>Respuesta</strong>
              <textarea
                className="form-control"
                id="response"
                name="response"
                rows="10"
                placeholder={incidenceResponse.response}
                disabled
              ></textarea>
              <div className="mt-3">
                <strong>Documentos Adicionales</strong>
                {incidenceResponse.id_documents === null ? (
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
                      {String(incidenceResponse.id_documents)
                        .split(",")
                        .map((el, index) => (
                          <tr key={index}>
                            <td>{"Documento N° " + (index + 1)}</td>
                            <td>
                              <button
                                className="bg-primary rounded text-white pe-3 ps-3 pt-1 pb-1 border-0"
                                onClick={() => handleClickDownload(el)}
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
          )}
        </div>
      </div>
    </>
  );
};
