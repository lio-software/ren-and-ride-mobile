import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Input from "../../../shared/infrastructure/ui/components/Input";
import AppBar from "../../../shared/infrastructure/ui/components/AppBar";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../shared/infrastructure/ui/components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { rateVehicleUseCase } from "../../infrastructure/dependencies";
import CommentEntity from "../../domain/entities/CommentEntity";
import { useSelector } from "react-redux";
import { selectUser } from "../../../shared/infrastructure/redux/reducers/authReducer";

type RootStackParamList = {
  RateExperience: { vehicleId: string };
  Success: { message: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "RateExperience">;

const RateExperienceScreen = ({ navigation, route }: Props) => {
  const user = useSelector(selectUser);
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { vehicleId } = route.params;

  const handleStarPress = (star) => {
    setStars(star);
  };

  const handleCommentChange = (text) => {
    if (text.length <= 100) {
      setComment(text);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await rateVehicleUseCase.execute(
        new CommentEntity({
          uuid: "",
          userId: user._id,
          vehicleId: vehicleId,
          stars,
          text: comment,
        })
      );
      navigation.navigate("Success", {
        message:
          "Gracias por calificar tu experiencia. Tu opinión es muy importante para nosotros.",
      });
    } catch (error) {
      Alert.alert("Error", error);
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppBar
          text="Califica tu experiencia"
          showBackButton
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => handleStarPress(star)}
              >
                <Icon
                  name={star <= stars ? "star" : "star-outline"}
                  size={32}
                  color="#FFD700"
                  style={styles.star}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.inputContainer}>
            <Input
              label="Comentario"
              value={comment}
              placeholder="Escribe un comentario"
              onChangeText={handleCommentChange}
              multiline
            />
            <Text style={styles.charCount}>{`${comment.length}/100`}</Text>
          </View>
          <Button isSubmitting={isSubmitting} text="Enviar" isPrimary onClick={() => handleSubmit()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  star: {
    marginHorizontal: 5,
  },
  input: {
    height: 100,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  inputContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  charCount: {
    alignSelf: "flex-end",
    color: "#7E7E7E",
  },
});

export default RateExperienceScreen;
