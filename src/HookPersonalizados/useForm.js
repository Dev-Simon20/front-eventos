import { useState } from "react"
import { uploadFile } from "../firebase/config";

export const useForm=(formuInitial,formValidate)=>{

    const[formu,setFormu]=useState(formuInitial);
    const[errors,setErrors]=useState({});
    const[loading,setLoading]=useState(false);
    const[response,setResponse]=useState(null);

    const handChange=(e)=>{
        const {name,value}=e.target;
        setFormu({
            ...formu,
            [name]:value
        })
        
    }
    const handBlur=(e)=>{
        handChange(e);
        setErrors(formValidate(formu))
    }
    const Bluroptions=()=>{
        setErrors(formValidate(formu))
    }

    const handSubmit=(e)=>{
        console.log('lsnd');

    }
    return{
        formu,
        errors,
        loading,
        response,
        setErrors,
        Bluroptions,
        setFormu,
        handChange,
        handBlur,
        handSubmit
    }
}