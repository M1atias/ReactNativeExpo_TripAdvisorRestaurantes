import React,{useState} from 'react'
import { View, Text } from 'react-native'
import { Input,Button } from "react-native-elements";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { initialValues,validationSchema } from "./ChangeDisplayPassForm.data";
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { styles } from "./ChangeDisplayPassForm.styles";

export function ChangeDisplayPassForm(props) {
    const {onClose} = props;
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showNewRepeatpassword, setShowNewRepeatpassword] = useState(false);


    const onShowPassword = () => setShowPassword((prevState) => !prevState);
    const onShowNewPassword = () => setShowNewPassword((prevState) => !prevState);
    const onShowNewRepeatPassword = () => setShowNewRepeatpassword((prevState) => !prevState);

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


                await updatePassword(currentUser, formValue.newPassword);

                onClose();
                
            } catch (error) {
                Toast.show({
                    type:"error",
                    position:"bottom",
                    text1:"Error al cambiar contraseña"
                })
                console.log(error)
            }
        }
    });
  return (
    <View style={styles.content}>
        <Input 
      placeholder='Contraseña actual'
      containerStyle = {styles.input}
      secureTextEntry={showPassword ? false : true}
      onChangeText= {(text) => formik.setFieldValue("password",text)}
      errorMessage={formik.errors.password}
      rightIcon={{type:"material-community", name:showPassword ? "eye-off-outline" : "eye-outline", color:"#c2c2c2", onPress:onShowPassword}}
      />
        <Input 
      placeholder='Nueva contraseña'
      containerStyle = {styles.input}
      secureTextEntry={showNewPassword ? false : true}
      onChangeText= {(text) => formik.setFieldValue("newPassword",text)}
      errorMessage={formik.errors.newPassword}
      rightIcon={{type:"material-community", name:showNewPassword ? "eye-off-outline" : "eye-outline", color:"#c2c2c2", onPress:onShowNewPassword}}
      />
        <Input 
      placeholder='Repite nueva contraseña'
      containerStyle = {styles.input}
      secureTextEntry={showNewRepeatpassword ? false : true}
      onChangeText= {(text) => formik.setFieldValue("repeatNewPassword",text)}
      errorMessage={formik.errors.repeatNewPassword}
      rightIcon={{type:"material-community", name:showNewRepeatpassword ? "eye-off-outline" : "eye-outline", color:"#c2c2c2", onPress:onShowNewRepeatPassword}}
      />
      <Button 
      title="Cambiar contraseña" 
      containerStyle={styles.btnContainer} 
      buttonStyle={styles.btn}
      onPress= {formik.handleSubmit}
      loading={formik.isSubmitting} 
      />
    </View>
  )
}