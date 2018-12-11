import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyDOVOTZjPP_JbuYEnCi5Q2tKbSMUdObg_Y",
  authDomain: "calendar-22e37.firebaseapp.com",
  databaseURL: "https://calendar-22e37.firebaseio.com",
  projectId: "calendar-22e37",
  storageBucket: "calendar-22e37.appspot.com",
  messagingSenderId: "87426830946"
};

firebase.initializeApp(config);

export default firebase;
