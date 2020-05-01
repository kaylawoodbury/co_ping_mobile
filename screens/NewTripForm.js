import React, { useState } from "react"
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TextInput,
  View,
  Button
} from "react-native"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import {
  NEW_TRIP_FORM,
  CLOSE_NEW_TRIP_FORM,
} from "state/actions/actionTypes"
import AsyncStorage from "@react-native-community/async-storage"
import DateTimePicker from "@react-native-community/datetimepicker";

const NewTripForm = () => {
  const storage = AsyncStorage
  const dispatch = useDispatch()
  const showTripForm = useSelector(
    (state) => state.showTripForm
  )
  const userId = useSelector((state) => state.userId)
  const newTripCreatedMessage = useSelector(
    (state) => state.newTripCreatedMessage
  )

  const [date, setDate] = useState(1598051730000);
  const [time, setTime] = useState("")
  const [storevalue, onChangeStore] = useState("")
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const createNewTrip = async (e) => {
    let headers = JSON.parse(
      await storage.getItem("auth-storage")
    )
    e.preventDefault()
    let response = await axios.post(
      "https://co-ping.herokuapp.com/pings",
      {
        ping: {
          time: `${datevalue}-${timevalue}`,
          store: storevalue,
          user_id: userId,
        },
      },
      { headers: headers }
    )
    dispatch({
      type: NEW_TRIP_FORM,
      payload: {
        newTripCreatedMessage: response.data.message,
      },
    })
  }
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <>
      <View>
        {showTripForm && (
          <Modal
            style={styles.formModal}
            presentationStyle="overFullScreen"
            animationType="fade"
            transparent={true}
            visible={true}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.modalView} id="trip-form">
              <Text style={styles.modalText}>New Shopping Trip Details</Text>
              {/* <TextInput
                placeholder="YYYY-MM-DD"
                style={styles.dateInput}
                id="date"
                type="date"
                value={datevalue}
                onChangeText={(date) => onChangeDate(date)}
                onPress={showDatepicker}
              />
              <TextInput
                placeholder="hh:mm"
                style={styles.dateInput}
                id="time"
                type="time"
                value={timevalue}
                onChangeText={(time) => onChangeText(time)}
                onPress={showTimepicker}
              /> */}
              <Button
                title="Pick a date"
                style={styles.button}
                onPress={showDatepicker}
              />
              <TextInput
                placeholder="Store"
                style={styles.storeInput}
                id="store"
                value={storevalue}
                onChangeText={(store) => onChangeStore(store)}
              />

              <TouchableHighlight
                style={styles.button}
                onPress={(e) => {
                  createNewTrip(e);
                }}
              >
                <Text id="create-trip-button" style={styles.buttonText}>
                  Create
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.button}
                onPress={() => dispatch({ type: CLOSE_NEW_TRIP_FORM })}
              >
                <Text id="close-trip-form" style={styles.buttonText}>
                  Close
                </Text>
              </TouchableHighlight>
              <Text id="new-trip-message" style={styles.modelText}>
                {newTripCreatedMessage}
              </Text>
            </View>
          </Modal>
        )}
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            // timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            // is24Hour={true}
            display="default"
            onChange={(date) => setDate(date)}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  formModal: {
    alignSelf: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    marginTop: 260,
    alignItems: "center",
    shadowColor: "#134e5e",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 50,
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Futura-Medium",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    fontFamily: "Futura-Medium",
  },
  dateInput: {
    textAlign: "left",
    fontSize: 18,
    padding: 18,
    margin: 2,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
  },
  storeInput: {
    textAlign: "left",
    fontSize: 18,
    padding: 18,
    margin: 2,
    fontWeight: "300",
    fontFamily: "Futura-Medium",
  },
  button: {
    borderRadius: 5,
    backgroundColor: "#71B280",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: 90,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Futura-Medium",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
  },
});

export default NewTripForm