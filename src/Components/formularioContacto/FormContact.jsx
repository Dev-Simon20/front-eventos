import "./cont.css";
//     "nombreContacto":"Carlos Alex",
//     "numeroContacto":"516516516",
//     "correoContacto":"Andres@gmail.com",
import { useState } from "react";
const formContact = ({ handChange, handBlur, forml, errors }) => {
  const formu = forml;
  const [mostrarElemento, setMostrarElemento] = useState(false);
  const handleClick = () => {
    setMostrarElemento(!mostrarElemento);
  };
  return (
    <section className="contacto">
      <div onClick={handleClick} className="contacto_head">
        <h3>4- ¿A quién enviamos los datos de tu registro?</h3>
        <i
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="fa-solid fa-angle-down"
        ></i>
      </div>
      <div id="contacto_body" className={mostrarElemento ? "mostrar" : ""}>
      <p className="textCon">Se enviará un correo electrónico a esta persona con la información relevante a tu registro</p>
        <div className="conten-inputs-contac">
        <div className="inp">
          <input
            type="text"
            name="nombreContacto"
            placeholder="Nombre Completos"
            onBlur={handBlur}
            onChange={handChange}
            value={formu.nombreContacto}
          />
          {errors.nom_c && <p className="showerror"> {errors.nom_c} </p>}
        </div>
        <div className="inp">
          <input
            type="text"
            name="numeroContacto"
            placeholder="Número Telefónico"
            onBlur={handBlur}
            onChange={handChange}
            value={formu.numeroContacto}
          />
          {errors.nu_c && <p className="showerror"> {errors.nu_c} </p>}
        </div>
        <div className="inp">
          <input
            type="text"
            name="correoContacto"
            placeholder="Correo Electrónico"
            onBlur={handBlur}
            onChange={handChange}
            value={formu.correoContacto}
          />
          {errors.co_c && <p className="showerror"> {errors.co_c} </p>}
        </div>
        </div>
      </div>
    </section>
  );
};

export default formContact;
