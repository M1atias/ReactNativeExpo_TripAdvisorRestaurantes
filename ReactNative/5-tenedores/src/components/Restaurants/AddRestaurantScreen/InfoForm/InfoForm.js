import React from 'react'
import { View, Text } from 'react-native'
import {styles} from "./InfoForm.styles";
import { Input } from "react-native-elements";

export function InfoForm() {
  return (
    <View style={styles.content}>
      <Input 
      placeholder='Nombre del restaurante' 
      />
      <Input 
      placeholder='Dirección' 
      />
      <Input 
      placeholder='Descripción del restaurante'
      multiline={true}
      inputStyle={styles.textArea} 
      />
    </View>
  )
}