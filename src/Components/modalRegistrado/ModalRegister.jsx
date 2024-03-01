import { useEffect, useState } from 'react'
import './modalReg.css'

const ModalRegister=({isOpen,closeModal})=>{

    const handleModalContainerClick = (e) => e.stopPropagation();
    return(
    <article className={`modalc ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-containerc" onClick={handleModalContainerClick}>
        {/* <button onClick={closeModal}>X</button> */}
        <section className='contenpop'>
        <i className="fa-regular fa-circle-check"></i>
            <p className='popGen'>¡Genial!</p>
            <div className='textop'><p>Hemos Registrado tu Participación. La organización se comunicará contigo en caso de que sea necesario.</p></div>
            <button  onClick={closeModal}>Cerrar</button>
        </section>
      </div>
    </article>
    )
}

export default ModalRegister