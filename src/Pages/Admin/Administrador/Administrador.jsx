import { Link, NavLink, Outlet } from "react-router-dom";
import "./Administrador.css";

const Administrador = () => {
  return (
    <div>
      <section className="admin-menu">
        <nav className="">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-Link allAc" : "optionMenu allAc"
            }
            to="/administrador"
            end
          >
            <i className="men-i fa-solid fa-house-user"></i>Inicio
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "active-Link allAc" : "optionMenu allAc"
            }
            to="/administrador/eventos"
           
          >
            {" "}
            <i className="men-i fa-regular fa-rectangle-list"></i> Lista de Eventos
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "active-Link allAc" : "optionMenu allAc"
            }
            to="/administrador/crearevento"
            end
          >
            <i className="men-i fa-solid fa-circle-plus"></i>Crear un evento
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "active-Link allAc" : "optionMenu allAc"
            }
            to="/administrador/listaorganizadores"
            end
          >
            <i className="men-i fa-solid fa-user-plus"></i>Crear Organizador
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "active-Link allAc" : "optionMenu allAc"
            }
            to="/administrador/eventospasados"
            end
          >
            <i className="men-i fa-solid fa-backward-fast"></i>Eventos Pasados
          </NavLink>
          
        </nav>
        <div className="bodyAdmin">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default Administrador;
