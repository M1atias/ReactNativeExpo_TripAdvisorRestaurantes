import React from 'react'
import { View,Image} from 'react-native'
//import {  } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./RegisterScreen.styles";
import { RegisterForm } from "../../../components/Auth";

export function RegisterScreen() {
  return (
    <KeyboardAwareScrollView>
      <Image source={require("../../../../assets/img/5-tenedores-letras-icono-logo.png")} style={styles.image} />
      <View style={styles.content}>
        <RegisterForm />
      </View>
    </KeyboardAwareScrollView>
  )
}