import Reactotron from "reactotron-react-native";
console.log("this is reactotron", Reactotron);

Reactotron.configure({ host: "192.168.11.12" }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!
