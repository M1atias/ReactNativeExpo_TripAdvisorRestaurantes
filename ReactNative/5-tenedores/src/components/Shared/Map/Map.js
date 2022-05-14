import React from 'react'
import { View, Text } from 'react-native'
import MapView,{ Marker } from "react-native-maps";
import { styles } from "./Map.styles";
import openMap from "react-native-open-maps";

export function Map(props) {
    const {location} = props;

    const openAppMap = () =>{
        openMap({
            latitude: location.latitude,
            longitude: location.longitude,
            zoom:19
        });
    };
  return (
    <MapView style={styles.content} initialRegion={location} onPress={openAppMap}>
      <Marker coordinate={location}/>
    </MapView>
  )
}