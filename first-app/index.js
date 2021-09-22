const express = require("express");

var firebaseConfig = {
  apiKey: "AIzaSyCEzhRWBpG6O2a-pMYGviw2PKXWXcZupQ4",
  authDomain: "smart-home-system-3905e.firebaseapp.com",
  projectId: "smart-home-system-3905e",
  storageBucket: "smart-home-system-3905e.appspot.com",
  messagingSenderId: "338524254078",
  appId: "1:338524254078:web:7b136840e707bbbd158d2f",
  measurementId: "G-YEWHCYX3S5",
};

HEHEHE;

var firestore = require("firebase/firestore");
var firebase = require("firebase");
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  console.log("Connected to firebase");
}

const db = firebase.firestore();

var mqtt = require("mqtt");
var url = "mqtt://io.adafruit.com";

var username = "lengochieu6102";
var password = "aio_GoxD20iebyWKbGsHEw0QFWE4d0v9";
var client = mqtt.connect(url, { username: username, password: password });

var topic = "lengochieu6102/feeds/bk-iot-led";
client.on("connect", function () {
  console.log("connected");
  client.subscribe(topic, function (err) {
    if (!err) {
      console.log("subscribed");

      db.collection("cities")
        .doc("SF")
        .onSnapshot((doc) => {
          var city = doc.data();
          client.publish(topic, city.country);
        });
    }
  });
});

client.on("message", function (topic, message) {
  console.log(message.toString());
});
