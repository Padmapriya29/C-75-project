import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import firebase from "firebase";
import db from "../config";
import ReadStoryScreen from '../screens/readStory'
export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailID: "",
      password: "",
    };
  }
  login = async (email, password) => {
    if (email && password) {
      try {
          const response = await firebase.auth().signInWithEmailAndPassword(email,password);
          if(response){
            this.props.navigation.navigate("Read");
          }
      } catch (error) {
          switch(error.code){
              case "auth/user-not-found":
              Alert.alert("User doesn't exist");
              break;
              case "auth/invalid-email":
              Alert.alert("Incorrect email or password");
              break;
          }
      }
    } else {
      Alert.alert("Enter email and password");
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            source={require("../assets/read.jpg")}
            style={{ width: 200, height: 200 }}
          />
          <Text style={{ textAlign: "center", fontSize: 30 }}>BedTime Stories</Text>
        </View>
        <View>
          <TextInput
            style={styles.loginBox}
            placeholder="ABC@example.com"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                emailID: text,
              });
            }}
          />
          <TextInput
            style={styles.loginBox}
            placeholder="enter password"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              this.login(this.state.emailID, this.state.password);
            }}
          >
            <Text style={styles.buttonText}>login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginBox: {
    width: 300,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
  },
  loginButton: {
    height: 30,
    width: 90,
    borderWidth: 1,
    marginTop: 20,
    paddingTop: 5,
    borderRadius: 7,
  },
  buttonText: {
    textAlign: "center",
  },
});
