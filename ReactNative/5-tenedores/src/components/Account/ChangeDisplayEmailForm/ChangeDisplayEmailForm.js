import React ,{useState}from 'react'
import { View } from 'react-native'
import { Input,Button } from "react-native-elements";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { styles } from "./ChangeDisplayEmailForm.styles";
import { initialValues,validationSchema } from "./ChangeDisplayEmailForm.data";
import { getAuth, updateEmail, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

export function ChangeDisplayEmailForm(props) {
    const {onClose,onReload} = props;
    const [showpassword, setShowPassword] = useState(false);


    const onShowPassword = () => setShowPassword((prevState) => !prevState);

    const formik = useFormik({
        initialValues:initialValues(),
        validationSchema: validationSchema(),
        validateOnChange:false,
        onSubmit: async(formValue) => {
            try {
                const currentUser = getAuth().currentUser;
                const credential = EmailAuthProvider.credential(
                    currentUser.email, formValue.password
                );
                reauthenticateWithCredential(currentUser,credential);


                await updateEmail(currentUser, formValue.email);

                onReload();
                onClose();
                
            } catch (error) {
                Toast.show({
                    type:"error",
                    position:"bottom",
                    text1:"Error al cambiar el email"
                })
                console.log(error)
            }
        }
    });

  return (
    <View style={styles.content} >
        <Input 
      placeholder='Nuevo email'
      onChangeText= {(text) => formik.setFieldValue("email",text)}
      errorMessage={formik.errors.email}
      rightIcon={{type:"material-community", name:"account-circle-outline", color:"#c2c2c2",}}
      containerStyle={styles.input}
      />
        <Input 
      placeholder='Contraseña'
      onChangeText= {(text) => formik.setFieldValue("password",text)}
      errorMessage={formik.errors.password}
      rightIcon={{type:"material-community", name:showpassword ? "eye-off-outline" : "eye-outline", color:"#c2c2c2", onPress:onShowPassword}}
      containerStyle={styles.input}
      secureTextEntry={showpassword ? false : true}
      />
        <Button 
      title="Cambiar email" 
      containerStyle={styles.btnContainer} 
      buttonStyle={styles.btn}
      onPress= {formik.handleSubmit}
      loading={formik.isSubmitting} 
      />
    </View>
  )
}