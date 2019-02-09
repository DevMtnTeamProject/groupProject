import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

// use your computer's IP address for the host here
export default Reactotron.configure({ host: "192.168.11.12" }) // controls connection & communication settings
  .use(reactotronRedux())
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!
