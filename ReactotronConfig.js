import Reactotron from "reactotron-react-native";
import {IP} from './ignoreThis'

// use your computer's IP address for the host here
Reactotron.configure({ host: IP }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!
