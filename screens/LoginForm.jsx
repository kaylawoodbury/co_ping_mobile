import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_LOGIN_FORM } from "../state/actions/actionTypes";
import { Overlay } from 'react-native-elements'
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TextInput,
  View
} from "react-native";
import { onLogin } from "../modules/authentication";

const LoginForm = () => {
  const dispatch = useDispatch();
  const loginMessage = useSelector(state => state.loginMessage);
  const showLoginForm = useSelector(state => state.showLoginForm);
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  // const login = e => {
  //   onLogin({ email }, { password }, dispatch);
  // };

  return (
    <>
      {showLoginForm && (
        <Overlay
          style={styles.formOverlay}
          animationType="fade"
          transparent={true}
          visible={true}
          fullScreen={true}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          overlayBackgroundColor="red"
          width="100%"
          height="100%"
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.modalView} id="login-form">
            <Text style={styles.modalText}>Login</Text>
            <TextInput
              placeholder="Email"
              style={styles.loginInput}
              id="email"
              value={email}
              onChangeText={email => onChangeEmail(email)}
            />
            <TextInput
              placeholder="Password"
              style={styles.loginInput}
              id="password"
              value={password}
              onChangeText={password => onChangePassword(password)}
            />

            <TouchableHighlight
              style={styles.button}
              onPress={(e) => onLogin(email, password, dispatch)}
            >
              <Text id="submit-login" style={styles.buttonText}>
                Submit
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={() => dispatch({ type: CLOSE_LOGIN_FORM })}
            >
              <Text id="close-login-form" style={styles.buttonText}>
                Close
              </Text>
            </TouchableHighlight>

            <Text id="login-message" style={styles.modelText}>
              {loginMessage}
            </Text>
          </View>
        </Overlay>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  formOverlay: {
    alignSelf: "center"
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25
  },
  loginInput: {
    textAlign: "left",
    fontSize: 18,
    padding: 18,
    margin: 2,
    borderColor: "black",
    borderWidth: 2
  },
  button: {
    borderRadius: 5,
    backgroundColor: "#71B280",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500"
  }
});

export default LoginForm;
