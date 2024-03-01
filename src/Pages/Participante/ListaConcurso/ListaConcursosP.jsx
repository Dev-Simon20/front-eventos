import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { helphttp } from "../../../Helpers/helphttps";
import Card from "../../../Components/Card-Event.jsx/card";
import "./Lista.css";
import destacar from "./destacarportada.jpg";
import publicar from "./publicar.png";
import ModalFecha from "../../../Components/ModalFechas/ModalFecha";
import { useModal } from "../../../HookPersonalizados/useModals";
import Select from "react-select";
const ciu = [
   {
      cod_ciudad: "1",
      nombre: "Lima",
   },
   {
      cod_ciudad: "2",
      nombre: "Ica",
   },
   {
      cod_ciudad: "3",
      nombre: "La Libertad",
   },
   {
      cod_ciudad: "4",
      nombre: "Arequipa",
   },
];

const tip = [
   {
      cod_tipo: "1",
      nombre: "Aniversario",
   },
   {
      cod_tipo: "2",
      nombre: "Concurso",
   },
   {
      cod_tipo: "3",
      nombre: "Coronación de Reinas",
   },
   {
      cod_tipo: "4",
      nombre: "Ensayo con Bandas",
   },
   {
      cod_tipo: "5",
      nombre: "Solidario",
   },
];

const estilos = {
   option: (styles, { isFocused }) => {
      return {
         ...styles,
         border: isFocused ? "2px solid #e7294f" : "1px solid #d9d9d9",
         marginTop: 5,
         borderRadius: 8,
         color: "#45204b",
         fontWeight: "bold",
      };
   },
   singleValue: (styles, { isFocused }) => ({
      ...styles,
      color: "#45204b",
      fontWeight: "bold",
      fontSize: "18px",
   }),
   control: (styles, { isFocused }) => ({
      ...styles,
      border: isFocused ? "1px solid #d9d9d9" : "1px solid #d9d9d9",
      "&:hover": {
         border: "1px solid #d9d9d9",
      },
   }),
   placeholder: (styles) => {
      return {
         ...styles,
         color: "#b6b4b4",
         fontFamily: "sansita",
         fontSize: "18px",
      };
   },
};

