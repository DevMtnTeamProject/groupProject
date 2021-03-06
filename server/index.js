const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const PORT = 4006;

const LoginUser = require("./userInfoTable");

require("dotenv").config();

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
  })
);

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_STRING, { useNewUrlParser: true });

// gets reviews by restaurantId
// app.get("/get-reviews/:restaurantId", (req, res, next) => {
//   Review.find({ restaurantId: req.params.restaurantId }, function(err, docs) {
//     res.status(200).send(docs);
//   });
// });

//gets user info
app.post("/login-user", (req, res, next) => {
  LoginUser.find({ fbId: req.body.uid }, function(err, result) {
    if (err) console.warn("error loggin in: ", err);
    if (result.length > 0) {
      console.log(result);
      res.status(200).send(result);
      console.log("login was successful");
    } else {
      const createUser = new LoginUser({
        _id: new mongoose.Types.ObjectId(),
        fbId: req.body.uid,
        createdOn: Date.now(),
        info: req.body.info
      });
      createUser.save().then(result => {
        res.status(200).send(result);
        console.log("this is a new person");
      });
    }
  });
});

// gets a specific review
app.get("/review/:id", (req, res, next) => {
  const id = req.params.id;
  Review.findById(id)
    .exec()
    .then(doc => {
      res.status(200).send(doc);
    });
});

//get reviews for user
app.get("/get-reviews/:id", (req, res, next) => {
  const id = req.params.id;
  Review.findById(id)
    .exec()
    .then(doc => {
      console.log("doc", doc);
      res.status(200).send(doc);
    });
});

//posts review
app.post("/post-review/", (req, res, next) => {
  console.log("BODY-ODY-ODY", req.body);
  const obj = {
    fbId: req.body.fbId,
    info: req.body.info.stateObj,
    userName: req.body.userName,
    createdOn: Date.now()
  };

  LoginUser.findByIdAndUpdate(
    { _id: req.body.id },
    { $push: { "info.personalReviews": obj } },
    function(err, result) {
      if (err) {
        console.log("this is err", err);
      } else {
        console.log("this is result", result);
        res.status(200).send(result);
      }
    }
  );
});

//     .exec()
//     .then(_doc => {
//       console.log('this is doc', _doc)
//       const doc = _doc.toObject()
//       const updateObj =
//       {
//         ...doc,
//         info: {
//           ...doc.info,
//           personalReviews: [...doc.info.personalReviews, obj]
//         }
//       }
//         LoginUser.findOneAndUpdate(
//           { fbID: req.body.fbID },
//           updateObj,
//           {new: true},
//           function(err, result) {
//             if (err) {
//               console.log('this is err', err);
//             } else {
//               console.log('this is result', result)
//               res.status(200).send(result)

//             }
//           }
//         );
//     }).catch(err => console.log(err));
// });

//delete a specific review
// app.delete("/:delete-review", (req, res, next) => {
//   Review.remove({});
// });

//add favorites to favorite list
app.post("/add-favorite/", (req, res, next) => {
  console.log("this is req.body", req.body);

  const favObj = {
    addedDate: Date.now(),
    restaurantID: req.body.place_id,
    restaurantName: req.body.name,
    restaurantLocation: req.body.latLng
  };

  LoginUser.findById(req.body._id)
    .exec()
    .then(_doc => {
      console.log("this is doc", _doc);
      const doc = _doc.toObject();
      const updateObj = {
        ...doc,
        info: {
          ...doc.info,
          favoritesList: [...doc.info.favoritesList, favObj]
        }
      };
      LoginUser.findByIdAndUpdate(
        { _id: req.body._id },
        updateObj,
        { new: true },
        function(err, result) {
          if (err) {
            console.log("this is err", err);
          } else {
            console.log("this is result", result);
            res.status(200).send(result);
          }
        }
      );
    });
});

// app.delete("remove-favorite/:id", (req, res, next) => {
// favoritesList: doc.info.favoritesList.filter(item => item.id !== _id)
//   LoginUser.findByIdAndUpdate(
//     { fbId: req.body.id },
//     { $pull: { favoritesList: req.body.place_id } },
//     function(err, doc) {
//       if (err) {
//         console.log(err);
//       } else {
//         LoginUser.save().then(result => {
//           res.status(200).send(result);
//         });
//       }
//     }
//   );
// });

//Can now add to following list. still need to have user show up in other's following list
app.post("/add-to-follow-list", (req, res, next) => {
  const newFriend = {
    addedDate: Date.now(),
    fbID: req.body.fbID,
    name: req.body.userName
  };
  LoginUser.findById(req.body._id)
    .exec()
    .then(_doc => {
      doc = _doc.toObject();
      const updateObj = {
        ...doc,
        info: {
          ...doc.info,
          following: [...doc.info.following, newFriend]
        }
      };
      LoginUser.findByIdAndUpdate(
        { _id: req.body._id },
        updateObj,
        { new: true },
        function(err, result) {
          if (err) {
            console.log("this is err", err);
          } else {
            console.log("this is result", result);
            res.status(200).send(result);
          }
        }
      );
    });
});

app.listen(PORT, () => {
  console.log(`Nothing like a good ${PORT} wine`);
});
