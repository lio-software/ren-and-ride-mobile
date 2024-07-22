import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const insertLineBreaks = (text, maxLength) => {
  const words = text.split(' ');
  let line = '';
  const result = [];

  words.forEach((word) => {
    if (line.length + word.length + 1 > maxLength) {
      result.push(line.trim());
      line = word;
    } else {
      line += ` ${word}`;
    }
  });

  if (line.length > 0) {
    result.push(line.trim());
  }

  return result.join("\n");
};

const Comment = ({ user, userImage, date, comment, rating }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={userImage ? { uri: userImage } : require("../../../../../assets/images/defaultprofile.png")}
        style={styles.userImage} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user}</Text>
          <View style={styles.ratingContainer}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Icon
                key={index}
                name={index < rating ? "star" : "star-outline"}
                size={16}
                color="#FFD700"
              />
            ))}
          </View>
        </View>
      </View>

      <Text style={styles.comment}>
        {insertLineBreaks(comment, 50)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
    marginTop: 10,
    marginHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  userInfo: {
    flexDirection: "column",
  },
  userName: {
    fontWeight: "600",
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: "row",
  },
  comment: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20, 
  },
});

export default Comment;
