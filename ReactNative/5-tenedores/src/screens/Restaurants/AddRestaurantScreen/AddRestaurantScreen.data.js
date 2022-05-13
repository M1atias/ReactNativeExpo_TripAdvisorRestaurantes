import * as Yup from "yup";

export function initialValues(){
    return {
        name:"",
        address: "",
        phone:"",
        email:"",
        description: "",
        location:null,
        images: []
    };
}

export function validationSchema(){
    return Yup.object({
        name: Yup.string().required("Campo obligatorio"),
        address: Yup.string().required("Campo obligatorio"),
        phone: Yup.string().required("Campo obligatorio"),
        email: Yup.string().required("Campo obligatorio").email("No es un email valido"),
        description: Yup.string().required("Campo obligatorio"),
        location: Yup.object().required("La localización es requerida"),
        images: Yup.array().min(1, "Se requiere una imagen como minimo").required("La imagen es requerida")
    })
}