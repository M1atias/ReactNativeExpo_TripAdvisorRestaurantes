import { View } from 'react-native'
import React,{useState} from 'react'
import { Button } from "react-native-elements";
import { InfoUser , AccountOptions} from "../../../components/Account";
import { styles } from "./UserLoggedScreen.styles";
import { getAuth, signOut} from "firebase/auth";
import { LoadingModal } from "../../../components";

export  function UserLoggedScreen() {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [_, setReload] = useState(false);


  const onReload = () => setReload((prevState) => !prevState);

  const logout = async() =>{
    const auth = getAuth();
    await signOut(auth);
  }
  return (
    <View>
      <InfoUser setLoading={setLoading} setLoadingText={setLoadingText}/>

      <AccountOptions onReload={onReload} />

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