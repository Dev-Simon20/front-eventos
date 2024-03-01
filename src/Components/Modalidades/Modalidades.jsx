import { useEffect, useRef, useState } from "react";
import { helphttp } from "../../Helpers/helphttps";
import './mod.css'
import Select from "react-select";
const Modalidades= ({guardarDatom,modalidades})=>{
    const mod=  modalidades;
      const handleChange=(e)=>{
        guardarDatom(e.target.value);
      }
       return(
        <select onChange={handleChange} name="" id="modalidades_select">
            <option key={24892374} value="">1- Selecciona una modalidad </option>
            {mod.map((mod,i)=>{
               return <option key={i}  value={mod.cod_modalidad.toString()}>{mod.nombre_mod}</option>
            })}
        </select>
       )
}

export default Modalidades