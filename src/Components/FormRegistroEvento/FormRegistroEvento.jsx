import { useState } from "react";
import { uploadFile } from "../../firebase/config";
import UploadImage from "../UploadImage/UploadImage";


const prevForm = {
    Organizadores_cod_organizador: "0",
    nombreOrganizador: "",
    nombre_concurso: "",
    tipos_evento_cod_tipo: "",
    lugar: "",
    fecha: "",
    hora: "",
    numContacto: "",
    yape: "",
    plin: "",
    linkMaps: "",
    linkBases: "",
    linkTransmision: "",
    banner_con: "",
    premiun: "0",
    cod_ciudad:"5",
    registroactive: "0",
    modalidades: [],
    categorias: [],
    Administradores_cod_admin: "3",
  };


const FormRegistroEvento=()=>{
 const [formSinRegistro,setFormSinRegistro]=useState(prevForm);
 const [file,setFile]=useState('');
 
 const handleChange=(e)=>{
    setFormSinRegistro((prevForm)=>({...prevForm,[e.target.name]:e.target.value}));
 }
    return(<>
      <p>Registro Evento</p>
       <select name="" id="">
         <option value="">Seleccione la Organizacion a Cargo del Evento</option>
       </select>
       <select name="" id="">
        <option value="">
            <option value="">Ingresa la ciudad del Evento</option>
        </option>
       </select>
       <input type="text" onChange={handleChange} name='nombre_concurso' value={formSinRegistro.nombre_concurso}   placeholder="Ingresa el Nombre del Evento" />
       <input type="text" onChange={handleChange} name="lugar" value={formSinRegistro.lugar}  placeholder="Unicación del Evento"/>
       <label htmlFor="">Ingresa la Fecha del Evento</label>
       <input type="date" onChange={handleChange} name="fecha" value={formSinRegistro.fecha}/>
       <label >Ingresa la Hora del Evento</label>
       <input type="time" onChange={handleChange} name="hora" value={formSinRegistro.hora}/>
       <input type="text" onChange={handleChange} name="numContacto" value={formSinRegistro.numContacto}placeholder="Número de Contacto"/>
       <input type="text" onChange={handleChange} name="yape" value={formSinRegistro.yape}  placeholder="Número de Yape"/>
       <input type="text" onChange={handleChange} name="plin" value={formSinRegistro.plin}  placeholder="Número de Plin"/>
       <input type="text" onChange={handleChange} name="linkMaps" value={formSinRegistro.linkMaps}  placeholder="Enlace de Google Maps"/>
       <input type="text" onChange={handleChange} name="linkBases" value={formSinRegistro.linkBases} placeholder="Enlace para las Bases"/>
       <input type="text" onChange={handleChange} name="fecha" value={formSinRegistro.linkTransmision} placeholder="Enlace de la red Social"/>
       <UploadImage file={file} setFile={setFile} />
       <button>Registrar</button>

    </>)
}

export default FormRegistroEvento