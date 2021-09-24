import { initializeApp } from 'firebase/app';

const app = initializeApp({

    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
})

export default app;

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD7dUES2-IkOopLxE_rt3c_06oCnLBMzfg",
//   authDomain: "react-quiz-dev-ce14d.firebaseapp.com",
//   projectId: "react-quiz-dev-ce14d",
//   storageBucket: "react-quiz-dev-ce14d.appspot.com",
//   messagingSenderId: "659176554764",
//   appId: "1:659176554764:web:586bbf21395d68aeb64929"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);