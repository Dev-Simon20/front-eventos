import "./RegistroIndi.css";
const registroIndi = ({ handChange, handBlur, formu, errors }) => {
   // const handChange=(e)=>{
   //      setForm(prevform=>({...prevform,[e.target.name]:e.target.value}));

   // }
   return (
      <section className="registerindi">
         <article className="ri">
            <p>Ingrese los datos del participante o la participante</p>
            <input
               type="text"
               onBlur={handBlur}
               name="nombre_1"
               placeholder="Ingrese su nombre"
               onChange={handChange}
               value={formu.nombre_1}
            />
            {errors.nom_1 && <p className="showerror">{errors.nom_1}</p>}
            <input
               type="text"
               onBlur={handBlur}
               name="apellido_1"
               placeholder="Ingrese su apellido"
               onChange={handChange}
               value={formu.apellido_1}
            />
            {errors.ape_1 && <p className="showerror">{errors.ape_1}</p>}
            <input
               type="text"
               onBlur={handBlur}
               name="ciudad_1"
               placeholder="Ingrese su Ciudad"
               onChange={handChange}
               value={formu.ciudad_1}
            />
            {errors.ciu_1 && <p className="showerror"> {errors.ciu_1} </p>}
            <input
               type="number"
               onBlur={handBlur}
               name="dni_1"
               placeholder="Ingrese su DNI"
               onChange={handChange}
               value={formu.dni_1}
            />
            {errors.dn_1 && <p className="showerror"> {errors.dn_1} </p>}
            <input
               type="date"
               id="fecnacI"
               name="fecha_nac_1"
               onBlur={(e) =>{e.target.type = "text" ;handBlur(e)}}
               onFocus={(e) => (e.target.type = "date")}
               placeholder="Ingresa tu fecha de Nacimiento"
               onChange={handChange}
               value={formu.fecha_nac_1}
            />
            {errors.fc_1 && <p className="showerror"> {errors.fc_1} </p>}
            <input
               type="text"
               onBlur={handBlur}
               name="num_1"
               placeholder="Ingrese su numero celular"
               onChange={handChange}
               value={formu.num_1}
            />
            {errors.nu_1 && <p className="showerror"> {errors.nu_1} </p>}
            <input
               type="text"
               onBlur={handBlur}
               name="academia_1"
               placeholder="ingrese su Academia"
               onChange={handChange}
               value={formu.academia_1}
            />
            {errors.aca_1 && <p className="showerror"> {errors.aca_1} </p>}
         </article>
      </section>
   );
};

export default registroIndi;
