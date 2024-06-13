import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { View } from "react-native";
import { push, ref, remove, set, update } from "firebase/database";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Comment, User } from './HomeScreen';
import { auth, dbRealTime } from "../../configs/firebaseConfig";
import { styles } from "../../theme/styles";

export const DetailCommentScreen = () => {
  //Hook para tomar las propiedades de la ruta
  const route = useRoute();
  //@ts-ignore
  const { comments } = route.params;
  //console.log(comments);
  

  //Hook de navegación
  const navigation = useNavigation();

  //Hook useState para manejo de formulario
  const [editFormComment, setEditFormComment] = useState<Comment>({
    id: "",
    email: auth.currentUser?.email!,
    comment: "",
    userId: {id:auth.currentUser?.uid!},
  });

  //Hook useEffect para mostar la información del mensaje nen el formulario
  useEffect(() => {
    setEditFormComment(comments);
  }, []);

  //Función para insertar datos en el formulario
  const handlerSetValues = (key: string, value: string) => {
    setEditFormComment({ ...editFormComment, [key]: value });
  };

  //Función para actualizar la data del mensaje
  const handlerUpdateComment = async () => {
    //console.log(editFormMessage);
    //1. Referencia a la BDD - tabla
    const dbRef = ref(
      dbRealTime,
      "comments/" + auth.currentUser?.uid + "/" + editFormComment.id
    );
    await update(dbRef, {
      comment: editFormComment.comment,
    });
    console.log(editFormComment);
    
    navigation.goBack();
  };

  //Función para eliminar la data del mensaje
  const handlerDeletComment = async () => {
    //1. Referencia a la BDD - tabla
    const dbRef = ref(
      dbRealTime,
      "comments/" + auth.currentUser?.uid + "/" + editFormComment.id
    );
    await remove(dbRef);
    navigation.goBack();
  };

  return (
    <View>
      <Text variant="titleMedium">Detalle Comentario</Text>
      <TextInput label="Email" value={auth.currentUser?.email!} disabled />
      <TextInput
        value={editFormComment.comment}
        multiline={true}
        numberOfLines={7}
        onChangeText={(value) => {
          handlerSetValues("comment", value);
        }}
      />
      <Button
        icon="email-sync"
        mode="contained"
        style={styles.button}
        onPress={handlerUpdateComment}
      >
        Actualizar
      </Button>
      <Button
        icon="email-remove"
        mode="contained"
        style={styles.button}
        onPress={handlerDeletComment}
      >
        Eliminar
      </Button>
    </View>
  );
};
