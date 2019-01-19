import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>What's up chumps?</Text>
        <Image
          source={{ uri: 'https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif' }} style={{ width: 100, height: 100 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
