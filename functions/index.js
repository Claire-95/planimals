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

// Post a Pet to database
main.post("/pets", async (req, res) => {
  try {
    const data = JSON.parse(req.body);
    //HERE IS WHERE THE ID IS SET!!!
    const id = data.firstName + data.lastName + data.species;

    const res = await db.collection("pets").doc(id).set(data);

    const petQuerySnapshot = await db.collection(petCollection).get();

    const pets = [];

    petQuerySnapshot.forEach((doc) => {
      pets.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    res.status(200).json(pets);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Delete pet
main.delete("/pets", async (req, res) => {
  try {
    const data = JSON.parse(req.body);
    const id = data.id;
    console.log(id);

    const res = await db.collection("pets").doc(id).delete;

    const petQuerySnapshot = await db.collection(petCollection).get();

    const pets = [];

    petQuerySnapshot.forEach((doc) => {
      pets.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    res.status(200).json(pets);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// define google cloud function name
exports.webApi = functions.https.onRequest(main);
