/* eslint-disable object-curly-spacing */
const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

// initialize express server
const app = express();
const main = express();

// initialize the database and the collection
const db = admin.firestore();
const petCollection = "pets";

// add the path to receive request and set json as bodyParser to process body
main.use("/api/v1", app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

// Get pets
main.get("/pets", async (req, res) => {
  try {
    const petQuerySnapshot = await db.collection(petCollection).get();
    const pets = [];
    petQuerySnapshot.forEach((doc) => {
      pets.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Post a Pet
main.post("/pets", async (req, res) => {
  try {
    const data = req.body;
    console.log($`req.body ${req.body}`);
    const res = await db.collection("pets").doc(data.firstName).set(data);
    const petQuerySnapshot = await db.collection(petCollection).get();

    const pets = [];
    petQuerySnapshot.forEach((doc) => {
      pets.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(pets);
  } catch (error) {
    console.log($`error ${error}`);
    res.status(500).send(error);
  }
});

// define google cloud function name
exports.webApi = functions.https.onRequest(main);
