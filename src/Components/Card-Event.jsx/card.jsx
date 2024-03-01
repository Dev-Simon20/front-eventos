import "./card.css";
import formatoFecha from "../../functions/formatoFecha";
import { useNavigate } from 'react-router-dom'
import BotonCards from "../BotonCards/BotonCards";
import { useEffect, useState } from "react";
import { helphttp } from "../../Helpers/helphttps";
const Card = ({ evento }) => {
  
  const [modalidades,setModalidades]=useState(null);
  const [estilo,setEstilo]=useState({color:'red'})
  const {cod_concurso,fecha,hora,lugar,nombre_concurso,premiun,banner_con,
    tipos_evento_cod_tipo,registroactive}=evento;
  const api = helphttp();
  const url = `https://server.eventosdemarinera.com/userpar/datoscon/${cod_concurso}`;
  useEffect(()=>{
    const obtenerData = async () => {
      try {
        const data = await api.get(url);
        setModalidades(data[1]);
      } catch (error) {
        console.log("No se pudo ontener los datos");
      }
    };
    obtenerData();
  },[])

  const tip=tipos_evento_cod_tipo;
  useEffect(()=>{
    if (tip==1) {
      let color={backgroundColor:'#1dda8e'}
      setEstilo(color)
    }
    if (tip==2) {
      let color={backgroundColor:'#f0af37'}
      setEstilo(color)
    }
    if (tip==3) {
      let color={backgroundColor:'#8f3d8f'}
      setEstilo(color)
    }
    if (tip==4) {
      let color={backgroundColor:'#45204b'}
      setEstilo(color)
    }
    if (tip==5) {
      let color={backgroundColor:'#e7294f'}
      setEstilo(color)
    }
},[])


  const navigate=useNavigate();
  let imagenEvento =
    "https://www.iperu.org/wp-content/uploads/2015/12/danza-marinera-nortena.jpg";
    // `/loginProfesor/homeProfesor/listaAlumnos/calificacion/${cod_alumno}/${cod_curso}`

 const tipoEvento=(tipo)=>{
    switch (tipo) {
      case 1: return <div className="cf_tipo"><i style={estilo} className="fa-solid fa-wine-glass"></i><p>Aniversario</p></div>
      case 2: return <div className="cf_tipo"><i style={estilo} className="fa-solid fa-trophy"></i><p>Concurso</p></div>
      case 3: return <div className="cf_tipo"><i style={estilo} className="fa-solid fa-crown"></i><p>Coronación de Reinas</p></div>
      case 4: return <div className="cf_tipo"><i style={estilo} className="fa-solid fa-drum"></i><p>Ensayo con Bandas</p></div>
      case 5: return <div className="cf_tipo"><i style={estilo} className="fa-regular fa-handshake"></i><p>Solidario</p></div>
      default:
        break;
    }
 }
 const nombreEvento=(t,n)=>{
   if (t==4) {
     return `Ameniza: ${n} `
   }
   else{
    return n;
   }
 }

 
 const formatearHora = (hora) => {
  const horaObj = new Date(`2000-01-01T${hora}`);
  const horaFormateada = horaObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).toLowerCase();
  return horaFormateada;
};



  return (
    <div className="Card">
      <section className="cardHead">
        <img className="imgEvento" src={banner_con} alt={imagenEvento} />
      </section>
      <section className="cardFoot">
        <article className="cf_fecha"><i className="fa-regular fa-calendar"></i><p>{formatoFecha(fecha)}</p>
        </article>
        {tipoEvento(tipos_evento_cod_tipo)}
        <p className="c-nombre">{nombreEvento(tipos_evento_cod_tipo,nombre_concurso)}</p>
        <div className="cont-mod">
         {modalidades&&modalidades.map((mod,i)=>{
          return <p className="modxc" key={i}>{mod.nombre_mod}</p>
         })}
         </div>
         {modalidades&&console.log(modalidades.length)}
        <div style={modalidades&&modalidades.length>5?{bottom:'90px'}:{bottom:'110px'}} id="locacion-E" className="cf_tl"><i className="fa-solid fa-location-dot"></i><p>{lugar}</p></div>
        <div style={modalidades&&modalidades.length>5?{bottom:'65px'}:{bottom:'85px'}} id="fecha-E" className="cf_tl"><i className="fa-regular fa-clock"></i><p>{formatearHora(hora)}</p></div>
        <BotonCards nombreEvento={nombreEvento(tipos_evento_cod_tipo,nombre_concurso)} cod_concurso={cod_concurso} tipos_evento_cod_tipo={tipos_evento_cod_tipo}  premiun={premiun} registroactive={registroactive}/>
      </section>
    </div>
  );
};

export default Card;
