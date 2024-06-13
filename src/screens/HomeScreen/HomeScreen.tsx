import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Avatar, FAB, IconButton, Text } from "react-native-paper";
import { styles } from "../../theme/styles";
import firebase, { signOut } from "firebase/auth";
import { ProductCardComponent } from "./components/ProductCardComponent";
import { auth, dbRealTime } from "../../configs/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { NewCommentComponent } from "./components/NewCommentComponent";
import { onValue, ref } from "firebase/database";
import { CommentsCardComponent } from "./components/CommentsCardComponent";

//Interfaz que va a tener la data del usuario
interface User {
  id: string
}

export interface Comment {
  userId: User;
  id: string;
  email: string;
  comment: string;
}

export const HomeScreen = () => {

  //Hook useState: que me permita trabajar con la data del usuario autenticado
  const [userAuth, setUserAuth] = useState<firebase.User | null>(null);

  //Hook useNavigation: para navegar entre Screens
  const navigation = useNavigation();

  //Hook useEffect: para capturar la data del usuario autenticado
  useEffect(() => {
    setUserAuth(auth.currentUser);
    getAllComments();
    //console.log("Comments"+comments);
    
  }, []);

  //Hook useState: para manipular el modal de añadir mensaje
  const [showModalComment, setShowModalComment] = useState<boolean>(false);

  //Hook useState: para listas los comentarios
  const [comments, setComments] = useState<Comment[]>([]);

  //Función de Logout
  const handlerSignOut = async () => {
    await signOut(auth);
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: "Login" }] })
    );
  };
  
  //READ - CRUD
  const getAllComments = () => {
    const dbRef = ref(dbRealTime, "comments/"+auth.currentUser?.uid);
    onValue(dbRef, (snapshot) =>{
      const data = snapshot.val();
      console.log(data);
      if(!data) return;
      const getKeys = Object.keys(data);
      const listComments: Comment[] = [];
      getKeys.forEach((key)=>{
        const value = { ...data[key], id: key };
        listComments.push(value);
      });
      setComments(listComments);
      console.log("Lista",listComments);
      
    })
  }

  return (
    <>
      <View style={styles.rootHome}>
        <View style={styles.header}>
          <Avatar.Text size={50} label="MI" />
          <View>
            <Text variant="bodySmall">Bienvenido</Text>
            <Text variant="labelLarge">{userAuth?.email}</Text>
          </View>
          <View style={styles.iconEnd}>
            <IconButton icon="logout" size={28} onPress={handlerSignOut} />
          </View>
        </View>
        <View>
          
          <FlatList
            data={comments}
            renderItem={({ item }) => <CommentsCardComponent comments={item}/>}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setShowModalComment(true)}
      />
      <NewCommentComponent
        showModalComment={showModalComment}
        setShowModalComment={setShowModalComment}
      />
    </>
  );
};
