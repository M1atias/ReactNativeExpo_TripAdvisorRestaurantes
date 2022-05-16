import { View } from 'react-native'
import React from 'react'
import { styles } from "./NotFoundRestaurant.styles";
import { Text, Icon } from "react-native-elements";

export function NotFoundRestaurant() {
  return (
    <View style={styles.content}>
      <Icon 
      type='material-community'
      name='alert-outline'
      size={80}
      />
      <Text style={styles.text}>
          No tienes restaurantes en tu lista
      </Text>
    </View>
  )
}