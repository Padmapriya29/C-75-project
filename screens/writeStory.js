import React from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import { Header } from "react-native-elements";
import db from "../config";
import firebase from "firebase";

export default class WriteStoryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      author: "",
      story: "",
    };
  }

  submitStory = (title, author, story) => {
    db.collection("stories").add({
      title: title,
      author: author,
      story: story,
    });
    Alert.alert("Story Added Successfully");
    //ToastAndroid.show("Story Added Successfully", ToastAndroid.SHORT);
    this.setState({
      author: "",
      story: "",
      title: "",
    });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 20,
        }}
      >
        <Header
          centerComponent={{
            text: "Write Story",
            style: { color: "black", fontSize: 20, fontWeight: "bold" },
          }}
          backgroundColor="#FFAD8D"
        />
        <KeyboardAvoidingView behavior={"padding"}>
          <TextInput
            style={styles.formTextInput}
            placeholder={"Story Title"}
            onChangeText={(text) => {
              this.setState({
                title: text,
              });
            }}
            value={this.state.title}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder={"Author"}
            onChangeText={(text) => {
              this.setState({
                author: text,
              });
            }}
            value={this.state.author}
          />
          <TextInput
            style={[styles.formTextInput, { height: 200 }]}
            placeholder={"Write Your Story"}
            onChangeText={(text) => {
              this.setState({
                story: text,
              });
            }}
            multiline={true}
            value={this.state.story}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              this.submitStory(
                this.state.title,
                this.state.author,
                this.state.story
              );
            }}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formTextInput: {
    width: 300,
    height: 50,
    borderWidth: 2,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 5,
  },
  submitButton: {
    width: 100,
    height: 40,
    borderWidth: 2,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    margin: 5,
    padding: 5,
    borderRadius: 5,
  },
  submitButtonText: {
    fontSize: 20,
    textAlign: "center",
  },
});
