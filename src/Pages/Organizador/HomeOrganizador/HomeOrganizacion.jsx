
import { useState ,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { helphttp } from "../../../Helpers/helphttps"
import './HomeOrg.css'
const HomeOrganizacion=()=>{
    const navigate = useNavigate();
    const api = helphttp();
     const cod_orga=useParams().cod_orga;
    const url= `https://server.eventosdemarinera.com/userorg/concursos/${cod_orga}`

    const [concursos,setConcursos]=useState([])
    
    useEffect(() => {
        const obtenerCon = async () => {
          try {
            const data = await api.get(url);
            setConcursos(data);
            console.log(data);
          } catch (error) {
            console.log("Ocurrio un error");
          }
        };
        obtenerCon();
      }, []);

      const navegar=(cod,nombreC)=>{
        const sinEspacios = nombreC.replace(/\s/g, '');
      const   nombre = sinEspacios.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        navigate(`/Organizacion/Concurso/${nombre}/${cod}`);
      }
    return(<div className="conten-Eventos">
      <h1>Concursos</h1>
      <div className="cardsEvent">
      {concursos.map((con,i)=>(
          <div key={i} className="event-card">
            <p>{con.nombre_concurso}</p>
            <button onClick={()=>navegar(con.cod_concurso,con.nombre_concurso)}>Ver Inscritos</button>
            </div>

    ))}
      </div>
    </div>

        
    )
}

export default HomeOrganizacion