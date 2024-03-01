import { useState,useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { helphttp } from "../../Helpers/helphttps"
const TablaEventos=()=>{
    const [eventos,setEventos]=useState([]);
    const api=helphttp();
    const url="https://server.eventosdemarinera.com/useradmin/dataEventos";
    const navigate = useNavigate();
    useEffect(()=>{
        const obtenerEventos= async()=>{
          try {
             const data= await api.get(url);
             setEventos(data);
             console.log(data);
          } catch (error) {
            console.log("Ocurrio un error");
          }
        }
        obtenerEventos();
      },[]);

   const navegar=(cod_concurso,nom)=>{
    const sinEspacios = nom.replace(/\s/g, '');
    const sinTildes = sinEspacios.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    navigate(`/administrador/eventos/${sinTildes}/${cod_concurso}`);
   }
    return(<div>
         <table className="table-notas">
          <thead>
            <tr>
              <th>Nombre Evento</th>
              <th>Lugar</th>
              <th>Fecha</th>
              <th>Tipo de Evento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
             {eventos.map((e,i)=>(
                 <tr key={i}>
                 <td>
                  {e.nombre_concurso}
                 </td>
                 <td>
                   {e.lugar}
                 </td>
                 <td>
                   {e.fecha}
                 </td>
                 <td>
                   {e.nombre}
                 </td>
                 <td>
                   <button onClick={()=>navegar(e.cod_concurso,e.nombre_concurso)}>Ver Participantes</button><button>Editar</button><button>Agregar Bases</button>
                 </td>
               </tr>
             ))}
          </tbody>
        </table>
    </div>)
}

export default TablaEventos