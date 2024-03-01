import { useRef } from "react";

const Filtros = ({cambiarFiltro}) => {
  const tipoEvento=useRef(null);
  const lugar=useRef(null);  

  const handleChange=(e)=>{
    
    if (e.target.id=="lugar_") {
        tipoEvento.current.value="";
        cambiarFiltro(e.target.value);
    }
    if (e.target.id=="event") {
        lugar.current.value="";
        cambiarFiltro(e.target.value);
    }
    console.log(tipoEvento.current.value);
    console.log(lugar.current.value);
    
  }

  return <div>
         <select onChange={handleChange} name="" id="event" ref={tipoEvento}>
            <option value="">Seleciona una opcion</option>
            <option value="ensayo">Ensayo con Bandas</option>
            <option value="concurso">Concurso</option>
            <option value="coronacion">Coronación</option>
         </select>
         <select onChange={handleChange} name="" id="lugar_" ref={lugar}>
            <option value="">Seleciona una opcion</option>
            <option value="departamento">Departamento </option>
            <option value="provincia">Provincia</option>
         </select>
       

        </div>;
};

export default Filtros;
