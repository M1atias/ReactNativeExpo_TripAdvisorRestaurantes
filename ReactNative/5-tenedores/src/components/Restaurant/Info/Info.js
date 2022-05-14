import React from 'react'
import { ScrollView } from 'react-native'
import {Text, ListItem, Icon} from 'react-native-elements';
import { styles } from "./Infor.styles";
import { map } from "lodash";
import { Map } from "../../Shared";

export function Info(props) {
    const {restaurant} = props;

    const listInfo = [
        {
            text:restaurant.address,
            iconType:'material-community',
            iconName:"map-marker",
        },
        {
          text:restaurant.phone,
          iconType:'material-community',
          iconName:"phone",
        },
        {
            text:restaurant.email,
            iconType:'material-community',
            iconName:"at",
        }
    ]
  return (
    <ScrollView style={styles.content}>
      <Text style={styles.title}>Información sobre el restaurante</Text>
      <Map location={restaurant.location} />
      {map(listInfo, (item, index) =>(
          <ListItem key={index} bottomDivider>
              <Icon 
              type={item.iconType}
              name={item.iconName}
              color="#00a680"
              />
              <ListItem.Content>
                  <ListItem.Title>
                      {item.text}
                  </ListItem.Title>
              </ListItem.Content>
          </ListItem>
      ))}
    </ScrollView>
  )
}