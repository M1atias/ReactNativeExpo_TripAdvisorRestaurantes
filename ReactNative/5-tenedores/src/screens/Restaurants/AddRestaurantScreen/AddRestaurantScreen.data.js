import * as Yup from "yup";

export function initialValues(){
    return {
        name:"",
        address: "",
        phone:"",
        email:"",
        description: ""
    };
}

export function validationSchema(){
    return Yup.object({
        name: Yup.string().required("Campo obligatorio"),
        address: Yup.string().required("Campo obligatorio"),
        phone: Yup.string().required("Campo obligatorio"),
        email: Yup.string().required("Campo obligatorio").email("No es un email valido"),
        description: Yup.string().required("Campo obligatorio"),
    })
}