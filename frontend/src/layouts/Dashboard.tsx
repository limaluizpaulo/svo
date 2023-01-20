import { Outlet, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSvo } from "../context/svo";

export default function Layout() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const { selectedId, setSelectedId, protocolo,
    numeroDaOcorrencia,
    anoOcorrencia, } = useSvo();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/login");
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  });

  const add = window.location.pathname === "/add-ocorrencia" ? true : false;

  const handlePrevId = () => {
    if (selectedId < 2) {
      return;
    } else {
      setSelectedId(selectedId - 1);
    }
  };

  const handleNextId = () => {
    setSelectedId(selectedId + 1);
  };

  return (
    <div className="dashboard-layout">

      <header className="navbar navbar-light sticky-top bg-light flex-md-nowrap py-2 pe-4 shadow">
        <a
          className="bg-light text-center col-md-3 col-lg-2 me-0 px-3 fs-6 border-none"
          href="/"
        >
          <img
            className="p-1"
            src="/logo-dashboard.png"
            alt=""
            width="100"
            height="43"
          />
        </a>
        <button
          className="navbar-toggler position-absolute collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-nav">

          <div className="nav-item text-nowrap">




            {add && (
              <div className="d-flex justify-content-between"
              >
                <div className="d-flex justify-content-around" style={{ width: "500px" }}>
                  <h3 style={{ color: "#007bff" }
                  }>Protocolo : {protocolo} </h3>
                  <h3
                    style={{ color: "#222F4D" }}
                  >
                    {" "}
                    Controle: {numeroDaOcorrencia} / {anoOcorrencia}
                  </h3>
                </div>


                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-primary me-2"
                    onClick={handlePrevId}
                  >
                    <i className="fas fa-arrow-left
              "></i>
                  </button>
                  <button className="btn btn-primary " onClick={handleNextId}>

                    <i className="fas fa-arrow-right"></i>

                  </button>
                </div>
              </div>

            )}


          </div>
        </div>


      </header>

      <div className="container-fluid h-100">
        <div className="row h-100">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2  bg-custom sidebar collapse"
          >
            <div className="position-sticky pt-3 px-4"

              style={{ overflowY: 'auto', height: '100vh' }}

            >
              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                <span className="mt-4 mb-4">Menu</span>
                <a
                  className="link-secondary"
                  href="#"
                  aria-label="Add a new report"
                >
                  <span
                    data-feather="plus-circle"
                    className="align-text-bottom"
                  ></span>
                </a>
              </h6>
              <ul className="nav flex-column mb-2 ">
                <li className="nav-item">
                  <Link className="fs-6 nav-link mb-2" to="/">
                    <span
                      data-feather="file-text"
                      className="align-text-bottom"
                    ></span>
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="fs-6 nav-link mb-2" to="/falecidos">
                    <span
                      data-feather="file-text"
                      className="align-text-bottom"
                    ></span>
                    Falecidos
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="fs-6 nav-link mb-2" to="/enderecos">
                    <span
                      data-feather="file-text"
                      className="align-text-bottom"
                    ></span>
                    Endereços
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="fs-6 nav-link mb-2" to="/viaturas">
                    <span

                      data-feather="file-text"
                      className="align-text-bottom"
                    ></span>
                    Viaturas
                  </Link>
                </li>
                <li>
                  <Link className="fs-6 nav-link mb-2" to="/motoristas">
                    <span


                      data-feather="file-text"
                      className="align-text-bottom"
                    ></span>
                    Motoristas
                  </Link>
                </li>

                <li>
                  <Link className="fs-6 nav-link mb-2" to="/atendentes">
                    <span
                      data-feather="file-text"
                      className="align-text-bottom"
                    ></span>
                    Atendentes
                  </Link>
                </li>
                <li>
                  <Link className="fs-6 nav-link mb-2" to="/medicos">
                    <span

                      data-feather="file-text"
                      className="align-text-bottom"
                    ></span>
                    Médicos
                  </Link>
                </li>
                <li>
                  <Link className="fs-6 nav-link mb-2" to="/familiares">
                    <span

                      data-feather="file-text"
                      className="align-text-bottom"
                    ></span>
                    Familiares
                  </Link>
                </li>

                <li>
                  <Link className="fs-6 nav-link mb-2" to="/hospitais">
                    <span

                      data-feather="file-text"
                      className="align-text-bottom"

                    ></span>
                    Hospitais
                  </Link>
                </li>
                <li>
                  <Link className="fs-6 nav-link mb-2" to="/declaracoes">
                    <span

                      data-feather="file-text"
                      className="align-text-bottom"
                    ></span>
                    Declarações
                  </Link>
                </li>
                <li>
                  <Link className="fs-6 nav-link mb-2" to="/ocorrencias">
                    <span

                      data-feather="file-text"
                      className="align-text-bottom"
                    ></span>
                    Ocorrências
                  </Link>
                </li>
                <li>
                  <Link className="fs-6 nav-link mb-2" to="/escrivaes">
                    <span
                      data-feather="file-text"
                      className="align-text-bottom"
                    ></span>
                    Escrivães
                  </Link>
                </li>
                <li>
                  <Link className="fs-6 nav-link mb-2" to="/delegacias">
                    <span
                      data-feather="file-text"
                      className="align-text-bottom"
                    ></span>
                    Delegacias
                  </Link>
                </li>

                <li>
                  <Link className="fs-6 nav-link mb-2" to="/agentes">
                    <span

                      data-feather="file-text"
                      className="align-text-bottom"
                    ></span>
                    Agentes
                  </Link>
                </li>

                 /*   <button
                  className="btn btn-secondary text-white nav-link px-3"
                  onClick={() => handleLogout()}
                >
                  Sair
                </button>*/



                {/* <li className="nav-item">
                  <a className="fs-6 nav-link mb-2" href="#">
                    <span
                      data-feather="file-text"
                      className="align-text-bottom"
                    ></span>
                    About
                  </a>
                </li> */}
              </ul>
            </div>
          </nav>



          <main className={`h-100 ms-sm-auto px-md-4 ${sidebarCollapsed ? "col-md-12" : "col-md-9 col-lg-10"}`}>

            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
