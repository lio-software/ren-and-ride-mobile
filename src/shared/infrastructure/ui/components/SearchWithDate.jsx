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

const SearchWithDate = () => {
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
      if (date < new Date()) {
        date = new Date();
      }
      setStartDate(date);
    }
    if (date > endDate) {
      setEndDate(date);
    }
  };

  const handleEndDateChange = (event, date) => {
    setEndDatePickerVisible(false);
    if (date) {
      if (date < new Date()) {
        date = new Date();
      }
      setEndDate(date);
    }
    if (date < startDate) {
      setStartDate(date);
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
          placeholder="Look for a vehicle..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.dateContainer}>
        <TouchableOpacity
          style={styles.datePickerContainer}
          onPress={showStartDatePicker}
        >
          <Text style={styles.dateLabel}>Start Date</Text>
          <Text style={styles.dateText}>{startDate.toDateString()}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.datePickerContainer}
          onPress={showEndDatePicker}
        >
          <Text style={styles.dateLabel}>End Date</Text>
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
          minimumDate={startDate}
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
    marginBottom: 20,
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
    marginBottom: 8,
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
