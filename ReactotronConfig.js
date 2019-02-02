import Reactotron from "reactotron-react-native";
console.log("this is reactotron", Reactotron);

// use your computer's IP address for the host here
Reactotron.configure({ host: "192.168.11.12" }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!
