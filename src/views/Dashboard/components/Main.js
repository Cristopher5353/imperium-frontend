import { useEffect, useState } from "react";
import "./Main.css";
import Chart from "chart.js/auto";

var myChart = new Chart("myChart", {});

export const Main = () => {
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [totalOpenIncidents, setTotalOpenIncidents] = useState(0);
  const [totalCloseIncidents, setTotalCloseIncidents] = useState(0);
  const [totalIncidentsByCategory, settotalIncidentsByCategory] = useState([]);

  const getTotalIncidents = async () => {
    let token = localStorage.getItem("token");

    try {
      let fetchTotalIncidents = await fetch(
        `http://127.0.0.1:8000/api/incidents/get/totalIncidents`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let jsonFetchTotalIncidents = await fetchTotalIncidents.json();
      let status = jsonFetchTotalIncidents.status;

      if (status === 200) {
        setTotalIncidents(jsonFetchTotalIncidents.data);
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    }
  };

  const getTotalOpenIncidents = async () => {
    let token = localStorage.getItem("token");

    try {
      let fetchTotalOpenIncidents = await fetch(
        `http://127.0.0.1:8000/api/incidents/get/totalOpenIncidents`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let jsonFetchTotalOpenIncidents = await fetchTotalOpenIncidents.json();
      let status = jsonFetchTotalOpenIncidents.status;

      if (status === 200) {
        setTotalOpenIncidents(jsonFetchTotalOpenIncidents.data);
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    }
  };

  const getTotalCloseIncidents = async () => {
    let token = localStorage.getItem("token");

    try {
      let fetchTotalCloseIncidents = await fetch(
        `http://127.0.0.1:8000/api/incidents/get/totalCloseIncidents`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let jsonFetchTotalCloseIncidents = await fetchTotalCloseIncidents.json();
      let status = jsonFetchTotalCloseIncidents.status;

      if (status === 200) {
        setTotalCloseIncidents(jsonFetchTotalCloseIncidents.data);
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    }
  };

  const getTotalIncidentsByCategory = async () => {
    let token = localStorage.getItem("token");

    try {
      let fetchTotalIncidentsByCategory = await fetch(
        `http://127.0.0.1:8000/api/incidents/get/totalIncidentsByCategory`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let jsonFetchTotalIncidentsByCategory =
        await fetchTotalIncidentsByCategory.json();
      let status = jsonFetchTotalIncidentsByCategory.status;

      if (status === 200) {
        settotalIncidentsByCategory(jsonFetchTotalIncidentsByCategory.data);
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde");
    } finally {
      document.getElementById("container-dashboard").style.opacity = 1;
      document.querySelector(".loader").style.display = "none";
    }
  };

  useEffect(() => {
    getTotalIncidents();
    getTotalOpenIncidents();
    getTotalCloseIncidents();
    getTotalIncidentsByCategory();
  }, []);

  useEffect(() => {
    myChart.destroy();

    myChart = new Chart("myChart", {
      type: "bar",
      data: {
        labels: totalIncidentsByCategory.map((row) => row.name),
        datasets: [
          {
            label: "# cantidad de incidencias",
            data: totalIncidentsByCategory.map((row) => row.quantity),
          },
        ],
      },
    });
  }, [totalIncidentsByCategory]);

  return (
    <div id="main" className="main">
      <div className="pagetitle">
        <h1>Dashboard</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">Inicio</li>
            <li className="breadcrumb-item active">Dashboard</li>
          </ol>
        </nav>
        <div className="container-loader">
          <span className="loader"></span>
        </div>
        <div style={{ opacity: 0 }} id="container-dashboard">
          <div className="mt-4 mb-4 container-information">
            <div className="p-5 bg-light text-center item-information">
              <h2 className="mt-3">{totalIncidents}</h2>
              <h4>Total de Incidencias</h4>
              <i className="fa-solid fa-globe fs-2 text-primary"></i>
            </div>
            <div className="p-5 bg-light text-center item-information">
              <h2 className="mt-3">{totalOpenIncidents}</h2>
              <h4>Total de Incidencias abiertas</h4>
              <i className="fa-solid fa-globe fs-2 text-primary"></i>
            </div>
            <div className="p-5 bg-light text-center item-information">
              <h2 className="mt-3">{totalCloseIncidents}</h2>
              <h4>Total de Incidencias cerradas</h4>
              <i className="fa-solid fa-globe fs-2 text-primary"></i>
            </div>
          </div>
          <div className="p-5 bg-light text-center item-information">
            <canvas id="myChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};
