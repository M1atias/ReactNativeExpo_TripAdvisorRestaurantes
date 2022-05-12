import React,{useState} from 'react'
import { View,Text } from 'react-native'
import { ListItem, Icon } from "react-native-elements";
import { map } from "lodash";
import { Modal } from "../../components";
import { ChangeDisplayNameForm } from "./ChangeDisplayNameForm";
import { ChangeDisplayEmailForm } from "./ChangeDisplayEmailForm";
import { ChangeDisplayPassForm } from "./ChangeDisplayPassForm";

export function AccountOptions(props) {
    const {onReload} = props;

    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);

    const onCloseOpenModal = () => setShowModal((prevState) => !prevState);
    
    const selectedComponent = (key) =>{
        if (key === "displayName") {
            setRenderComponent(<ChangeDisplayNameForm onClose={onCloseOpenModal} onReload={onReload}/>);
        }
        if (key === "email") {
            setRenderComponent(<ChangeDisplayEmailForm onClose={onCloseOpenModal} onReload={onReload}/>);
        }
        if (key === "pass") {
            setRenderComponent(<ChangeDisplayPassForm onClose={onCloseOpenModal} />);
        }

        onCloseOpenModal();
    }
    
    const menuOptions = getmenuOptions(selectedComponent);

  return (
    <View>
      {map(menuOptions, (menu, index) => (
          <ListItem 
          key={index} 
          bottomDivider 
          onPress={menu.onPress}
          >
              <Icon 
              type={menu.iconType} 
              name={menu.iconNameLeft} 
              color={menu.iconColorLeft} />
              <ListItem.Content>
                  <ListItem.Title>
                      {menu.title}
                  </ListItem.Title>
              </ListItem.Content>
              <Icon 
              type={menu.iconType} 
              name={menu.iconNameRight} 
              color={menu.iconColorRight} />
          </ListItem>
      ))}
      <Modal show ={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </View>
  )
}


function getmenuOptions(selectedComponent) {
    return [
        {
            title: "Cambiar Nombre y Apellido",
            iconType: "material-community",
            iconNameLeft:"account-circle",
            iconColorLeft:"#ccc",
            iconNameRight:"chevron-right",
            iconColorRight:"#ccc",
            onPress: () => selectedComponent("displayName"),
        },
        {
            title: "Cambiar Email",
            iconType: "material-community",
            iconNameLeft:"at",
            iconColorLeft:"#ccc",
            iconNameRight:"chevron-right",
            iconColorRight:"#ccc",
            onPress: () => selectedComponent("email"),
        },
        {
            title: "Cambiar contraseña",
            iconType: "material-community",
            iconNameLeft:"lock-reset",
            iconColorLeft:"#ccc",
            iconNameRight:"chevron-right",
            iconColorRight:"#ccc",
            onPress: () => selectedComponent("pass"),
        },
    ];
}