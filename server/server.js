const express = require("express");
const app = express();
// const assert = require("assert");
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
// var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
const mongodb = require("mongodb");
const mongodb_url = "mongodb://localhost:27017";

// mongoose
//   .connect(mongodb_url, { useNewUrlParser: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));
// var Users = require("./routes/Users");
// app.use("/users", Users);
// app.listen(port, function() {
//   console.log("Server is running on port : " + port);
// });

//---------------------------------------------
const dbName = "st-db";

mongodb.MongoClient.connect(
  mongodb_url,
  { useNewUrlParser: true },
  (err, client) => {
    if (err) {
      return console.log("Database connection has failed");
    }
    console.log("Database is connected successfully to the server");

    const db = client.db(dbName);
    app.post("/new-compaign", (req, res) => {
      let newProduct = req.body;
      db.collection("compaigns").insertOne(newProduct, (err, data) => {
        if (err) {
          res.send("can't add compaign");
        } else {
          res.send(data);
        }
      });
    });
    app.get("/compaigns", (req, res) => {
      const page = parseInt(req.query.page);
      const limit = req.query.limit;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const results = {};
      // if (endIndex < (await res.send(data).countDocuments().exec())) {
      //     results.next = {
      //       page: page + 1,
      //       limit: limit
      //     };
      //   }
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        };
      }
      db.collection("compaigns")
        .find()
        .toArray((err, data) => {
          if (err) {
            res.send("cant fetch products");
          } else res.send(data);
          //   .skip(startIndex)
          //   .limit(limit);
        });
    });
    app.get("/compaign/:id", (req, res) => {
      let id = req.params.id;
      db.collection("compaigns").findOne(
        { _id: mongodb.ObjectID(id) },
        (err, data) => {
          if (err) res.send("cant fetch product");
          else res.send(data);
        }
      );
    });
    app.put("/modify-compaign/:id", (req, res) => {
      let id = req.params.id;
      let modifiedProduct = req.body;
      db.collection("compaigns").findOneAndUpdate(
        { _id: mongodb.ObjectID(id) },
        { ...modifiedProduct },
        (err, data) => {
          if (err) {
            res.send("err");
          } else {
            res.send(modifiedProduct);
          }
        }
      );
    });
  }
);

// app.post('/contacts',(req, res)=>{
// const body = req.body;
// if(er){res.status(400).send('the contact has not been added')}
// else{
//     res.send(body)
// }
// })

// var tab =[
//     {
//         name : 'mohamed',
//         phone : '5456645',
//         mail:'mohamed@gmail.com'
//     },
//     {
//         name : 'sami',
//         phone : '5456641745',
//         mail:'mohamed@gmail.com'
//     },
//     {
//         name : 'souad',
//         phone : '54564545645',
//         mail:'mohamed@gmail.com'
//     }
// ]
// app.get('/products',(req,res)=>{
//     console.log(req.body);
//     res.send(tab)
// })

// app.post('/add-product',(req, res)=>{
//     let newProduct = req.body
//     tab.push(newProduct)
//     res.send(tab)

// })
// app.put('/modify-product',(req, res)=>{
//     let productModified = req.body
//     tab = tab.map(el=>el.name === productModified.name ? el = productModified : el)
//     res.send(tab)
// })

function paginatedResults(model) {
  console.log("ffddfdf");

  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = req.query.limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      };
    }
    // try {
    results.results = await model
      .find()
      .limit(limit)
      .skip(startIndex)
      .exec();
    res.paginatedResults = results;

    next();
    // } catch (e) {
    //   res.status(500).json({ message: e.message });
    // }
  };
}

app.listen(5000, err => {
  if (err) {
    console.log("problem of connection");
  } else {
    console.log("server is listening on port 5000");
  }
});
