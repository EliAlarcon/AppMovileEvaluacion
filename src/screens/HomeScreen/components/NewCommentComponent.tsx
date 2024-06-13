import React, { useState } from "react";
import { Button, IconButton, Modal, Portal, Text, TextInput } from "react-native-paper";
import { styles } from "../../../theme/styles";
import { View } from "react-native";
import { auth, dbRealTime } from "../../../configs/firebaseConfig";
import { push, ref, set } from "firebase/database";

//Interfaz para Formulario de Comentarios
interface FormComment {
  email: string;
  comment: string;
}

//Interfaz para Props del modal
interface Props {
  showModalComment: boolean;
  setShowModalComment: Function;
}

export const NewCommentComponent = ({
  showModalComment,
  setShowModalComment,
}: Props) => {
  //Hook useState para manejo de formulario
  const [formComment, setFormComment] = useState<FormComment>({
    email: auth.currentUser?.email!,
    comment: "",
  });

  //Función para insertar datos en el formulario
  const handlerSetValues = (key: string, value: string) => {
    setFormComment({ ...formComment, [key]: value });
  };

  //Función para almacenar comentarios
  const handlerSaveComment = async() => {
    if (!formComment.comment) {
        return;
    }
    const dbRef = ref(dbRealTime, 'comments/'+ auth.currentUser?.uid);
    const saveComment = push(dbRef);
    try {
        await set(saveComment, formComment);
    } catch (ex) {
        console.log(ex);
    }
    setShowModalComment(false);
  };

  return (
    <Portal>
      <Modal
        visible={showModalComment}
        contentContainerStyle={styles.modalStyle}
      >
        <View style={styles.header}>
          <Text variant="titleMedium">Comentario</Text>
          <View style={styles.iconEnd}>
            <IconButton
              icon="close-box"
              size={28}
              onPress={() => setShowModalComment(false)}
            />
          </View>
        </View>
        <TextInput label="Email" value={auth.currentUser?.email!} disabled />
        <TextInput
          label="Inserta tu comentario"
          multiline={true}
          numberOfLines={7}
          onChangeText={(value) => {
            handlerSetValues("comment", value);
          }}
        />
        
        <Button mode="contained" onPress={handlerSaveComment}>
          Enviar
        </Button>
      </Modal>
    </Portal>
  );
};
