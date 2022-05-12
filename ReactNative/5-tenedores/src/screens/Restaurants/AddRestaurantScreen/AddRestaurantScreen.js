import { View, Text } from 'react-native'
import React from 'react'
import { styles } from "./AddRestaurantScreen.styles";
import { useFormik } from "formik";
import { InfoForm } from "../../../components/Restaurants/AddRestaurantScreen";
import { Button } from "react-native-elements";
import { initialValues,validationSchema } from "./AddRestaurantScreen.data";

export function AddRestaurantScreen() {

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema:validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) =>{

    },
  });

  return (
    <View>
      <InfoForm formik={formik}/>


      <Button 
      title="Crear restaurante"
      buttonStyle={styles.addRestaurante}
      onPress={formik.handleSubmit}
      loading={formik.isSubmitting}
      />
    </View>
  );
}