const ListaConcursoP = () => {
   const [inOpenModal, openModal, closeModal] = useModal(false);
   const [clearopt, setClearopt] = useState(true);
   const navigate = useNavigate();
   const api = helphttp();
   const url = "https://server.eventosdemarinera.com/userpar/concursos";
   const [fechaBool, setFechaBool] = useState(false);

   //estado para mostrar el cuadro de fechas en

   //Cargar la lista de eventos y su respaldo
   const [eventos, setEventos] = useState([]);
   const [eventosshow, setEventosshow] = useState([]);

   //Se Agregaran las ciudades
   const [ciudades, setCiudades] = useState(ciu);
   //Se Agregaran los tipos de Eventos
   const [tipos, setTipos] = useState(tip);

   //Valores para el flitrado==>

   //1- Estado para el codigo del tipo de evento
   const [tipoE, setTipoE] = useState("");
   //2- Estado para el codigo de la ciudad
   const [ciudadE, setCiudadE] = useState("");
   //3-Valores de la fecha fecha inicio y Fin
   const [fechaInicio, setFechaInicio] = useState(
      new Date().toISOString().split("T")[0]
   );
   const [fechaFin, setFechaFin] = useState(
      new Date().toISOString().split("T")[0]
   );
   //4- Estado para el codigo del nombre del Evenoto
   const [codigoEvento, setCodigoEvento] = useState("");

   const cambioCiudad = (e) => {
      let ciu = e.target.value;
      setCiudadE(ciu);
   };
   const cambioFecha = () => {
      let numeroAleatorio = Math.floor(Math.random() * 10000) + 1;

      setFechaBool(numeroAleatorio);
   };

   useEffect(() => {
      if (tipoE && ciudadE && fechaBool) {
         let filtrarxFecha = eventos.filter((obj) => {
            const fi = new Date(`${fechaInicio}T00:00:00.000Z`);
            const ff = new Date(`${fechaFin}T23:59:59.999Z`);
            const fobj = new Date(obj.fecha);
            return fobj >= fi && fobj <= ff;
         });
         let filtrarxtipo = filtrarxFecha.filter((obj) => {
            return obj.tipos_evento_cod_tipo == tipoE;
         });
         let filtrarXciudad = filtrarxtipo.filter((event) => {
            return event.cod_ciudad == ciudadE;
         });
         setEventosshow(filtrarXciudad);
      } else if (tipoE && !ciudadE && !fechaBool) {
         let filtrarxtipo = eventos.filter((obj) => {
            return obj.tipos_evento_cod_tipo == tipoE;
         });
         setEventosshow(filtrarxtipo);
      } else if (tipoE && !ciudadE && fechaBool) {
         let filtrarxtipo = eventos.filter((obj) => {
            return obj.tipos_evento_cod_tipo == tipoE;
         });
         let filtrarxFecha = filtrarxtipo.filter((obj) => {
            const fi = new Date(`${fechaInicio}T00:00:00.000Z`);
            const ff = new Date(`${fechaFin}T23:59:59.999Z`);
            const fobj = new Date(obj.fecha);
            return fobj >= fi && fobj <= ff;
         });

         setEventosshow(filtrarxFecha);
      } else if (!tipoE && !ciudadE && fechaBool) {
         let filtrarxFecha = eventos.filter((obj) => {
            const fi = new Date(`${fechaInicio}T00:00:00.000Z`);
            const ff = new Date(`${fechaFin}T23:59:59.999Z`);
            const fobj = new Date(obj.fecha);
            return fobj >= fi && fobj <= ff;
         });
         setEventosshow(filtrarxFecha);
      } else if (!tipoE && ciudadE && fechaBool) {
         let filtrarXciudad = eventos.filter((event) => {
            return event.cod_ciudad == ciudadE;
         });
         let filtrarxFecha = filtrarXciudad.filter((obj) => {
            const fi = new Date(`${fechaInicio}T00:00:00.000Z`);
            const ff = new Date(`${fechaFin}T23:59:59.999Z`);
            const fobj = new Date(obj.fecha);
            return fobj >= fi && fobj <= ff;
         });
         setEventosshow(filtrarxFecha);
      } else if (!tipoE && ciudadE && !fechaBool) {
         let filtrarXciudad = eventos.filter((event) => {
            return event.cod_ciudad == ciudadE;
         });
         setEventosshow(filtrarXciudad);
      } else if (tipoE && ciudadE && !fechaBool) {
         let filtrarXciudad = eventos.filter((event) => {
            return event.cod_ciudad == ciudadE;
         });
         let filtrarxtipo = filtrarXciudad.filter((obj) => {
            return obj.tipos_evento_cod_tipo == tipoE;
         });
         setEventosshow(filtrarxtipo);
      } else {
         setEventosshow(eventos);
      }
   }, [tipoE, ciudadE, fechaBool]);

   const fechaInicial = (e) => {
      setFechaInicio(e.target.value);
      setFechaFin(e.target.value);
   };
   const fechaFinal = (e) => {
      setFechaFin(e.target.value);
   };

   useEffect(() => {
      const obtenerCon = async () => {
         try {
            const data = await api.get(url);
            console.log(data);
            let dat=Object.values(data);
            console.log(dat);
            setEventos(dat);
            setEventosshow(dat);
         } catch (error) {
            console.log("Erroe en la pericion Http");
         }
      };
      obtenerCon();
   }, []);

   const limpiarFechas = () => {
      setFechaBool(false);
   };
   const openClose = () => {
      !inOpenModal ? openModal() : closeModal();
   };

   useEffect(() => {
      if (codigoEvento) {
         let filtrarxcodEvento = eventos.filter((eve) => {
            return eve.cod_concurso == codigoEvento;
         });
         setEventosshow(filtrarxcodEvento);
      } else {
         setEventosshow(eventos);
      }
   }, [codigoEvento]);

   return (
      <div className="conten">
         <img
            className="imag"
            src={destacar}
            alt="Destaca tu evento en este espacio"
         />
         <h1 className="titulo">
            CALENDARIO DE CONCURSOS Y EVENTOS DE MARINERA 2024
         </h1>
         <h3 className="subtitulo">
            Este CALENDARIO contiene Ensayos, Coronaciones y CONCURSOS DE
            MARINERA del 2024. Día a día la información es corroborada y
            actualizada con el fin de ser una fuente dinámica y confiable del
            Perú y el mundo.
         </h3>
         <img
            className="imagpu"
            src={publicar}
            alt="Inscribe tu evento gratis"
         />
         <section className="filtros_conten">
            {tipos && (
               <div className="div1">
                  <Select
                     isClearable
                     placeholder="Tipo de Evento"
                     options={tipos.map((tipo) => ({
                        label: tipo.nombre,
                        value: tipo.cod_tipo,
                     }))}
                     onChange={(options) =>
                        !options ? setTipoE("") : setTipoE(options.value)
                     }
                     theme={(theme) => ({
                        ...theme,
                        borderRadius: 5,
                        colors: {
                           ...theme.colors,
                           primary25: "#ffffff",
                           primary: "#ffffff;",
                        },
                     })}
                     styles={estilos}
                  />
               </div>
            )}
            {ciudades && (
               <div className="div2">
                  <Select
                     isClearable
                     placeholder="Ciudad"
                     options={ciudades.map((ciudad) => ({
                        label: ciudad.nombre,
                        value: ciudad.cod_ciudad,
                     }))}
                     onChange={(options) =>
                        !options ? setCiudadE("") : setCiudadE(options.value)
                     }
                     theme={(theme) => ({
                        ...theme,
                        borderRadius: 5,
                        colors: {
                           ...theme.colors,
                           primary25: "#ffffff",
                           primary: "#ffffff;",
                        },
                     })}
                     styles={estilos}
                  />
               </div>
            )}
            {eventos && (
               <div className="div5">
                  <Select
                     isClearable
                     placeholder="Nombre del Evento"
                     options={
                        Array.isArray(eventos) &&
                        eventos.map((evento) => ({
                           label: evento.nombre_concurso,
                           value: evento.cod_concurso,
                        }))
                     }
                     onChange={(options) =>
                        !options
                           ? setCodigoEvento("")
                           : setCodigoEvento(options.value)
                     }
                     theme={(theme) => ({
                        ...theme,
                        borderRadius: 5,
                        colors: {
                           ...theme.colors,
                           primary25: "#ffffff",
                           primary: "#ffffff;",
                        },
                     })}
                     styles={estilos}
                  />
               </div>
            )}

            <div className="div3">
               <button className="but-fecha" onClick={openClose}>
                  Fecha
               </button>
               <div className="imarc">
                  <i onClick={limpiarFechas} className="fa-solid fa-xmark"></i>
               </div>
               <ModalFecha isOpen={inOpenModal} closeModal={closeModal}>
                  <div className="conten-Fechas">
                     <div className="conten-Fechas-Indi">
                        <p>Hoy</p>
                        <p>Esta Semana</p>
                        <p>Este Mes</p>
                     </div>
                     <div className="content-inf">
                        <input
                           className="date1"
                           type="date"
                           min={new Date().toISOString().split("T")[0]}
                           value={fechaInicio}
                           onChange={fechaInicial}
                        />
                        <input
                           type="date"
                           min={fechaInicio}
                           value={fechaFin}
                           onChange={fechaFinal}
                        />
                     </div>
                     <div className="conten-botones">
                        <button onClick={closeModal}>Cerrar</button>
                        <button onClick={cambioFecha}>Aplicar</button>
                     </div>
                  </div>
               </ModalFecha>
            </div>
            {/* <div className="div4">
          <p onClick={eliminarFiltro}>Limpiar</p>
        </div> */}
         </section>
         <div className="contente-cards">
  {eventosshow.map((evento, i) => (
    <Card evento={evento} key={i}></Card>
  ))}
</div>
      </div>
   );
};

export default ListaConcursoP;






