import "./RegistroPareja.css";
import { format, parse } from "date-fns";
const RegistroPareja = ({ handChange, handBlur, forml, errors }) => {
   const formu = forml;

   return (
      //1=masculino 2=femenino
      <div className="regp">
         <div className="par1">
            <input
               type="text"
               onBlur={handBlur}
               name="nombre_1"
               placeholder="Ingresa tus nombres"
               onChange={handChange}
               value={formu.nombre_1}
            />
            {errors.nom_1 && <p className="showerror">{errors.nom_1}</p>}
            <input
               type="text"
               onBlur={handBlur}
               name="apellido_1"
               placeholder="Ingresa tus apellido"
               onChange={handChange}
               value={formu.apellido_1}
            />
            {errors.ape_1 && <p className="showerror">{errors.ape_1}</p>}
            <input
               type="text"
               onBlur={handBlur}
               name="ciudad_1"
               placeholder="Ingresa tu Ciudad"
               onChange={handChange}
               value={formu.ciudad_1}
            />
            {errors.ciu_1 && <p className="showerror"> {errors.ciu_1} </p>}
            <input
               type="text"
               onBlur={handBlur}
               name="dni_1"
               placeholder="Ingresa su DNI"
               onChange={handChange}
               value={formu.dni_1}
            />
            {errors.dn_1 && <p className="showerror"> {errors.dn_1} </p>}
            <input
               type="text"
               className="inpDateP"
               name="fecha_nac_1"
               onBlur={(e) =>{e.target.type = "text" ;handBlur(e)}}
               onFocus={(e) => (e.target.type = "date")}
               placeholder="Ingresa tu fecha de Nacimiento"
               onChange={handChange}
               value={formu.fecha_nac_1 && format(parse(`${formu.fecha_nac_1}`, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy')}
            />
            {errors.fc_1 && <p className="showerror"> {errors.fc_1} </p>}
            <input
               type="text"
               onBlur={handBlur}
               name="num_1"
               placeholder="Ingresa tu numero celular"
               onChange={handChange}
               value={formu.num_1}
            />
            {errors.nu_1 && <p className="showerror"> {errors.nu_1} </p>}
            <input
               type="text"
               onBlur={handBlur}
               name="academia_1"
               placeholder="Ingresa tu Academia"
               onChange={handChange}
               value={formu.academia_1}
            />
            {errors.aca_1 && <p className="showerror"> {errors.aca_1} </p>}
         </div>
         <div className="par2">
            <input
               type="text"
               onBlur={handBlur}
               name="nombre_2"
               placeholder="Ingresa tus nombre"
               onChange={handChange}
               value={formu.nombre_2}
            />
            {errors.nom_2 && <p className="showerror">{errors.nom_2}</p>}
            <input
               type="text"
               onBlur={handBlur}
               name="apellido_2"
               placeholder="Ingresa tus apellido"
               onChange={handChange}
               value={formu.apellido_2}
            />
            {errors.ape_2 && <p className="showerror">{errors.ape_2}</p>}
            <input
               type="text"
               onBlur={handBlur}
               name="ciudad_2"
               placeholder="Ingresa tu Ciudad"
               onChange={handChange}
               value={formu.ciudad_2}
            />
            {errors.ciu_2 && <p className="showerror"> {errors.ciu_2} </p>}
            <input
               type="text"
               onBlur={handBlur}
               name="dni_2"
               placeholder="Ingresa tu DNI"
               onChange={handChange}
               value={formu.dni_2}
            />
            {errors.dn_2 && <p className="showerror"> {errors.dn_2} </p>}
            <input
               type="text"
               className="inpDateP"
               onBlur={(e) =>{e.target.type = "text" ;handBlur(e)}}
               onFocus={(e) => (e.target.type = "date")}
               placeholder="Ingresa tu fecha de Nacimiento"
               onChange={handChange}
               value={formu.fecha_nac_2&&format(parse(formu.fecha_nac_2,'yyyy-MM-dd', new Date()),'dd/MM/yyyy')}
              
            />
            {errors.fc_2 && <p className="showerror"> {errors.fc_2} </p>}
            <input
               type="text"
               onBlur={handBlur}
               name="num_2"
               placeholder="Ingresa tu numero celular"
               onChange={handChange}
               value={formu.num_2}
            />
            {errors.nu_2 && <p className="showerror"> {errors.nu_2} </p>}
            <input
               type="text"
               onBlur={handBlur}
               name="academia_2"
               placeholder="Ingresa tu Academia"
               onChange={handChange}
               value={formu.academia_2}
            />
            {errors.aca_2 && <p className="showerror"> {errors.aca_2} </p>}
         </div>
      </div>
   );
};

export default RegistroPareja;
