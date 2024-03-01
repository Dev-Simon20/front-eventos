import "./Loader.css";
const Loader = () => {
   return (
      <div className="loading">
         {console.log("Hola")}
         <div className="loadCon">
            <div className="lds-facebook">
               <div></div>
               <div></div>
               <div></div>
            </div>
         </div>
      </div>
   );
};

export default Loader;
// Antes de la peticion http el loader a true

// terminando de la peticion http el loader a false
