import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { Avatar, IconButton, Text } from "react-native-paper";
import { styles } from "../../theme/styles";
import firebase from "firebase/auth";
import { ProductCardComponent } from "./components/ProductCardComponent";
import { auth } from "../../configs/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";

//Interfaz que va a tener la data del usuario
interface FormUser {
  name: string;
}

//Interfaz para el producto
interface Product {
  name: string;
  price: number;
}

export const HomeScreen = () => {
  //Hook useState: para ir trabajando la data del usuario
  const [formUser, setFormUser] = useState<FormUser>({
    name: "",
  });

  //Hook useState: que me permita trabajar con la data del usuario autenticado
  const [userAuth, setUserAuth] = useState<firebase.User | null>(null);

  //Hook useState: para listar los productos
  const [products, setProducts] = useState<Product[]>([{ name: "", price: 0 }]);

  //Hook useNavigation: para navegar entre Screens
  const navigation = useNavigation();

  //Función de Logout
  const handleLogout = async () =>{
    try {
        await auth.signOut();
        navigation.dispatch(CommonActions.navigate({name:"Login"}))
    } catch (ex) {
        console.log(ex);
        
    }
  }

  return (
    <>
      <View style={styles.rootHome}>
        <View style={styles.header}>
          <Avatar.Text size={50} label="MI" />
          <View>
            <Text variant="bodySmall">Bienvenido</Text>
            <Text variant="labelLarge">{userAuth?.displayName}</Text>
          </View>
          <View style={styles.iconEnd}>
            <IconButton
              icon="logout"
              size={28}
              onPress={() => {handleLogout} }
            />
          </View>
        </View>
        <View>
          <FlatList
            data={products}
            renderItem={({ item }) => <ProductCardComponent />}
            keyExtractor={(item) => item.name}
          />
        </View>
      </View>
    </>
  );
};
