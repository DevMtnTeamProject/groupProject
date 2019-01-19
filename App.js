import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Blegh</Text>

        <Text>Hello World test</Text>
        <Text>What's up chumps?</Text>

        <Image
          source={{
            uri: "https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif"
          }}
          style={{ width: 100, height: 100 }}
        />

        <Text>Hello World, from Leah</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center"
  }
});
