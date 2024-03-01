import React, { useState ,useEffect,useRef} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { helphttp } from "../../Helpers/helphttps";
import ModalDatosPareja from "../ModalDatosPareja/ModalDatosParejad";
import { useModal } from "../../HookPersonalizados/useModals";
import './TablaCon.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Select from "react-select"

const TablaConcursantes=({cod_c})=>{
  const selectInputRef = useRef();
  const [isOpenModal,openModal,closeModal]=useModal(false);
  const navigate = useNavigate();
  const [concursantes,setConcursantes]=useState([]);
  const [showConcursantes,setShowConcursantes]=useState([]);
  const [seleccion,setSeleccion]=useState({});
  const [evento,setEvento]=useState(false)
  const [parEle,setParEle]=useState({})
  const api = helphttp();
  const cod_evento=useParams().cod_concurso||58;
  const url = `https://server.eventosdemarinera.com/userorg/concurso/participantes/${cod_evento}`;
  const url_2=`https://server.eventosdemarinera.com/useradmin/eliminarconcursante`;
  const datEvento=`https://server.eventosdemarinera.com/userorg/concursos/datos/${cod_evento}`;
  const [codCategoria,setCodCategoria]=useState('');
  const [codModalidad,setCodModalidad]=useState();
  const [activeSelects,setActiveSelects]=useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = showConcursantes.slice(firstIndex, lastIndex);

  const nextPage = () => {
    if (lastIndex < concursantes.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };





       useEffect(() => {
        const obtenerData = async () => {
          try {
            const data = await api.get(url);
            setConcursantes(data)
            console.log(data);
            const dataE=await api.get(datEvento);
            setEvento(dataE);
            console.log(dataE);
        
          } catch (error) {
            console.log("No se pudo ontener los datos");
          }
        };
        obtenerData();
      }, []);
      
    const eliminarConcursante= (cod_participante)=>{
       setParEle((parEle) => ({ ...parEle, cod_participante:cod_participante }));
    }
    useEffect(()=>{
      const eliminarData= async()=>{
      try {
          let opciones = { body:parEle, headers: { "content-type": "application/json" } };
          const consult=await api.del(url_2,opciones);
          const data = await api.get(url);
          setConcursantes(data)
          setShowConcursantes(data);
      } catch (error) {
         console.log(error.message);
      }
      }
     eliminarData();

    },[parEle])
    useEffect(()=>{
      const obtenerData = async () => {
        try {
          const data = await api.get(url);
          setConcursantes(data)
          setShowConcursantes(data);
        } catch (error) {
          console.log("No se pudo ontener los datos");
        }
      };
      !isOpenModal&&obtenerData();
    },[isOpenModal])
   
    const nombreCateg=(cod)=>{
      if (evento.length>0) {
        for (const e of evento[1]) {
          if (e.cod_categoria === cod) {
            return e.nombre_cat;
          }
      }
      }
  }

  const seleccionarPa=(par)=>{
    setSeleccion(par)
    openModal();
  }

  const exportar=()=>{
    const doc = new jsPDF();
    // Encabezado de la tabla
    const headers = ['Modalidad','N°','categoria','Concursantes', 'Contacto'];
    // Datos
    const rows = concursantes.map(con => [con.nombre_mod,con.num_pareja,nombreCateg(con.Categorias_cod_categoria),`${con.nombre_1} ${con.apellido_1}\n ${con.nombre_2} ${con.apellido_2} ` ,con.numero_contacto]);

    // Añade la tabla al PDF
    doc.autoTable({ head: [headers], body: rows });

    // Guarda el PDF como un archivo
    doc.save('exported_file.pdf');
  }
  

  const modalidadSelected=(options)=>{
    if(!options){
      setCodModalidad('')
      setShowConcursantes(concursantes)
      setCurrentPage(1)
      setActiveSelects(false);
      selectInputRef.current.clearValue();
    }
    else{
      setCodModalidad(options.value)
      let con=concursantes.filter((c)=>c.Modalidades_cod_modalidad==options.value)
      setShowConcursantes(con)
      setActiveSelects(true)
      setCurrentPage(1)
    }
  }

    return(
        <div className="conten-Table">
             <h1>Lista de Participantes</h1>
             <br />
             <h2>{evento.length>0?evento[0].nombre_concurso:"cargando......"}</h2>
             <br />
             {evento&&evento[2]&&<Select 
          isClearable
          placeholder="Seleccione una modalidad"
          options={evento[2].map(evento => ({ label:evento.nombre_mod, value:evento.cod_modalidad}))}
          onChange={(options) =>modalidadSelected(options)}
          />}
             {evento&&evento[2]&&<Select 
                 ref={selectInputRef}
          isClearable
          placeholder="Seleccione una Categoría"
          options={evento[1].map(evento => ({ label:evento.nombre_cat, value:evento.cod_categoria }))}
          onChange={(options) =>
            !options ? setCodCategoria("") : setCodCategoria(options.value)
          }
          isSearchable={activeSelects}
        isDisabled={!activeSelects}
          />}
          
             <br />
             <button onClick={exportar}>Exportar a pdf</button>
             <br />
            {concursantes==""?<h2>Aun no hay participantes Registrados</h2>: <section className="tablec">
          <article className="table-head">
              <div className="tr-table">
              <div className="h-num" ><p>N°</p></div>
              <div className="h-nom" ><i className="div-i fa-regular fa-user"></i><p>Nombres y Apellidos</p></div>
              <div className="h-cat" ><i className="div-i fa-solid fa-layer-group"></i><p>Categoria</p></div>
              <div className="h-est" ><i className="div-i fa-solid fa-clipboard-check"></i><p>Estado</p></div>
              <div className="h-Acc" ><i className="div-i fa-solid fa-gears"></i><p>Acciones</p></div>
              </div>
          </article>
          <article className="table-body">
             {currentItems.map((c,i)=>(
                 <div className="tr-table" key={i} >
                  <div className="Npart">
                  <p>
                   {c.num_pareja}
                 </p>
                  </div>
                 <div className="nomPart">
                   <p>{c.nombre_1} {c.apellido_1}</p>
                   <p>{c.nombre_2} {c.apellido_2}</p>
                 </div>
                 <div className="nomCat">
                   {nombreCateg(c.Categorias_cod_categoria)}
                 </div>
                 <div className="estReg">
                    {c.Estados_cod_estado==1?"Registrado":"Regularizado"}
                 </div>
                 <div className="accreg">
                    <button className="editar-part" onClick={()=>seleccionarPa(c)}>Editar</button>
                    <ModalDatosPareja  isOpen={isOpenModal} closeModal={closeModal} part={seleccion} ></ModalDatosPareja>
                     <button className="elimi-part" onClick={()=>eliminarConcursante(c.cod_participante)}>Eliminar</button>
                 </div>
               </div>
             ))}
          </article>
           <button onClick={prevPage} disabled={currentPage === 1} >Anterior</button>
            <button onClick={nextPage} disabled={lastIndex >=showConcursantes.length}>Siguiente</button> 
        </section>}
        </div>
    )
}

export default TablaConcursantes