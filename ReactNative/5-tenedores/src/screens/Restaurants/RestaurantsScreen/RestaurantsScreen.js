import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Icon} from 'react-native-elements';
import { screen } from "../../../utils";
import { styles } from "./RestaurantsScreen.styles";
import { getAuth,onAuthStateChanged } from "firebase/auth";

export function RestaurantsScreen(props) {
    const {navigation} = props;

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) =>{
          setCurrentUser(user);
      })
    }, [])
    

    const goToAddRestaurant = () => {
        //navigation.navigate(screen.restaurant.addRestaurant);
        
        navigation.navigate(screen.restaurant.tab, {screen: screen.restaurant.addRestaurant})
        //navigation.navigate(screen.account.tab,{screen: screen.account.account})
    };

    return(
        <View style={styles.content}>
            <Text>Estamos en la screen Restaurants</Text>

            {currentUser && (

                <Icon 
                reverse
                type='material-community'
                name="plus"
                color="#00a680"
                containerStyle={styles.btnContainer}
                onPress={goToAddRestaurant}
                />
                )}
        </View>
    );
}