import React from 'react'
import { View, Text } from 'react-native'
import { styles } from "./ImageRestaurant.styles";
import { Image } from "react-native-elements";

export function ImageRestaurant(props) {
    const {formik} = props;

    const primaryImage = formik.values.images[0];

  return (
    <View style={styles.content}>
      <Image
      source={primaryImage ? {uri:primaryImage} : require("../../../../../assets/img/not-found-image-15383864787lu.jpg")}
      style={styles.images} 
      />
    </View>
  )
}