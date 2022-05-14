import React,{useState} from 'react'
import { View, Text } from 'react-native'
import { Image } from "react-native-elements";
import { styles } from "./Carousel.styles";
import CarouselSanp, {Pagination} from "react-native-snap-carousel";
import { size } from "lodash";

export function Carousel(props) {
    const {arrayImages, width,height, hideDot} = props;
    const [activeDotIndex, setActiveDotIndex] = useState(0);

    const renderItem = ({item}) =>(
        <Image 
        source={{uri: item}}
        style={{height,width}}
        />
    );

    const pagination = () =>{
        return (
            <Pagination
            dotsLength={size(arrayImages)}
            activeDotIndex={activeDotIndex}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            containerStyle={styles.dotsContainer}
            dotStyle={styles.dot}
            />
        );
    };
  return (
    <View style={styles.content}>
      <CarouselSanp
      layout="stack"
      data = {arrayImages}
      sliderWidth={width}
      itemWidth={width}
      renderItem={renderItem}
      onSnapToItem= {(index) => setActiveDotIndex(index)}
      />
      {!hideDot && pagination()}
    </View>
  )
}