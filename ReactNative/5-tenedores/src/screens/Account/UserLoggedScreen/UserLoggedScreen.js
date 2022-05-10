import { View } from 'react-native'
import React,{useState} from 'react'
import { Button } from "react-native-elements";
import { InfoUser } from "../../../components/Account";
import { styles } from "./UserLoggedScreen.styles";
import { getAuth, signOut} from "firebase/auth";
import { LoadingModal } from "../../../components";

export  function UserLoggedScreen() {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const logout = async() =>{
    const auth = getAuth();
    await signOut(auth);
  }
  return (
    <View>
      <InfoUser setLoading={setLoading} setLoadingText={setLoadingText}/>

      <Button 
      title="Cerrar sesión" 
      buttonStyle={styles.btnStyle} 
      titleStyle={styles.btnTextStyle}
      onPress={logout} 
      />
      <LoadingModal show={loading} text={loadingText} />
    </View>
  )
}