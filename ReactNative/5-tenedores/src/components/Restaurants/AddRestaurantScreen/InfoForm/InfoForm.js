import React,{useState} from 'react'
import { View, Text } from 'react-native'
import {styles} from "./InfoForm.styles";
import { Input } from "react-native-elements";
import {MapForm} from '../MapForm';

export function InfoForm(props) {
    const {formik} = props;
    const [showMap, setShowMap] = useState(false);


    const onOpenCloseMap = () => setShowMap(prevState =>!prevState)
  return (
      <>
    <View style={styles.content}>
      <Input 
      placeholder='Nombre del restaurante'
      onChange={(text) => formik.setFieldValue("name",text)}
      errorMessage={formik.errors.name}
      />
      <Input 
      placeholder='Dirección'
      rightIcon={{
          type:"material-community",
          name:"map-marker-radius",
          color:"#c2c2c2",
          onPress: onOpenCloseMap
      }}
      onChange={(text) => formik.setFieldValue("address",text)}
      errorMessage={formik.errors.address}
      />
      <Input 
      placeholder='Telefono'
      onChange={(text) => formik.setFieldValue("phone",text)}
      errorMessage={formik.errors.phone}
      />
      <Input 
      placeholder='Email'
      onChange={(text) => formik.setFieldValue("email",text)}
      errorMessage={formik.errors.email} 
      />
      <Input 
      placeholder='Descripción del restaurante'
      multiline={true}
      inputStyle={styles.textArea}
      onChange={(text) => formik.setFieldValue("description",text)}
      errorMessage={formik.errors.description}
      />
      
    </View>
    <MapForm show={showMap} close={onOpenCloseMap} />
    </>
  )
}