import Reactotron from 'reactotron-react-native'
console.log('YYYYY test', Reactotron)

Reactotron
  .configure({ host: '192.168.10.1' }).useReactNative().connect() 
  //.configure() // controls connection & communication settings
//   .useReactNative() // add all built-in react native plugins
//   .connect() // let's connect!