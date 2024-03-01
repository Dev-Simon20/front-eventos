import { useEffect, useState } from 'react'
import './modalP.css'
import { helphttp } from '../../Helpers/helphttps';

const ModalDatosPareja=({isOpen,closeModal,part})=>{
    const api=helphttp();
    const [form,setForm]=useState({nombre_1 :"",
    cod_participante:"",
    cod_registro:"",
    apellido_1:"",
    fecha_nac_1:"",
    dni_1:"",
    ciudad_1:"",
    academia_1:"",
    nombre_2:"",
    apellido_2:"",
    fecha_nac_2:"",
    dni_2:"",
    ciudad_2:"",
    academia_2:"",
    nombre_contacto:"",
    numero_contacto:"",
    Estados_cod_estado:"",
    num_pareja:""});
    
    useEffect(()=>{
        var for_defa={
            nombre_1 :part.nombre_1||"",
            cod_participante:part.cod_participante,
            cod_registro:part.cod_registro||"",
            apellido_1:part.apellido_1||"",
            fecha_nac_1:part.fecha_nac_1||"",
            dni_1:part.dni_1||"",
            ciudad_1:part.ciudad_1||"",
            academia_1:part.academia_1||"",
            nombre_2:part.nombre_2||"",
            apellido_2:part.apellido_2||"",
            fecha_nac_2:part.fecha_nac_2||"",
            dni_2:part.dni_2||"",
            ciudad_2:part.ciudad_2||"",
            academia_2:part.academia_2||"",
            nombre_contacto:part.nombre_contacto||"",
            numero_contacto:part.numero_contacto||"",
            Estados_cod_estado:part.Estados_cod_estado||"",
            num_pareja:part.num_pareja||"0"
           }
        setForm(for_defa);
    },[isOpen])


    const handleModalContainerClick = (e) => e.stopPropagation();
    const handleChange=(e)=>{
            setForm((form)=>({...form, [e.target.name]:e.target.value}));
    }

    const actualizar=async()=>{
        // /useradmin/actualizarParticipante
        const url = "https://server.eventosdemarinera.com/useradmin/actualizarParticipante";
        let opciones = {
            body: form,
            headers: { "Content-type": "application/json" },
          };
        const consult = await api.put(url,opciones);
        if (consult.actualizado) {
          alert("Se actualizo correctamente")
        }
        else {
            alert("Fallo la  actualizacion")
        }
    }
    return(
    <article className={`modalp ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-containerp" onClick={handleModalContainerClick}>
        <button onClick={closeModal}>X</button>
        <section className='container-form'>
            <article className='contenc1'>
                <input type="text" onChange={handleChange} name='nombre_1' value={form.nombre_1}/>
                <input type="text" onChange={handleChange} name='apellido_1' value={form.apellido_1} />
                <input type="text" onChange={handleChange} name='fecha_nac_1' value={form.fecha_nac_1} />
                <input type="text" onChange={handleChange} name='dni_1' value={form.dni_1} />
                <input type="text" onChange={handleChange} name='ciudad_1' value={form.ciudad_1} />
                <input type="text" onChange={handleChange} name='academia_1' value={form.academia_1} />
            </article>
 
            <article className='contenc2'>
                <input type="text" onChange={handleChange} name='nombre_2' value={form.nombre_2}/>
                <input type="text" onChange={handleChange} name='apellido_2' value={form.apellido_2}/>
                <input type="text" onChange={handleChange} name='fecha_nac_2' value={form.fecha_nac_2}/>
                <input type="text" onChange={handleChange} name='dni_2' value={form.dni_2}/>
                <input type="text" onChange={handleChange} name='ciudad_2' value={form.ciudad_2}/>
                <input type="text" onChange={handleChange} name='academia_2' value={form.academia_2}/>
            </article>
  
            <article className='conten-c'>
                <input type="text" onChange={handleChange} name='nombre_contacto' value={form.nombre_contacto}/>
                <input type="text" onChange={handleChange} name='numero_contacto' value={form.numero_contacto}/>
                <input type="text" onChange={handleChange} name='num_pareja' value={form.num_pareja}/>
            </article>
            <article className='conten-v'>
                <img src={part.voucher}style={{ width: '150px', height: '170px' }} alt="" />
            </article>
        </section>
        <button onClick={actualizar}>Actualizar</button>
      </div>
    </article>
    )
}

export default ModalDatosPareja