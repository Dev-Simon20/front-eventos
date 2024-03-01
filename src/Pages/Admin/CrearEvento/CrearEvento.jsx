import { useEffect, useState } from "react";
import { helphttp } from "../../../Helpers/helphttps";
import { uploadFile } from "../../../firebase/config";
import "./CrearEvento.css";
import CreDelModalidades from "../../../Components/CreDelModalidades/CreDelModalidaes";
import UploadImage from "../../../Components/UploadImage/UploadImage";
import CreDelCategorias from "../../../Components/CreDelCategorias/CreDelCategorias";
import FormRegistroEvento from "../../../Components/FormRegistroEvento/FormRegistroEvento";

const prevForm = {
     Organizadores_cod_organizador: "",
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
     cod_ciudad: "",
     registroactive: "0",
     modalidades: [],
     categorias: [],
     Administradores_cod_admin: "3",
};

const tiposEvent = [
     { cod_tipo: "1", nombre: "Aniversario" },
     { cod_tipo: "2", nombre: "Concurso" },
     { cod_tipo: "3", nombre: "Coronación de Reinas" },
     { cod_tipo: "4", nombre: "Ensayo con Bandas" },
     { cod_tipo: "5", nombre: "Solidario" },
];

const CrearEvento = () => {
     const [organizadores, setorganizadores] = useState([]);
     const [departamentos, setDepartamentos] = useState([]);
     const [imagAgredada, setimagenAgregada] = useState("");
     const [continuar,setContinuar]=useState(false);
     const [form, setForm] = useState(prevForm);
     const [file, setFile] = useState("");

     const api = helphttp();
     const url = "https://server.eventosdemarinera.com/useradmin/listOrganizadores";
     const url_createEvent = "https://server.eventosdemarinera.com/useradmin/createEvento";
     const url_Depar = "https://server.eventosdemarinera.com/shared/listaDepar";
     // Se Traeran las ciudades
     // Se traeran las organizaciones
     useEffect(() => {
          const obtenerData = async () => {
               try {
                    const data = await api.get(url);
                    const dataDep = await api.get(url_Depar);
                    setorganizadores(data);
                    setDepartamentos(dataDep);
                    if (data.err) {
                         throw new Error("No se encontraron modalidades");
                    }
               } catch (error) {
                    console.log(error.message);
               }
          };
          obtenerData();
     }, []);

     useEffect(() => {
          const senData = async () => {
               try {
                    if (imagAgredada) {
                         let opciones = {
                              body: form,
                              headers: { "content-type": "application/json" },
                         };
                         const consult = await api.post(
                              url_createEvent,
                              opciones
                         );
                         setimagenAgregada(false);
                         alert("Concurso Agregado");
                    }
               } catch (error) {
                    console.log(error.message);
               }
          };
          senData();
     }, [imagAgredada]);

     // Subir la imagen y setear el form
     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               if (file) {
                    const urlResult = await uploadFile(file);
                    setForm((form) => ({ ...form, banner_con: urlResult }));
                    setimagenAgregada(true);
               }
          } catch (error) {
               console.log(error.message);
          }
     };


     const handleChange = (e) => {
          setForm((prevform) => ({
               ...prevform,
               [e.target.name]: e.target.value,
          }));
     };

     const handleCheckBox = (e) => {
          setForm((prevform) => ({
               ...prevform,
               [e.target.name]: e.target.value == 1 ? 0 : 1,
          }));
          console.log(e.target.name);
          if (e.target.name == "registroactive") {
               setForm((prevform) => ({
                    ...prevform,
                    modalidades: [],
                    categorias: [],
               }));
          }
     };

     const obtenerTipoEvento = (cod) => {
          setForm((prevform) => ({
               ...prevform,
               tipos_evento_cod_tipo: cod,
          }));
     };
     const regresar=(e)=>{
      e.preventDefault();
      setForm(prevForm)
     }
     const handleContinuar=(e)=>{
      e.preventDefault();
       setContinuar(true);
     }
     const cancelar=()=>{
        setForm(prevForm);
        setContinuar(false)
     }
     return (
          <>
               <h1 className="titCre">Creacion de Eventos</h1>
               {!form.tipos_evento_cod_tipo&&<article className="container-eventos" >
                    <h2 className="subCre">Elija el tipo de Evento a Crear</h2>
                    <article className="events-cont">
                         <section
                              onClick={() => obtenerTipoEvento(1)}
                              className="containerTipoEvento"
                         >
                              <p>Aniversario</p>
                         </section>
                         <section
                              onClick={() => obtenerTipoEvento(2)}
                              className="containerTipoEvento"
                         >
                              <p>Concurso</p>
                         </section>
                         <section
                              onClick={() => obtenerTipoEvento(3)}
                              className="containerTipoEvento"
                         >
                              <p>Coronacion de Reinas</p>
                         </section>
                         <section
                              onClick={() => obtenerTipoEvento(4)}
                              className="containerTipoEvento"
                         >
                              <p>Ensayos con Banda </p>
                         </section>
                         <section
                              onClick={() => obtenerTipoEvento(5)}
                              className="containerTipoEvento"
                         >
                              <p>Solidario</p>
                         </section>
                    </article>
               </article>}
               {form.tipos_evento_cod_tipo && !continuar?
               <form className="formu"  action="">
                <button onClick={regresar} className="buttonCancel">Cancelar</button>
                     <section className="inputs">
                          <div className="part1">
                               <select
                                    name="Organizadores_cod_organizador"
                                    onChange={handleChange}
                               >
                                    <option value="">
                                         Seleccione la Organizacion
                                    </option>
                                    {organizadores.map((org, i) => (
                                         <option
                                              key={i}
                                              value={org.cod_organizador}
                                         >
                                              {org.nombre_org}
                                         </option>
                                    ))}
                               </select>
                               <select
                                    name="cod_ciudad"
                                    onChange={handleChange}
                               >
                                    <option value="">
                                         Seleccione un departamnto
                                    </option>
                                    {departamentos.map((dep, i) => (
                                         <option
                                              key={i}
                                              value={dep.cod_ciudad}
                                         >
                                              {dep.nombre}
                                         </option>
                                    ))}
                               </select>
                               <input
                                    type="text"
                                    name="nombre_concurso"
                                    onChange={handleChange}
                                    placeholder="Ingrese el Nombre del Concurso"
                               />

                               <input
                                    type="text"
                                    onChange={handleChange}
                                    name="lugar"
                                    placeholder="Ingrese el lugar del Evento"
                               />
                               <input
                                    type="date"
                                    onChange={handleChange}
                                    name="fecha"
                                    placeholder="ingrese la Fecha del Evento"
                               />
                               <input
                                    type="time"
                                    onChange={handleChange}
                                    name="hora"
                                    placeholder="Ingrese la Hora del Evento"
                               />
                          </div>
                          <div className="part2">
                               <input
                                    type="text"
                                    onChange={handleChange}
                                    name="numContacto"
                                    placeholder="Ingrese el Número de Contacto"
                               />
                               <input
                                    type="text"
                                    onChange={handleChange}
                                    name="yape"
                                    placeholder="Ingrese el Número de Yape"
                               />
                               <input
                                    type="text"
                                    onChange={handleChange}
                                    name="plin"
                                    placeholder="Ingrese el Número de Plin"
                               />
                               <input
                                    type="text"
                                    onChange={handleChange}
                                    name="linkMaps"
                                    placeholder="Ingresa el Link del Mapa"
                               />
                               <input
                                    type="text"
                                    onChange={handleChange}
                                    name="linkBases"
                                    placeholder="Ingresa el Link de las bases"
                               />
                               <input
                                    type="text"
                                    onChange={handleChange}
                                    name="linkTransmision"
                                    placeholder="Link de red Social"
                               />
                          </div>
                     </section>
                     <section className="imgCreateEvento">
                          <UploadImage file={file} setFile={setFile} />
                      </section>
                      { form.tipos_evento_cod_tipo==2 && form.tipos_evento_cod_tipo?
                      <div className="check">
                        <label>¿El Evento tendra Registro?</label>
                        <input 
                         type="checkbox"
                         onChange={handleCheckBox}
                        name="registroactive"
                        value={form.registroactive}
                         ></input>
                     </div>:<></>}
                       { form.tipos_evento_cod_tipo!=2 &&
                      <button onClick={handleSubmit} className="buttonSend" name="enviar" type="submit">
                               Crear Evento
                      </button>}
                      {
                        form.tipos_evento_cod_tipo==2 && form.registroactive == 1?
                        <button onClick={handleContinuar} className="buttonSend" name="enviar" type="submit">
                                Siguiente
                      </button>:<></>
                      }
                      { form.tipos_evento_cod_tipo==2 && form.registroactive == 0?
                      <button onClick={handleSubmit} className="buttonSend" name="enviar" type="submit">
                               Crear Evento
                      </button>:<></>}
                </form>:<></>
               }
                {form.tipos_evento_cod_tipo && continuar &&
                 <section className="sec_cat_mod">
                    <button onClick={cancelar} className="buttonCancel">cancelar</button>
                    <div className="conten_mod_cat">
                       <div className="cont_mod_ce">
                       <CreDelModalidades form={form} setForm={setForm}></CreDelModalidades>
                       </div>
                        <div className="cont_CAT_ce">
                        <CreDelCategorias form={form} setForm={setForm}></CreDelCategorias>
                        </div>
                    </div>
                    <button onClick={handleSubmit} className="buttonSend" name="enviar" type="submit">
                               Crear Evento
                    </button>
                 </section>
                }
          </>
     );
};
export default CrearEvento;
