import { useNavigate } from 'react-router-dom'
import './botoncards.css'
import { useEffect, useState } from 'react'
const BotonCards=({premiun,cod_concurso,registroactive,tipos_evento_cod_tipo,nombreEvento})=>{
  //      <p>Aniversario</p></div>
  //     case 2: return <div className="cf_tipo"><i className="fa-solid fa-trophy"></i><p>Concurso</p></div>
  //     case 3: return <div className="cf_tipo"><i className="fa-solid fa-crown"></i><p>Coronación de Reinas</p></div>
  //     case 4: return <div className="cf_tipo"><i className="fa-solid fa-drum"></i><p>Ensayo con Bandas</p></div>
  //     case 5: return <div className="cf_tipo"><i className="fa-regular fa-handshake"></i><p>Solidario</p></div>
  const [estilo,setEstilo]=useState({backgroundColor:'red',})
  const tip=tipos_evento_cod_tipo;
  useEffect(()=>{
        if (tip==1) {
          let color={backgroundColor:'#1dda8e',}
          setEstilo(color)
        }
        if (tip==2) {
          let color={backgroundColor:'#f0af37',color:'#ffffff'}
          setEstilo(color)
        }
        if (tip==3) {
          let color={backgroundColor:'#8f3d8f',}
          setEstilo(color)
        }
        if (tip==4) {
          let color={backgroundColor:'#45204b',}
          setEstilo(color)
        }
        if (tip==5) {
          let color={backgroundColor:'#e7294f',}
          setEstilo(color)
        }
  },[])
  const navigate=useNavigate();
 const nom=nombreEvento;
  function limpiar(cadena) {
    const sinEspacios = cadena.replace(/\s/g, '');
    const sinTildes = sinEspacios.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return sinTildes;
}
 const navegar=()=>{
        navigate(`/registro/${limpiar(nom)}/${cod_concurso}`);
  }
  const verificacion=(p,r)=>{
      if (r==1) {
        if (p==1) {
            return<><button style={estilo} className='Vb'>Ver Bases</button> <button className='Reg' onClick={navegar}>Registrate</button></>
            
        }
        else{
            return <><button className='Vd'>Ver Detalles</button> <button className='Reg' onClick={navegar}>Registrate</button></>
        }
      }
      else{
        return <button  className='Vd'>Ver Detalles</button>
      }
  }
    return(<div className='botoncards'>
       {verificacion(premiun,registroactive)}
     </div>)
}

export default BotonCards