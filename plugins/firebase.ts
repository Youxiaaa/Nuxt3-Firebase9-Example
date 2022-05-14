import { initializeApp } from "firebase/app"

export default defineNuxtPlugin(nuxtApp => {
const firebaseConfig = {
  apiKey: "AIzaSyChJBcqS_3dYajes6C3ImPD0IFLyiXWL7Y",
  authDomain: "first-firebase-e0bf7.firebaseapp.com",
  databaseURL: "https://first-firebase-e0bf7-default-rtdb.firebaseio.com",
  projectId: "first-firebase-e0bf7",
  storageBucket: "first-firebase-e0bf7.appspot.com",
  messagingSenderId: "951486330273",
  appId: "1:951486330273:web:8c9e4bb68bd7eb039c07e0"
};

  initializeApp(firebaseConfig)
})
