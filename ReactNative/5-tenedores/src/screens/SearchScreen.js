import React, {useState, useEffect} from 'react'
import { View, ScrollView } from 'react-native'
import { SearchBar, ListItem, Avatar, Icon, Text } from "react-native-elements";
import { Loading } from "../components/Shared";
import { db,screen } from "../utils";
import { size,map } from "lodash";
import { collection, query, startAt, endAt, limit, orderBy, getDocs, Query } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export function SearchScreen() {
  const [searchResults, setSearchResults] = useState(null);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();

  const goToRestaurant = (idRestaurant) =>{
    navigation.navigate(screen.restaurant.tab,{
      screen:screen.restaurant.restaurant,
      params:{
        id: idRestaurant
      }
    })
  }


  useEffect(() => {
    (async () => {
      const q = query(
        collection(db,"restaurants"),
        orderBy("name"),
        startAt(searchText),
        endAt(`${searchText}\uf8ff`),
        limit(20)
      )
      const querySnapshot = await getDocs(q);
      setSearchResults(querySnapshot.docs);
    })()
  }, [searchText])
  
  
  return (
    <>
      <SearchBar 
      placeholder='Busca tu restaurante'
      value={searchText}
      onChangeText={(text) => setSearchText(text)}
      />
      {!searchResults && <Loading show  text="Cargando"/>}

      <ScrollView>
        {size(searchResults) === 0 ? (
          <View style={{alignItems:"center", marginTop:20}}>
            <Text>No se han encontrado resultados</Text>
          </View>
        ):
        (
          map(searchResults, (item) =>{
            const data = item.data()

            return(
              <ListItem key={data.id} bottomDivider onPress={() => goToRestaurant(data.id)}>
                <Avatar 
                source={{uri:data.images[0]}}
                rounded
                />
                <ListItem.Content>
                  <ListItem.Title>{data.name}</ListItem.Title>
                </ListItem.Content>
                <Icon
                type='material-community'
                name='chevron-right'
                />
              </ListItem>
            )
          })
        )}
      </ScrollView>
    </>
  )
}