import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import RegisterAdmin from './components/register.admin';
import RegisterHours from './components/register.hour';
import ReportHours from './components/report.hours';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="container my-4">
        <header className="text-center mb-4">
          <h1 className="display-4">Sistema de Control de RRHH</h1>
        </header>

        <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
          <div className="container-fluid">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/register_admin" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Registrar Funcionarios
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/register_hours" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Registrar datos de entrada y salida
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/report_hours" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Reportes
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <div className="mt-4">
          <Routes>
            <Route path="/register_admin" element={<RegisterAdmin />} />
            <Route path="/register_hours" element={<RegisterHours />} />
            <Route path="/report_hours" element={<ReportHours />} />
            <Route
              path="/"
              element={
                <>
                  <h2 className="text-center">Bienvenido al Sistema</h2>
                  <p className="text-center">
                    Este sistema optimiza la gestión de personal, facilitando la inserción, modificación y eliminación de datos de empleados. Además, permite registrar de forma precisa los horarios de entrada y salida, generando reportes detallados sobre las horas trabajadas.
                  </p>

                  {/* Tarjetas de funcionalidades */}
                  <div className="row mt-4">
                    <div className="col-md-4">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Registrar Funcionarios</h5>
                          <p className="card-text">Administra, genera y visualiza los datos de los funcionarios.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Registrar datos de entrada y salida</h5>
                          <p className="card-text">Registra las horas de entrada y salida de los funcionarios.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Reportes</h5>
                          <p className="card-text">Consulta y genera reportes detallados de horas trabajadas.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
