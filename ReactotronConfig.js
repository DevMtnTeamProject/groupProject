import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";
import { IP } from "./config";
// use your computer's IP address for the host here
export default Reactotron.configure({ host: IP }) // controls connection & communication settings
  .use(reactotronRedux())
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!
