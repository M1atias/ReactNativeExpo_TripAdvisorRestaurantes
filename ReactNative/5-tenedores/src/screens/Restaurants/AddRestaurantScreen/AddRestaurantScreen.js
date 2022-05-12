import { View, Text } from 'react-native'
import React from 'react'
import { styles } from "./AddRestaurantScreen.styles";
import { InfoForm } from "../../../components/Restaurants/AddRestaurantScreen";

export function AddRestaurantScreen() {
  return (
    <View>
      <InfoForm />
    </View>
  )
}