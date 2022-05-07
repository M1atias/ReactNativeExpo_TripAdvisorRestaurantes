import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Button} from 'react-native-elements';
import { screen } from "../../utils";


export function RestaurantsScreen(props) {
    const {navigation} = props

    const goToAddRestaurant = () => {
        //navigation.navigate(screen.restaurant.addRestaurant);
        
        navigation.navigate(screen.restaurant.tab, {screen: screen.restaurant.addRestaurant})
        //navigation.navigate(screen.account.tab,{screen: screen.account.account})
    };

    return(
        <View>
            <Text>Estamos en la screen Restaurants</Text>

            
            <Button title="Crear Restaurante" onPress={goToAddRestaurant} />
        </View>
    );
}