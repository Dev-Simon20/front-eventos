

//     "voucherUrl":"link del voucher",

import { useState } from 'react';
import './Upload.css'
import { uploadFile } from '../../firebase/config';


const UploadImage = ({file,setFile}) => {
 const [nombre,setNombre]=useState("");

 const handleChange=(e)=>{
   var f=e.target.files;
   if (f.length>0) {
        setFile(e.target.files[0])
        setNombre(e.target.files[0].name)
   }
   else{
      console.log('Fue cancelada la subida de imagen ');

   }
 }
  return (
    <div className="image-upload-wrap">
      <input
        className="file-upload-input"
        type="file"
        accept="image/*"
        multiple
        onChange={e=>{handleChange(e)}}
      />
      <div className="text-information">
        {!nombre?<h3>Suelta o Selecciona tu Imagen</h3>:<h3>{nombre}</h3>}
      </div>
      {/* <button className='button' onClick={handleClick}>Subir Voucher</button> */}
    </div>
  );
};

export default UploadImage;
