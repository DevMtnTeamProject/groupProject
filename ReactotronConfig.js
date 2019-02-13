import Reactotron from "reactotron-react-native";
<<<<<<< HEAD
import { reactotronRedux } from "reactotron-redux";
import { IP } from "./ignorethis";

// use your computer's IP address for the host here
export default Reactotron.configure({ host: IP }) // controls connection & communication settings
  .use(reactotronRedux())
=======
import {IP} from './ignoreThis'

// use your computer's IP address for the host here
Reactotron.configure({ host: IP }) // controls connection & communication settings
>>>>>>> master
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!
