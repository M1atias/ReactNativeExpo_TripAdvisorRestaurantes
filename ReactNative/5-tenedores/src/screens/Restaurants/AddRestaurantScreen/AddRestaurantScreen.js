import React from 'react'
import { View, Text } from 'react-native'
import { styles } from "./AddRestaurantScreen.styles";
import { useFormik } from "formik";
import { InfoForm,UploadImageForm,ImageRestaurant } from "../../../components/Restaurants/AddRestaurantScreen";
import { Button } from "react-native-elements";
import { initialValues,validationSchema } from "./AddRestaurantScreen.data";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { v4 as uuid } from "uuid";
import { db } from "../../../utils";
import { doc,setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";


export function AddRestaurantScreen() {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema:validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) =>{
      try {
        const newData = formValue;
        newData.id = uuid()
        newData.createdAt = new Date();
        
        await setDoc(doc(db,"restaurants", newData.id), newData);

        navigation.goBack();
      } catch (error) {
        console.log(error)
      }
    },
  });

  return (
    <KeyboardAwareScrollView>
      <ImageRestaurant formik={formik} />

      <InfoForm formik={formik}/>

      <UploadImageForm formik={formik} />

      <Button 
      title="Crear restaurante"
      buttonStyle={styles.addRestaurante}
      onPress={formik.handleSubmit}
      loading={formik.isSubmitting}
      />
    </KeyboardAwareScrollView>
  );
}