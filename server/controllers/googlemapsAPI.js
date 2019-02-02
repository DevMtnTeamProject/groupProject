// require("dotenv").config();
// const googleMapsClient = require("@google/maps");

// const iosClient

// const androidClient = googleMapsClient.createClient({
//   key: process.env.GOOGLE_API_KEY_ANDROID
// });

// const iosClient = googleMapsClient.createClient({
//   key: process.env.GOOGLE_API_KEY_IOS
// });

// module.exports = {
//   geocodeAddress: (req, res, next) => {
//     const { address } = req.body;

//     // Geocode an address.
//     iosClient.geocode(
//       {
//         address: address
//       },
//       function(err, response) {
//         if (!err) {
//           console.log(response.json.results);
//         }
//         res.status(200).send(response.json.results);
//       }
//     );
//   },
//   findRestaurant: (req, res, next ) => {
//     const inputText = req.params;
//     const apiURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${inputText}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${process.env.GOOGLE_API_KEY_IOS}`

//   }

// }
