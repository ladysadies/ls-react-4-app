import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBPpNirsuQq2O6Sfc1_Z-YXeEBOdg1GKWQ",
    authDomain: "ls-react-4-app.firebaseapp.com",
    projectId: "ls-react-4-app",
    storageBucket: "ls-react-4-app.appspot.com",
    messagingSenderId: "1020402693707",
    appId: "1:1020402693707:web:9752ed8729e0ae703dbfce"
  };

  firebase.initializeApp(firebaseConfig)
  export const db = firebase.firestore()
//   export const auth = firebase.auth()
//   export const storage = firebase.storage()