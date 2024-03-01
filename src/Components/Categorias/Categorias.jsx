import { helphttp } from "../../Helpers/helphttps";

import { useEffect, useState } from "react";
import './cat.css'

const Categorias=({categorias,guardarDatoc})=>{

  const cat=categorias;
  const handleChange=(e)=>{
    guardarDatoc(e.target.value)
  }
   return(
    <select onChange={handleChange} name="" id="cat_select">
        <option value="">2- Selecciona una categoria</option>
        {cat.map((categoria,i)=>{
           return <option key={i} value={categoria.cod_categoria}>{categoria.nombre_cat}</option>
        })}
    </select>
   )
}

export default Categorias