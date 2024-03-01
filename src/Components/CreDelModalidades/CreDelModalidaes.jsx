import { useEffect } from "react";
import { useState } from "react";
import "./cre.css";

const modalidadesDefault = [
     {
          nombre_mod: "Novel Novel",
          tipo: "Pareja",
          precio: "0",
          cod_modalidad: "1",
     },
     {
          nombre_mod: "Novel Abierto",
          tipo: "Pareja",
          precio: "0",
          cod_modalidad: "2",
     },
     {
          nombre_mod: "Nacional",
          tipo: "Pareja",
          precio: "0",
          cod_modalidad: "3",
     },
     {
          nombre_mod: "Inclusión",
          tipo: "Pareja",
          precio: "0",
          cod_modalidad: "4",
     },
     {
          nombre_mod: "Individual Dama",
          tipo: "Individual",
          precio: "0",
          cod_modalidad: "5",
     },
     {
          nombre_mod: "Individual Varón",
          tipo: "Individual",
          precio: "0",
          cod_modalidad: "6",
     },
     {
          nombre_mod: "Seriado Dama",
          tipo: "Individual",
          precio: "0",
          cod_modalidad: "7",
     },
     {
          nombre_mod: "Seriado Varon",
          tipo: "Individual",
          precio: "0",
          cod_modalidad: "8",
     },
];

const CreDelModalidades = ({ form, setForm }) => {
     // form.modalidaes
     //1==RegistroPareja           2==RegistroIndividual
     const [modalidades, setmodalidaes] = useState(modalidadesDefault);
     const [agregar, setAgregar] = useState(false);

     const [mod, setMod] = useState({ nombre_mod: "", tipo: "", precio: "" });

     useEffect(() => {
          setForm((prevform) => ({ ...prevform, modalidades: modalidades }));
     }, [modalidades]);

     const clickAgregar = () => {
          setAgregar(!agregar);
     };
     const clickGuardar = () => {
          setmodalidaes([...modalidades, mod]);
     };
     const handleChange = (e) => {
          setMod((mod) => ({ ...mod, [e.target.name]: e.target.value }));
     };
     const eliminar = (nombre) => {
          const filtrar = modalidades.filter(
               (mod) => mod.nombre_mod !== nombre
          );
          setmodalidaes(filtrar);
     };
     const cambioPrecio = (e, codigo) => {
          let mod = modalidades.map((mod) => {
               if (codigo == mod.cod_modalidad) {
                    mod.precio = e.target.value;
               }
               return mod;
          });
          setmodalidaes(mod);
     };

     return (
          <section>
               {modalidades.map((mod, i) => (
                    <div className="mod" key={i}>
                         <p className="mod_name">{mod.nombre_mod}</p>
                         <div className="mod_end">
                              <p className="mod_tipo">{mod.tipo}</p>
                              <input
                                   type="text"
                                   name="precio"
                                   value={mod.precio}
                                   onChange={(e) =>
                                        cambioPrecio(e, mod.cod_modalidad)
                                   }
                              />
                              <i
                                   onClick={() => eliminar(mod.nombre_mod)}
                                   className="fa-regular fa-trash-can"
                              ></i>
                         </div>
                    </div>
               ))}

               <button type="button" className="addMod" onClick={clickAgregar}>
                    {agregar ? (
                         <i className="fa-solid fa-circle-minus"></i>
                    ) : (
                         <i className="fa-solid fa-circle-plus"></i>
                    )}
               </button>

               {agregar && (
                    <div className="addNewModalidad">
                         <input
                              name="nombre_mod"
                              type="text"
                              placeholder="Nombre de Modalidad"
                              onChange={handleChange}
                         />
                         <select name="tipo" id="" onChange={handleChange}>
                              <option value="">Tipo de Modalidad</option>
                              <option value="Pareja">Pareja</option>
                              <option value="Individual">Individual</option>
                         </select>
                         <input
                              name="precio"
                              type="text"
                              placeholder="Precio"
                              onChange={handleChange}
                         />
                         <button type="button" onClick={clickGuardar}>
                              Guardar
                         </button>
                    </div>
               )}
          </section>
     );
};

export default CreDelModalidades;
