import  { useEffect, useState } from "react";
import "./carrusel.css";

let imagenes = [
  "https://mimarinera.com/wp-content/uploads/2023/02/WEB-1.jpg",
  "https://www.tvperu.gob.pe/sites/default/files/styles/gallery/public/mar_nor_ok_0.jpg?itok=PzXxn6qC",
  "https://gestion.pe/resizer/k2R-mXo03P2b5a9lIwwMdVqttcQ=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/AVMXKKNU5JGOHKIFF2CVM44KQ4.jpg",
];

const Carrusel = () => {
  const [imagenActual, setImagenActual] = useState(0);

  const cambiarImagen = () => {
    setImagenActual((prev) => (prev + 1) % imagenes.length);
  };
  
  useEffect(() => {
    const intervalId = setInterval(cambiarImagen, 4000);
    return () => clearInterval(intervalId);
    
  }, []);


  return (
    <div className="carr">
      <img src={imagenes[imagenActual]} alt="" />
    </div>
  );
};

export default Carrusel;
