import { useState } from "react";
import "./createOrganizador.css";
import { helphttp } from "../../../Helpers/helphttps";

let prevForm = {
   nombre_orga: "",
   ruc_orga: "",
   director: "",
   dni_director: "",
   direccion: "",
   correo: "",
   telefono: "",
   usuario_org: "",
   contrasena: "",
};
const validationForm = (form) => {
   let errors = {};
   let regexName = /^[a-zA-Z\s]+$/;
   // let regexdni=/^(?!0+$)\d+$/;
   let regexdni = /^(?!0+$)\d{1,16}$/;
   let regexRuc = /^(?!0+$)\d{1,20}$/;
   let regexTelf = /^(?!0+$)\d{1,9}$/;
   let regexfec = /^\d{1,4}[-/.]\d{1,2}[-/.]\d{1,4}$/;
   let regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   let regexContasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(.{8,})$/;
   let mensajecampoRequerido = "El campo es requerido";
   let mensajecampoSoloTexto = "El campo solo acepta letras";
   if (!form.nombre_orga.trim()) {
      errors.nombreOrg = mensajecampoRequerido;
   } else if (!regexName.test(form.nombre_orga.trim())) {
      errors.nombreOrg = mensajecampoSoloTexto;
   }

   if (form.ruc_orga == "") {
      errors.ruc_orga = mensajecampoRequerido;
   } else if (!regexRuc.test(form.ruc_orga)) {
      errors.ruc_orga = "El campo solo acepta números y máximo 20 dígitos";
   }

   if (!form.director.trim()) {
      errors.director = `${mensajecampoRequerido}`;
   } else if (!regexName.test(form.director.trim())) {
      errors.director = `${mensajecampoSoloTexto}`;
   }
   if (form.dni_director == "") {
      errors.dni_director = mensajecampoRequerido;
   } else if (!regexdni.test(form.dni_director)) {
      errors.dni_director =
         "El campo 'DNI' solo acepta numeros y máximo 16 caracteres";
   }
   if (!form.direccion.trim()) {
      errors.direccion = mensajecampoRequerido;
   }

   if (form.telefono == "") {
      errors.telefono = mensajecampoRequerido;
   } else if (!regexTelf.test(form.telefono)) {
      errors.telefono = "El campo solo acepta numeros y máximo 9 caracteres";
   }

   if (!form.correo.trim()) {
      errors.correo = mensajecampoRequerido;
   } else if (!regexCorreo.test(form.correo.trim())) {
      errors.correo = "Ingrese un correo Valido";
   }

   if (!form.usuario_org.trim()) {
      errors.usuario_org = mensajecampoRequerido;
   }
   if (!form.contrasena.trim()) {
      errors.contrasena = mensajecampoRequerido;
   } else if (!regexContasena.test(form.contrasena)) {
      errors.contrasena =
         "Ingresa al menos 8 caracteres con mayúscula, minúscula y número.";
   }

   return errors;
};

let estiloErros = {
   alignSelf: "start",
   fontSize: "9px",
};
const ListaOrganizadores = () => {
   const api = helphttp();
   const url = "https://server.eventosdemarinera.com/useradmin/createOrganizacion";
   const [form, setForm] = useState(prevForm);
   const [errors, setError] = useState({});

   const handleChange = (e) => {
      setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
   };
   const handleCreate = (e) => {
      e.preventDefault();
      setError(validationForm(form));
      const newErrors = validationForm(form);
      if (Object.keys(newErrors).length === 0) {
         const senData = async () => {
            try {
               let opciones = {
                  body: form,
                  headers: { "content-type": "application/json" },
               };
               const consult = await api.post(url, opciones);
               alert('Organizacion creada')
            } catch (error) {
               console.log(error.message);
            }
         };
         senData();
      } else {
         alert("Llene el formualrio Correctamnete");
      }
   };

   const handleBlur = () => {
      setError(validationForm(form));
   };
   return (
      <>
         <h2>Crear Organización</h2>

         <form action="" className="formOrg">
            <input
               type="text"
               onChange={handleChange}
               value={form.nombre_orga}
               onBlur={handleBlur}
               name="nombre_orga"
               placeholder="Ingresa el Nombre de la Organización"
            />
            {errors.nombreOrg && (
               <p className="showerror" style={estiloErros}>
                  {errors.nombreOrg}
               </p>
            )}
            <input
               type="text"
               onChange={handleChange}
               value={form.ruc_orga}
               onBlur={handleBlur}
               name="ruc_orga"
               placeholder="Ingresa el ruc de la Organización"
            />
            {errors.ruc_orga && (
               <p className="showerror" style={estiloErros}>
                  {errors.ruc_orga}
               </p>
            )}
            <input
               type="text"
               onChange={handleChange}
               value={form.director}
               onBlur={handleBlur}
               name="director"
               placeholder="Ingresa Nombres y Apellidos del Director "
            />
            {errors.director && (
               <p className="showerror" style={estiloErros}>
                  {errors.director}
               </p>
            )}

            <input
               type="text"
               onChange={handleChange}
               value={form.dni_director}
               onBlur={handleBlur}
               name="dni_director"
               placeholder="Ingresa el Dni del Director"
            />
            {errors.dni_director && (
               <p className="showerror" style={estiloErros}>
                  {errors.dni_director}
               </p>
            )}

            <input
               type="text"
               onChange={handleChange}
               value={form.direccion}
               onBlur={handleBlur}
               name="direccion"
               placeholder="Ingresa la Dirección"
            />
            {errors.direccion && (
               <p className="showerror" style={estiloErros}>
                  {errors.direccion}
               </p>
            )}

            <input
               type="text"
               onChange={handleChange}
               value={form.telefono}
               onBlur={handleBlur}
               name="telefono"
               placeholder="Ingresa el Teléfono"
            />
            {errors.telefono && (
               <p className="showerror" style={estiloErros}>
                  {errors.telefono}
               </p>
            )}

            <input
               type="text"
               onChange={handleChange}
               value={form.correo}
               onBlur={handleBlur}
               name="correo"
               placeholder="Ingresa el Correo"
            />
            {errors.correo && (
               <p className="showerror" style={estiloErros}>
                  {errors.correo}
               </p>
            )}

            <input
               type="text"
               onChange={handleChange}
               value={form.usuario_org}
               onBlur={handleBlur}
               name="usuario_org"
               placeholder="Ingresa un usuario "
            />
            {errors.usuario_org && (
               <p className="showerror" style={estiloErros}>
                  {errors.usuario_org}
               </p>
            )}

            <input
               type="password"
               onChange={handleChange}
               value={form.contrasena}
               onBlur={handleBlur}
               name="contrasena"
               placeholder="Ingresa una contraseña"
            />
            {errors.contrasena && (
               <p className="showerror" style={estiloErros}>
                  {errors.contrasena}
               </p>
            )}
            <button onClick={handleCreate}>Registrar</button>
         </form>
      </>
   );
};

export default ListaOrganizadores;
