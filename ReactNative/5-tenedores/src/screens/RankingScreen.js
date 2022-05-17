import React,{useState,useEffect} from 'react'
import { ScrollView } from 'react-native'
import { collection,query,orderBy,onSnapshot,limit } from "firebase/firestore";
import { db } from "../utils";
import { map } from "lodash";
import { RestaurantRanking } from "../components/Restaurants";

export function RankingScreen() {

  const [restaurants, setRestaurants] = useState(null);


  useEffect(() => {
    const q = query(
      collection(db,"restaurants"),
      orderBy("ratingMedia","desc"),
      limit(6),
    );

    onSnapshot(q,(snapshot) =>{
      setRestaurants(snapshot.docs);
    });
  }, []);
  
  return (
    <ScrollView>
      {map(restaurants, (restauran, index) => (
        <RestaurantRanking 
        key={index}
        index={index}
        restaurant={restauran.data()}
        />
      ))}
    </ScrollView>
  )
}