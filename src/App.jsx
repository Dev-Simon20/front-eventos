import "./App.css";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ListaConcursoP from "./Pages/Participante/ListaConcurso/ListaConcursosP";
import RegistroPar from "./Pages/Participante/RegistroParticipante/RegistroParticipante";
import HomeAdministrador from "./Pages/Admin/HomeAdministrador/HomeAdministrador";
import CrearEvento from "./Pages/Admin/CrearEvento/CrearEvento";
import ListaOrganizadores from "./Pages/Admin/ListaOrganizadores/ListaOrganizadores";
import EventosPasados from "./Pages/Admin/EventosPasados/EventosPasados";
import Administrador from "./Pages/Admin/Administrador/Administrador";
import ListaEventosA from "./Pages/Admin/ListaEventosA/ListaEventosA";
import TablaConcursantes from "./Components/TablaConcursantes/TablaConcursantes";
import LoginOrganizador from "./Pages/Organizador/LoginOrganizador/LoginOrganizador";
import HomeOrganizacion from "./Pages/Organizador/HomeOrganizador/HomeOrganizacion";
import { useState } from "react";

function App() {
   const [usuarioLog,setusuarioLog]=useState('')
   return (
      <>
         <Router>
      <Routes>
        <Route path="/" element={<ListaConcursoP />} />
        <Route
          path="/registro/:nombreEvento/:cod_concurso"
          element={<RegistroPar />}
        />
        <Route
          path="/loginOrganizacion"
          element={<LoginOrganizador usuarioLog={usuarioLog} setusuarioLog={setusuarioLog} />}
        />
        <Route path="/HomeOrganizacion/:cod_orga" element={<HomeOrganizacion />} />

        <Route path="/Organizacion/Concurso/:nombre/:cod_concurso" element={<TablaConcursantes />} />

        <Route path="loginadmin"></Route>
        <Route path="/administrador" element={<Administrador />}>
          <Route index element={<HomeAdministrador />} />
          <Route
            path="/administrador/eventos"
            element={<ListaEventosA />}
          />
          <Route
            path="/administrador/eventos/:nombre/:cod_concurso"
            element={<TablaConcursantes />}
          />
          <Route
            path="/administrador/crearevento"
            element={<CrearEvento />}
          />
          <Route
            path="/administrador/listaorganizadores"
            element={<ListaOrganizadores />}
          />
          <Route
            path="/administrador/eventospasados"
            element={<EventosPasados />}
          />
        </Route>
      </Routes>
    </Router>
      </>
   );
}

export default App;
