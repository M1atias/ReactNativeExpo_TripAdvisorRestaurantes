import React, {useState, useEffect} from 'react'
import { View, Text, ScrollView, Dimensions } from 'react-native'
import { styles } from "./RestaurantScreen.styles";
import { doc,onSnapshot,collection,query,where,orderBy } from "firebase/firestore";
import { db } from "../../../utils";
import { Carousel,Loading } from "../../../components/Shared";
import { Header,Info } from "../../../components/Restaurant";

export function RestaurantScreen(props) {
    const {route} = props;

    const {width} = Dimensions.get("window")
    
    const [restaurant, setRestaurant] = useState(null)

    useEffect(() => {
      setRestaurant(null)
      onSnapshot(doc(db,"restaurants",route.params.id), (doc) => {
          setRestaurant(doc.data());
      });

    }, [route.params.id]);
    
    if (!restaurant) return <Loading show  text="Cargando restaurantes" />;
  return (
    <ScrollView style={styles.content} >
        <Carousel arrayImages={restaurant.images} width={width} height={250}  />

        <Header restaurant ={restaurant} />
        <Info  restaurant ={restaurant}/>
    </ScrollView>
  )
}