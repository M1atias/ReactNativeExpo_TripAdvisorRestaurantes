import React from 'react';
import { ScrollView,Image } from 'react-native';
import { Text,Button } from "react-native-elements";
//import { Image } from '@rneui/themed';
import {styles} from './UserGuestScreen.styles';
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export function UserGuestScreen() {
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate(screen.account.login)
  }
  return (
  <ScrollView centerContent={false} style={styles.content} >
    <Image source={require("../../../../assets/img/user-guest.png")} style={styles.image} />
    <Text style={styles.title} >Consultar tu perfil de 5 Tenedores</Text>
    <Text style= {styles.description}>
      ¿Como describirias tu mejor restaurante? Busca y visualiza los mejores 
      restaurantes de una forma sencila, vota cual te ha gustado más y
      comenta como ha sido tu experiencia.
    </Text>

    <Button title="Ver tu perfi" onPress={goToLogin} buttonStyle={styles.btnStyle} />
  </ScrollView>
  )
}