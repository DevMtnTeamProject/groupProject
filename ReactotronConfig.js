import Reactotron from "reactotron-react-native";

// use your computer's IP address for the host here
Reactotron.configure({ host: "192.168.10.248" }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!