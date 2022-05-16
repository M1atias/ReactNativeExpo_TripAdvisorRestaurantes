import React, {useState,useEffect} from 'react'
import { View, Text, ScrollView } from 'react-native'
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { UserNotLogged,NotFoundRestaurant,RestaurantFavorite } from "../components/Favorites";
import { doc, getDoc, collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../utils";
import { Loading } from "../components/Shared";
import { size,map} from "lodash";

export function FavoritesScreen() {
  const auth = getAuth();
  const [hasLogged, setHasLogged] = useState(null);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth,(user) =>{
      setHasLogged(user ? true : false);
    });
  }, []);

  useEffect(() => {
    const q = query(
      collection(db,"favorites"),
      where("idUser", "==", auth.currentUser.uid)
    );
    onSnapshot(q, async(snapshot) =>{
      let restaurantArray = [];
      for await(const item of snapshot.docs){
        const data = item.data();
        const docRef = doc(db,"restaurants", data.idRestaurant);
        const docSnap = await getDoc(docRef);
        const newData = docSnap.data();
        newData.idFavorite = data.id;

        restaurantArray.push(newData);
      }

      setRestaurant(restaurantArray);
    });
  }, []);
  

  if(!hasLogged) return <UserNotLogged />;

  if(!restaurant) return <Loading show text="Cargando" />;

  if(size(restaurant) === 0) return <NotFoundRestaurant />;
  
  return (
    <ScrollView>
      {map(restaurant, (item) =>(
        <RestaurantFavorite  key={item.id} restaurant={item}/>
      ))}
    </ScrollView>
  )
}