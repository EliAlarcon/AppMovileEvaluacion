import React from "react";
import { View } from "react-native";
import { styles } from "../../../theme/styles";
import { IconButton, Text } from "react-native-paper";
import { Comment } from "../HomeScreen";
import { CommonActions, useNavigation } from "@react-navigation/native";

interface Props {
  comments: Comment;
}
export const CommentsCardComponent = ({ comments }: Props) => {
  //Hook de navegación
  const navigation = useNavigation();

  return (
    <View style={styles.rootMessage}>
      <View>
        <Text variant="labelLarge">Email:{comments.email} </Text>
        <Text variant="bodyMedium">Comentario: {comments.comment} </Text>
      </View>
      <View style={styles.iconEnd}>
        <IconButton
          icon="email-open"
          size={25}
          onPress={() =>
            navigation.dispatch(
              CommonActions.navigate({
                name: "DetailComment",
                params: { comments },
              })
            )
          }
        />
      </View>
    </View>
  );
};
