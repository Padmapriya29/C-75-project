import React from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import db from "../config";
import { Header, SearchBar, ListItem } from "react-native-elements";

export default class ReadStoryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      allStories: [],
      search: "",
      dataSource: [],
    };
  }

  getStories = () => {
    var allStories = [];
    var stories = db
      .collection("stories")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          allStories.push(doc.data());
        });
      });
    this.setState({
      allStories: allStories,
    });
  };

  componentDidMount() {
    this.getStories();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.title}
        subtitle={item.author}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        bottomDivider
      />
    );
  };

  searchStory = (search) => {
    const newData = this.state.allStories.filter((item) => {
      const itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
      const textData = search.toUpperCase();
      return itemData.indexOf(textData)>-1
    });
    this.setState({
      dataSource: newData,
      search: search,

    })
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
            text: "Read Story",
            style: { color: "black", fontSize: 20, fontWeight: "bold" },
          }}
          backgroundColor="#FFAD8D"
        />
        <View style={{ width: "100%", height: 50 }}>
          <SearchBar
            placeholder={"Search Here"}
            onChangeText={(text) => {
              this.searchStory(text);
            }}
            value={this.state.search}
            onClear={(text) => {
              this.searchStory("");
            }}
          />
        </View>
        <FlatList
          data={this.state.search===""?this.state.allStories:this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}
