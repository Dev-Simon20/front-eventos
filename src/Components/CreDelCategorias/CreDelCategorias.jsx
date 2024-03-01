import { useEffect } from "react";
import { useState } from "react"
import './CreDelCat.css'

const categoriasDefault=[
    {
        año_max: 0,
        año_min: 0,
        cod_categoria: 1,
        nombre_cat: "Pre Infante"
    },
    {
        año_max: 0,
        año_min: 0,
        cod_categoria: 2,
        nombre_cat: "Infante"
    },
    {
        año_max: 0,
        año_min: 0,
        cod_categoria: 3,
        nombre_cat: "Infantil"
    },
    {
        año_max: 0,
        año_min: 0,
        cod_categoria: 4,
        nombre_cat: "Junior"
    },
    {
        año_max: 0,
        año_min: 0,
        cod_categoria: 5,
        nombre_cat: "Juvenil"
    },
    {
        año_max: 0,
        año_min: 0,
        cod_categoria: 6,
        nombre_cat: "Adulto"
    },
    {
        año_max: 0,
        año_min: 0,
        cod_categoria: 7,
        nombre_cat: "Senior"
    },
    {
        año_max: 0,
        año_min: 0,
        cod_categoria: 8,
        nombre_cat: "Master"
    },
    {
        año_max: 0,
        año_min: 0,
        cod_categoria: 9,
        nombre_cat: "Oro"
    }
]

const catt={año_max:"",
año_min:"",
nombre_cat:""}

const CreDelCategorias=({form,setForm})=>{
 
    const [categorias,setCategorias]=useState(categoriasDefault);
    const [agregar,setAgregar]=useState(false);
    const [cat,setCat]=useState(catt)
   
    useEffect(()=>{
        setForm(prevform=>({...prevform,categorias:categorias}));
    },[categorias])
    
    const clickAgregar=()=>{
           setAgregar(!agregar);
    }
    const clickGuardar=()=>{
        setCategorias([...categorias,cat]);
        setCat(catt)
    }
    const handleChange=(e)=>{
        setCat(cat=>({...cat,[e.target.name]:e.target.value}));
    }
    const eliminar=(codigo)=>{
       const filtrar=categorias.filter(cat=>cat.cod_categoria!==codigo);
       setCategorias(filtrar);
    }
    const cambioanho=(e,codigo)=>{
        let cat= categorias.map((cat)=>{
            if(codigo==cat.cod_categoria){
                cat[e.target.name]=e.target.value
            }
            return cat;
        })
        setCategorias(cat)
    }

        return(<section >
            {categorias.map((categoria,i)=>(
                <div className="cat" key={i}>
                <p>{categoria.nombre_cat}</p>
                <input type="text" name="año_min" value={categoria.año_min} onChange={(e)=>cambioanho(e,categoria.cod_categoria)}/>
                <input type="text" name="año_max" value={categoria.año_max} onChange={(e)=>cambioanho(e,categoria.cod_categoria)}/>
                <i onClick={()=>eliminar(categoria.cod_categoria)} className="fa-regular fa-trash-can"></i>
            </div>
            ))}

            <button type="button" className="addMod" onClick={clickAgregar}>{agregar?<i className="fa-solid fa-circle-minus"></i>:<i className="fa-solid fa-circle-plus"></i>}</button>
            
            {agregar&&<div className="addNewCat">
                <input name="nombre_cat" value={cat.nombre_cat} type="text" placeholder="Nombre de Categoria" onChange={handleChange}/>
                <input type="text" value={cat.año_min} placeholder="Año Mínimo" name="año_min" onChange={handleChange} />
                <input type="text"value={cat.año_max} placeholder="Año Máximo" name="año_max" onChange={handleChange} />
                <button type="button" onClick={clickGuardar}>Guardar</button>
            </div>}
        </section>)
}

export default CreDelCategorias