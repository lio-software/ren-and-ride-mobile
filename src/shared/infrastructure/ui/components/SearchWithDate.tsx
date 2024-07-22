import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const SearchWithDate = ({ startDate, setStartDate, endDate, setEndDate, searchText, setSearchText }) => {
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const showStartDatePicker = () => {
    setStartDatePickerVisible(true);
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisible(true);
  };

  const handleStartDateChange = (event, date) => {
    setStartDatePickerVisible(false);
    if (date) {
      const now = new Date();
      if (date < now) {
        date = now;
      }
      if (date >= endDate) {
        setEndDate(new Date(date.getTime() + 24 * 60 * 60 * 1000)); // Set endDate to at least one day after startDate
      }
      setStartDate(date);
    }
  };

  const handleEndDateChange = (event, date) => {
    setEndDatePickerVisible(false);
    if (date) {
      const now = new Date();
      if (date < now) {
        date = now;
      }
      const minEndDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000); // StartDate + 1 day
      if (date < minEndDate) {
        date = minEndDate;
      }
      setEndDate(date);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image
          source={{
            uri: "https://img.icons8.com/ios/50/000000/search--v1.png",
          }}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Buscar un vehiculo..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.dateContainer}>
        <TouchableOpacity
          style={styles.datePickerContainer}
          onPress={showStartDatePicker}
        >
          <Text style={styles.dateLabel}>Inicio</Text>
          <Text style={styles.dateText}>{startDate.toDateString()}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.datePickerContainer}
          onPress={showEndDatePicker}
        >
          <Text style={styles.dateLabel}>Final</Text>
          <Text style={styles.dateText}>{endDate.toDateString()}</Text>
        </TouchableOpacity>
      </View>

      {isStartDatePickerVisible && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={handleStartDateChange}
          style={styles.datePicker}
          accentColor="#7E49FF"
          minimumDate={new Date()}
        />
      )}

      {isEndDatePickerVisible && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={handleEndDateChange}
          style={styles.datePicker}
          accentColor="#7E49FF"
          minimumDate={new Date(startDate.getTime() + 24 * 60 * 60 * 1000)} // StartDate + 1 day
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 16,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  datePickerContainer: {
    width: "48%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dateLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
  },
  datePicker: {
    width: "100%",
    marginTop: 20,
  },
});

export default SearchWithDate;
