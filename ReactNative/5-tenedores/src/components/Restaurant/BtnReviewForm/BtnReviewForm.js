import React,{useState, useEffect} from 'react'
import { View } from 'react-native'
import { Text,Button } from "react-native-elements";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { styles } from "./BtnReviewForm.styles";
import { useNavigation } from "@react-navigation/native";
import { screen,db } from "../../../utils";
import { size } from "lodash";

export function BtnReviewForm(props) {
    const {idRestaurant} = props;
    const auth = getAuth();
    const navigation = useNavigation();
    const [hasLogged, setHasLogged] = useState(false);
    const [hasReview, setHasReview] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, user =>{
            setHasLogged(user ? true:false);
        });
    }, []);

    useEffect(() => {
        if (hasLogged) {
            const q = query(
                collection(db,"reviews"),
                where("idRestaurant", "==", idRestaurant),
                where("idUser", "==", auth.currentUser.uid)
            );
            onSnapshot(q,(snapshot)=>{
                if (size(snapshot.docs) > 0) setHasReview(true);
                console.log(snapshot.docs);
            });
        }
    }, [hasLogged])
    

    const goToLogin = () =>{
        navigation.navigate(screen.account.tab,{
            screen: screen.account.login
        });
    };

    const goToAddReview = () =>{
        navigation.navigate(screen.restaurant.addReviewRestaurant,{
            idRestaurant,
        });
    };

    if (hasLogged && hasReview) {
        return(
        <View style={styles.content}>
            <Text style={styles.textSendReview} >Ya has enviado un review a este restaurante</Text>
        </View>
        )

    }

    return (
    <View style={styles.content}>
      {hasLogged ? (
          <Button 
          title="Escribe una opinión"
          icon={{type:"material-community", name:"square-edit-outline", color:"#00a680"}}
          buttonStyle={styles.button}
          titleStyle={styles.btnText}
          onPress={goToAddReview}
          />
      ):(
          <Text style={styles.text} >Para escribir una opinión es necesario estar logueado{" "} 
          <Text style={styles.textClick} onPress={goToLogin} >pulsa AQUÍ para iniciar sesión</Text>
          </Text>
      )}
    </View>
  )
}