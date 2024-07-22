import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Card = ({image, title, price, location, stars, onPress} : {image: any, title: string, price: number, location: string, stars: number, onPress: () => void}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: image }}
        style={{
          width: "100%",
          height: 231,
          borderRadius: 8,
          marginBottom: 8,
        }}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>${price}mxn por día</Text>
      </View>
      <View style={styles.subtitleContainer}>
        <View style={styles.subtitleSecondary}>
          <Icon name="location-outline" size={14} color="#7E7E7E" />
          <Text style={styles.subtitleText}>{location}</Text>
        </View>
        <View style={styles.subtitleSecondary}>
          <Icon name="star-outline" size={14} color="#7E7E7E" />
          <Text style={styles.subtitleText}>{stars}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    paddingBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Inter",
    fontSize: 18,
    fontWeight: "600",
  },
  subtitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subtitle: { // Add this line
    fontFamily: "Inter",
    fontSize: 14,
    color: "#7E7E7E",
  },
  subtitleSecondary: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitleText: {
    marginLeft: 4,
    fontFamily: "Inter",
    fontSize: 14,
    color: "#7E7E7E",
  },
});

export default Card;
