import { useState  } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { helphttp } from "../../../Helpers/helphttps";
import "./LoginOrg.css";
import log from "./log.webp";
const LoginOrganizador = ({usuarioLog,setusuarioLog}) => {
   const navigate=useNavigate();
   const api = helphttp();
   const url_log = "https://server.eventosdemarinera.com/userorg/loginOrganizador";
   const [usuario, setUsuario] = useState({
      usuario: "",
      contrasena: "",
   });

   const handleChange = (e) => {
      setUsuario((usuario) => ({
         ...usuario,
         [e.target.name]: e.target.value,
      }));
   };
   const send = () => {
      console.log(usuario);
      const senData = async () => {
         try {
            let opciones = {
               body: usuario,
               headers: { "content-type": "application/json" },
            };
            const consult = await api.post(url_log, opciones);
            if (consult.status===404) {
                 alert(consult.mess) 
            }
            else{
                setusuarioLog(consult)
                navigate(`/HomeOrganizacion/${consult.codigo}`);
            }
         } catch (error) {
            console.log(error);
         }
      };
      senData();
   };
   return (
      <article className="conten-login">
         <div className="conten-log">
            <section className="log-img">
               <img src={log} alt="" />
            </section>
            <section className="log-inputs">
               <h2>Inicio de Session</h2>
               <div>
                  <label>Ingrese su usuario</label>
                  <input type="text" name="usuario" onChange={handleChange} />
                  <label htmlFor="">Ingrese su contraseña</label>
                  <input
                     type="password"
                     name="contrasena"
                     onChange={handleChange}
                  />
               </div>
               <button onClick={send}>Iniciar Sesión</button>
            </section>
         </div>
      </article>
   );
};

export default LoginOrganizador;
