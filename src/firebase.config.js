import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBGn1GLiqnVMw1BmuwttXNFY8uKUYunzhU",
  authDomain: "dagagino-web.firebaseapp.com",
  projectId: "dagagino-web",
  storageBucket: "dagagino-web.appspot.com",
  messagingSenderId: "973595649589",
  appId: "1:973595649589:web:fb2a4076d8940ddfd3737c",
  measurementId: "G-JZK43CFMY9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
