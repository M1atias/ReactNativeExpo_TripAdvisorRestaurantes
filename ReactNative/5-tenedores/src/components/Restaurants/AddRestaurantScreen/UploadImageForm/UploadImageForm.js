import React,{useState} from 'react'
import { View, Alert, Text, ScrollView } from 'react-native'
import { Icon, Avatar } from "react-native-elements";
import {styles} from './UploadImageForm.styles'
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { LoadingModal } from "../../../Shared";
import { map, filter } from "lodash";

export function UploadImageForm(props) {
    const {formik} = props;

    const [isLoading, setIsLoading] = useState(false)

    const openGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        });
        if(!result.cancelled){
            setIsLoading(true);
            uploadImage(result.uri);
        }
    };

    const uploadImage = async (uri) =>{
        const response = await fetch(uri);
        const blob = await response.blob();

        const storage = getStorage();
        const storageRef = ref(storage,`restaurants/${uuid()}`);

        uploadBytes(storageRef, blob).then((sanpshot) => {
            updatePhotoRestaurant(sanpshot.metadata.fullPath);
        });

    };

    const updatePhotoRestaurant = async (imagePath) =>{
        const storage = getStorage();
        const imageRef = ref(storage, imagePath);
        
        const imageUrl = await getDownloadURL(imageRef);

        console.log(formik.setFieldValue("images", [...formik.values.images, imageUrl]));
        setIsLoading(false);
    };

    const removeImage = (image) =>{
        Alert.alert(
            "Eliminar imagen",
            "¿Estás seguro de eliminar esta imagen?",
            [
                {
                    text:"Cancelar",
                    style:"cancel"
                },
                {
                    text:"Eliminar",
                    onPress:() =>{
                        const result = filter(formik.values.images, (img) => img !== image)
                        formik.setFieldValue("images", result);
                    }
                },
            ],
            {cancelable:false}
        );
    };

  return (
    <>
      <ScrollView style={styles.viewImage} horizontal showsHorizontalScrollIndicator={false}>
          <Icon 
          type='material-community'
          name='camera'
          color="#a7a7a7"
          containerStyle={styles.containerIcon}
          onPress={openGallery}
          />

          {map(formik.values.images, (image) =>(
              <Avatar
              key={image} 
              source={{uri:image}}
              containerStyle={styles.imageStyle}
              onPress={() => removeImage(image)}
              />
          ))}
      </ScrollView>
      <Text style={styles.errors}>{formik.errors.images}</Text>

      <LoadingModal show={isLoading} text="Subiendo imagen" />
    </>
  )
}