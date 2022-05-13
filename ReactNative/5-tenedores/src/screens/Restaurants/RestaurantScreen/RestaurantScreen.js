import React from 'react'
import { View, Text } from 'react-native'
import { styles } from "./RestaurantScreen.styles";

export function RestaurantScreen(props) {
    const {route} = props;
    console.log(route);
  return (
    <View>
      <Text>RestaurantScreen</Text>
    </View>
  )
}