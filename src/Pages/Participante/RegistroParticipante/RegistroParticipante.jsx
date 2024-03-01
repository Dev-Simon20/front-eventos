import { useEffect, useRef, useState } from "react";
import { helphttp } from "../../../Helpers/helphttps";
import Categorias from "../../../Components/Categorias/Categorias";
import Modalidades from "../../../Components/Modalidades/Modalidades";
import RegistroIndi from "../../../Components/RegistroIndi/RegistroIndi";
import RegistroPareja from "../../../Components/RegistroPareja/RegistroPareja";
import FormContact from "../../../Components/formularioContacto/FormContact";
import FootReg from "../../../Components/foot_reg/FootReg";
import imgUrl from "./portada.jpg";
import "./RegistroPar.css";
import UploadImage from "../../../Components/UploadImage/UploadImage";
import { uploadFile } from "../../../firebase/config";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../../../HookPersonalizados/useForm";
import Select from "react-select";
import ModalRegister from "../../../Components/modalRegistrado/ModalRegister";
import { useModal } from "../../../HookPersonalizados/useModals";
import Loader from "../../../Components/Loader/Loader";
const validationForm = (form) => {
   let errors = {};
   let regexName = /^[a-zA-Z\s]+$/;
   // let regexdni=/^(?!0+$)\d+$/;
   let regexdni = /^(?!0+$)\d{1,16}$/;
   let regexnumber = /^(?!0+$)\d{1,9}$/;
   let regexfec = /^\d{1,4}[-/.]\d{1,2}[-/.]\d{1,4}$/;
   let regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   if (form.codModalidad == "") {
      errors.modali = "El campo 'Modalidad' es requerido";
   }
   if (form.codCategoria == "") {
      errors.cate = "El campo Categoria es requerido";
   }
   if (!form.nombre_1.trim()) {
      errors.nom_1 = "El campo 'Nombre' es requerido";
   } else if (!regexName.test(form.nombre_1.trim())) {
      errors.nom_1 = "El campo 'Nombre' solo acepta letras";
   }

   if (!form.apellido_1.trim()) {
      errors.ape_1 = "El campo 'Apellido' es requerido";
   } else if (!regexName.test(form.apellido_1.trim())) {
      errors.ape_1 = "El campo 'Apellido' solo acepta letras";
   }

   if (!form.ciudad_1.trim()) {
      errors.ciu_1 = "El campo 'Ciudad' es requerido";
   } else if (!regexName.test(form.ciudad_1.trim())) {
      errors.ciu_1 = "El campo 'Ciudad' solo acepta letras";
   }

   if (form.dni_1 == "") {
      errors.dn_1 = "El campo 'DNI' es requerido";
   } else if (!regexdni.test(form.dni_1)) {
      errors.dn_1 = "El campo 'DNI' solo acepta numeros y máximo 16 caracteres";
   }

   if (form.num_1 == "") {
      errors.nu_1 = "El campo 'Numero de Celular' es requerido";
   } else if (!regexnumber.test(form.num_1)) {
      errors.nu_1 =
         "El campo 'Número de Celular' solo acepta numeros y máximo 9 caracteres";
   }
   if (!form.academia_1.trim()) {
      errors.aca_1 = "El campo 'Academia' es requerido";
   } else if (!regexName.test(form.academia_1.trim())) {
      errors.ciu_1 = "El campo 'Academia' solo acepta letras";
   }
   if (!form.nombre_2.trim()) {
      errors.nom_2 = "El campo 'Nombre' es requerido";
   } else if (!regexName.test(form.nombre_2.trim())) {
      errors.nom_2 = "El campo 'Nombre' solo acepta letras";
   }

   if (!form.apellido_2.trim()) {
      errors.ape_2 = "El campo 'Apellido' es requerido";
   } else if (!regexName.test(form.apellido_2.trim())) {
      errors.ape_2 = "El campo 'Apellido' solo acepta letras";
   }

   if (!form.ciudad_2.trim()) {
      errors.ciu_2 = "El campo 'Ciudad' es requerido";
   } else if (!regexName.test(form.ciudad_2.trim())) {
      errors.ciu_2 = "El campo 'Ciudad' solo acepta letras";
   }

   if (form.dni_2 == "") {
      errors.dn_2 = "El campo 'DNI' es requerido";
   } else if (!regexdni.test(form.dni_2)) {
      errors.dn_2 = "El campo 'DNI' solo acepta numeros y máximo 16 caracteres";
   }

   if (form.num_2 == "") {
      errors.nu_2 = "El campo 'Numero de Celular' es requerido";
   } else if (!regexnumber.test(form.num_2)) {
      errors.nu_2 =
         "El campo 'Número de Celular' solo acepta numeros y máximo 9 caracteres";
   }
   if (!form.academia_2.trim()) {
      errors.aca_2 = "El campo 'Academia' es requerido";
   } else if (!regexName.test(form.academia_2.trim())) {
      errors.ciu_2 = "El campo 'Academia' solo acepta letras";
   }

   if (!regexfec.test(form.fecha_nac_1)) {
      errors.fc_1 = "El campo 'Fecha' es requerido";
   }
   if (!regexfec.test(form.fecha_nac_2)) {
      errors.fc_2 = "El campo 'Fecha' es requerido";
   }

   if (!form.nombreContacto.trim()) {
      errors.nom_c = "El campo 'Nombre' es requerido";
   } else if (!regexName.test(form.nombreContacto.trim())) {
      errors.nom_c = "El campo 'Nombres' solo acepta letras";
   }

   if (form.numeroContacto == "") {
      errors.nu_c = "El campo 'Número de Contacto' es requerido";
   } else if (!regexnumber.test(form.numeroContacto)) {
      errors.nu_c =
         "El campo 'Número de Contacto' solo acepta numeros y máximo 9 caracteres";
   }
   if (!form.correoContacto.trim()) {
      errors.co_c = "El campo 'Correo' es requerido";
   } else if (!regexCorreo.test(form.correoContacto.trim())) {
      errors.co_c = "Ingrese un correo Valido";
   }

   return errors;
};
const validationIndividual = (form) => {
   let errors = {};
   let regexName = /^[a-zA-Z\s]+$/;
   // let regexdni=/^(?!0+$)\d+$/;
   let regexdni = /^(?!0+$)\d{1,16}$/;
   let regexnumber = /^(?!0+$)\d{1,9}$/;
   let regexfec = /^\d{1,4}[-/.]\d{1,2}[-/.]\d{1,4}$/;
   let regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   if (form.codModalidad == "") {
      errors.modali = "El campo 'Modalidad' es requerido";
   }
   if (form.codCategoria == "") {
      errors.cate = "El campo Categoria es requerido";
   }
   if (!form.nombre_1.trim()) {
      errors.nom_1 = "El campo 'Nombre' es requerido";
   } else if (!regexName.test(form.nombre_1.trim())) {
      errors.nom_1 = "El campo 'Nombre' solo acepta letras";
   }

   if (!form.apellido_1.trim()) {
      errors.ape_1 = "El campo 'Apellido' es requerido";
   } else if (!regexName.test(form.apellido_1.trim())) {
      errors.ape_1 = "El campo 'Apellido' solo acepta letras";
   }

   if (!form.ciudad_1.trim()) {
      errors.ciu_1 = "El campo 'Ciudad' es requerido";
   } else if (!regexName.test(form.ciudad_1.trim())) {
      errors.ciu_1 = "El campo 'Ciudad' solo acepta letras";
   }

   if (form.dni_1 == "") {
      errors.dn_1 = "El campo 'DNI' es requerido";
   } else if (!regexdni.test(form.dni_1)) {
      errors.dn_1 = "El campo 'DNI' solo acepta numeros y máximo 16 caracteres";
   }

   if (form.num_1 == "") {
      errors.nu_1 = "El campo 'Numero de Celular' es requerido";
   } else if (!regexnumber.test(form.num_1)) {
      errors.nu_1 =
         "El campo 'Número de Celular' solo acepta numeros y máximo 9 caracteres";
   }
   if (!form.academia_1.trim()) {
      errors.aca_1 = "El campo 'Academia' es requerido";
   } else if (!regexName.test(form.academia_1.trim())) {
      errors.ciu_1 = "El campo 'Academia' solo acepta letras";
   }

   if (!form.nombreContacto.trim()) {
      errors.nom_c = "El campo 'Nombre' es requerido";
   } else if (!regexName.test(form.nombreContacto.trim())) {
      errors.nom_c = "El campo 'Nombres' solo acepta letras";
   }

   if (form.numeroContacto == "") {
      errors.nu_c = "El campo 'Número de Contacto' es requerido";
   } else if (!regexnumber.test(form.numeroContacto)) {
      errors.nu_c =
         "El campo 'Número de Contacto' solo acepta numeros y máximo 9 caracteres";
   }
   if (!form.correoContacto.trim()) {
      errors.co_c = "El campo 'Correo' es requerido";
   } else if (!regexCorreo.test(form.correoContacto.trim())) {
      errors.co_c = "Ingrese un correo Valido";
   }
   return errors;
};
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
      fontSize: "17px",
   }),
   control: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: "#f5f5f5",
      border: "1px solid #f5f5f5",
      "&:hover": {
         border: "1px solid #f5f5f5",
      },
   }),
   placeholder: (styles) => {
      return {
         ...styles,
         color: "#492558",
         fontFamily: "sansita",
         fontSize: window.innerWidth < 700 ? "14px" : "19px",
         fontWeight: "bold",
         textAlign: "start",
         marginLeft: "20px",
      };
   },
};
const RegistroPar = () => {
   const navigate = useNavigate();
   const cod_con = useParams().cod_concurso;
   const formDefault = {
      voucher: "",
      tipoRegistro: "",
      nombreContacto: "",
      numeroContacto: "",
      correoContacto: "",
      codModalidad: "",
      codCategoria: "",
      codConcurso: `${cod_con}`,
      cod_estado: "2",
      nombre_1: "",
      apellido_1: "",
      ciudad_1: "",
      fecha_nac_1: "",
      dni_1: "",
      num_1: "",
      academia_1: "",
      codRol_1: "1",
      codGenero_1: "2",
      nombre_2: "",
      apellido_2: "",
      ciudad_2: "",
      dni_2: "",
      fecha_nac_2: "",
      num_2: "",
      academia_2: "",
      codRol_2: "1",
      codGenero_2: "1",
   };
   const {
      formu,
      errors,
      loading,
      response,
      handChange,
      handBlur,
      handSubmit,
      setFormu,
      Bluroptions,
      setErrors,
   } = useForm(formDefault, validationForm);
   const api = helphttp();
   const url = `https://server.eventosdemarinera.com/userpar/datoscon/${cod_con}`;
   const url_2 = `https://server.eventosdemarinera.com/userpar/categoriasConcurso/${cod_con}`;
   const url_3 = `https://server.eventosdemarinera.com/userpar/registrarse/`;
   const [tipo, setTipo] = useState("");
   const [mostrarElemento, setMostrarElemento] = useState(false);
   const [imagAgredada, setimagenAgregada] = useState("");
   const [mostrarCaja, setMostrarCaja] = useState(false);
   // const [modSelec, setModSelec] = useState("");
   const [modalidades, setModalidades] = useState([]);
   const [categorias, setCategoria] = useState([]);
   const [concurso, setConcurso] = useState("");
   const [form, setForm] = useState(formDefault);
   const mostrarform = useRef(null);
   const showDrag = useRef(null);
   const [file, setFile] = useState(null);
   const [isOpenModal, openModal, closeModal] = useModal(false);
   const [cargando, setCargando] = useState(false);
   //Llamada a la api
   //Obtener los datos del cocnurso y de las modalidades
   useEffect(() => {
      const obtenerData = async () => {
         try {
            const data = await api.get(url);
            setModalidades(data[1]);
            setConcurso(data[0]);
            setFormu((formu) => ({
               ...formu,
               nombreCon: data[0].nombre_concurso,
            }));
            setFormu((formu) => ({ ...formu, correo: data[0].correo }));
         } catch (error) {
            console.log("No se pudo ontener los datos");
         }
      };
      obtenerData();
   }, []);
   //LLamar a las categorias
   useEffect(() => {
      const obtennerCat = async () => {
         const data = await api.get(url_2);
         setCategoria(data);
         console.log(data);
      };
      obtennerCat();
   }, []);

   // Guardamos los datos de la modalidad
   const guardarDatom = (options) => {
      if (!options) {
         setFormu((formu) => ({ ...formu, codModalidad: "" }));
      } else {
         for (const modalidad of modalidades) {
            //1=pareja    2=individual
            if (modalidad.cod_modalidad == options.value) {
               if (modalidad.tipo == "Pareja") {
                  setFormu((formu) => ({ ...formu, tipoRegistro: 1 }));
               } else {
                  setFormu((formu) => ({ ...formu, tipoRegistro: 2 }));
               }
               setFormu((formu) => ({
                  ...formu,
                  codModalidad: options.value.toString(),
               }));
               setFormu((formu) => ({ ...formu, nombreMod: options.label }));
               setTipo(modalidad.tipo);
               break;
            } else {
               setFormu((formu) => ({ ...formu, codModalidad: "" }));
               setTipo("");
            }
         }
      }
   };

   const guardarDatoc = (options) => {
      !options
         ? setFormu((formu) => ({ ...formu, codCategoria: "" }))
         : setFormu((formu) => ({
              ...formu,
              codCategoria: `${options.value}`,
           }));
      setFormu((formu) => ({ ...formu, nombreCat: options.label }));
   };

   useEffect(() => {
      console.log("Entrado al useEfecr de resgistrar");
      const senData = async () => {
         try {
            if (imagAgredada) {
               let opciones = {
                  body: formu,
                  headers: { "content-type": "application/json" },
               };
               const consul = await api.post(url_3, opciones);
               setimagenAgregada(false);
               setFormu(formDefault);
               setCargando(false);
               setFormu((formu) => ({
                  ...formu,
                  nombreCon: concurso.nombre_concurso,
               }));
               setFormu((formu) => ({ ...formu, correo: concurso.correo }));
               openModal();
            }
         } catch (error) {
            console.log("No se registro al aprticipanye");
         }
      };
      senData();
   }, [imagAgredada]);

   const enviarDatos = async () => {
      if (formu.tipoRegistro == 1) {
         setErrors(validationForm(formu));
         const newErrors = validationForm(formu);
         if (Object.keys(newErrors).length === 0) {
            try {
               if (file) {
                  setCargando(true);
                  const urlResult = await uploadFile(file);
                  setFormu((formu) => ({ ...formu, voucher: urlResult }));
                  setimagenAgregada(true);
               } else {
                  setFormu((formu) => ({ ...formu, voucher: "no Image" }));
                  alert("Complete los Datos");
               }
            } catch (error) {
               console.log(error.message);
            }
         }
      } else if (formu.tipoRegistro == 2) {
         console.log("ti");
         setErrors(validationIndividual(formu));
         const newErrors = validationIndividual(formu);
         if (Object.keys(newErrors).length === 0) {
            try {
               if (file) {
                  setCargando(true);
                  const urlResult = await uploadFile(file);
                  setFormu((formu) => ({ ...formu, voucher: urlResult }));
                  setimagenAgregada(true);
               } else {
                  setFormu((formu) => ({ ...formu, voucher: "no Image" }));
                  alert("Complete los Datos");
               }
            } catch (error) {
               console.log(error.message);
            }
         }
      }
   };

   const mostrarFormulario = () => {
      if (formu.codCategoria && formu.codModalidad) {
         setMostrarElemento(!mostrarElemento);
      }
   };
   const showVoucher = () => {
      setMostrarCaja(!mostrarCaja);
   };

   const handleBack = () => {
      navigate("/");
   };

   return (
      <div className="registro-main">
         <img src={imgUrl} alt="" />
         {/* <button className="back" onClick={handleBack}>Regresar</button> */}
         <section>
            <h1 className="titConcurso">{concurso.nombre_concurso}</h1>
            <p className="subtiConcurso">Surco</p>
         </section>

         <section className="opt">
            <div className="opt_mod">
               <Select
                  isClearable
                  isSearchable={false}
                  placeholder="1- Selecione una modalidad"
                  options={modalidades.map((mod) => ({
                     label: mod.nombre_mod,
                     value: mod.cod_modalidad,
                  }))}
                  onChange={(options) => guardarDatom(options)}
                  onBlur={Bluroptions}
                  theme={(theme) => ({
                     ...theme,
                     borderRadius: 15,
                     colors: {
                        ...theme.colors,
                        primary25: "#ffffff",
                        primary: "#ffffff;",
                     },
                  })}
                  styles={estilos}
               />
            </div>
            {errors.modali && <p className="showerror">{errors.modali}</p>}

            <div className="opt_cat">
               <Select
                  isClearable
                  isSearchable={false}
                  placeholder="2- Selecione una Categoria"
                  options={categorias.map((cat) => ({
                     label: cat.nombre_cat,
                     value: cat.cod_categoria,
                  }))}
                  onChange={(options) => guardarDatoc(options)}
                  onBlur={Bluroptions}
                  theme={(theme) => ({
                     ...theme,
                     borderRadius: 15,
                     colors: {
                        ...theme.colors,
                        primary25: "#ffffff",
                        primary: "#ffffff;",
                     },
                  })}
                  styles={estilos}
               />
            </div>
            {errors.cate && <p className="showerror">{errors.cate}</p>}
         </section>

         <section className="datos">
            <div onClick={mostrarFormulario} className="datos_head">
               <h3>3- Datos del participante</h3>
               <i
                  onClick={(e) => {
                     e.stopPropagation();
                     mostrarFormulario();
                  }}
                  className="fa-solid fa-angle-down"
               ></i>
            </div>
            <article
               ref={mostrarform}
               id="datos-body"
               style={{height: formu.tipoRegistro == "2" &&"490px"}}
               className={mostrarElemento ? "mostrarFormConcursante" : ""}
            >            
               {tipo == "Pareja" && (
                  <RegistroPareja
                     handChange={handChange}
                     handBlur={handBlur}
                     forml={formu}
                     errors={errors}
                  />
               )}
               {tipo == "Individual" && (
                  <RegistroIndi
                     handChange={handChange}
                     handBlur={handBlur}
                     formu={formu}
                     errors={errors}
                  />
               )}
            </article>
         </section>

         <FormContact
            handChange={handChange}
            handBlur={handBlur}
            forml={formu}
            errors={errors}
         ></FormContact>
         <section className="voucher">
            <div
               onClick={showVoucher}
               style={{ cursor: "pointer" }}
               className="voucher_head"
            >
               <h3 style={{ cursor: "pointer" }}>
                  5- Adjunte la Imagen de su Voucher
               </h3>
               <i
                  onClick={(e) => {
                     e.stopPropagation();
                     showVoucher();
                  }}
                  className="fa-solid fa-angle-down"
               ></i>
            </div>
            <article
               ref={showDrag}
               id="div-image"
               className={mostrarCaja ? "mostrarCajaImagen" : ""}
            >
               {modalidades &&
               modalidades.map(
                  (mod, i) =>
                     formu.codModalidad == mod.cod_modalidad && (
                        <p className="prec" key={i}>EL precio por la participacón es de  S/ {mod.precio}</p>
                     )
               )}
               <UploadImage file={file} setFile={setFile} />
            </article>
           

            {!file && (
               <p style={{ alignSelf: "start" }} className="showerror">
                  * Adjunte la imagen del Voucher
               </p>
            )}
         </section>
         <div className="div-reg" onClick={enviarDatos}>
            <i className="fa-solid fa-user-plus"></i> <p>REGISTRARSE</p>
         </div>
         <ModalRegister
            isOpen={isOpenModal}
            closeModal={closeModal}
         ></ModalRegister>
         {cargando && <Loader />}
         <section style={{ margin: "50px 0 2px 0" }}>
            <FootReg />
         </section>
      </div>
   );
};

export default RegistroPar;
