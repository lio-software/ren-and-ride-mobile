import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ListingCard = ({
  showDeactivateButton = false,
  showReactivateButton = false,
  onPress,
  onDeactivate,
  onReactivate,
  title,
  price,
  isAvaliable,
  image,
}: {
  showDeactivateButton?: boolean;
  showReactivateButton?: boolean;
  onPress: () => void;
  onDeactivate: () => void;
  onReactivate: () => void;
  title: string;
  price: number;
  isAvaliable?: boolean;
  image: string;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isDeactivateModal, setIsDeactivateModal] = useState(false);

  const handleDeactivate = () => {
    onDeactivate();
    setModalVisible(false); // Close the modal after deactivation
  };

  const handleReactivate = () => {
    onReactivate();
    setModalVisible(false); // Close the modal after reactivation
  };

  const status = {
    true: "Disponible",
    false: "No disponible",
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>${price} mxn por dia</Text>
          {isAvaliable !== undefined && (
            <Text style={styles.status}>
              {isAvaliable ? status.true : status.false}
            </Text>
          )}
        </View>
        {showDeactivateButton && isAvaliable && (
          <TouchableOpacity onPress={() => {setModalVisible(true); setIsDeactivateModal(true);}}>
            <Icon name="block" size={30} color="#7E49FF" />
          </TouchableOpacity>
        )}
        {showReactivateButton && !isAvaliable && (
          <TouchableOpacity onPress={() => {setModalVisible(true); setIsDeactivateModal(false);}}>
            <Icon name="check-circle-outline" size={30} color="#7E49FF" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {isDeactivateModal ? "¿Estás seguro de desactivar este vehículo?" : "¿Estás seguro de reactivar este vehículo?"}
            </Text>
            <View style={styles.buttonContainer}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title={isDeactivateModal ? "Desactivar" : "Reactivar"} onPress={isDeactivateModal ? handleDeactivate : handleReactivate} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 5,
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: "Inter",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 4,
  },
  status: {
    fontFamily: "Inter",
    fontSize: 15,
    color: "#888",
    marginBottom: 2,
  },
  price: {
    fontFamily: "Inter",
    fontSize: 15,
    color: "#888",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default ListingCard;
