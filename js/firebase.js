import {
initializeApp,
getApps,
getApp
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
getAuth
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
apiKey: "AIzaSyAF7HH6y4jx4DWeIR97nui09SQ46eHc6Iw",
authDomain: "sayyarati-cars.firebaseapp.com",
projectId: "sayyarati-cars",
storageBucket: "sayyarati-cars.firebasestorage.app",
messagingSenderId: "1023141775148",
appId: "1:1023141775148:web:76ac773a46f1f4daaf4e89",
measurementId: "G-ZKZZK90BEY"
};

const app = getApps().length
? getApp()
: initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

console.log("Firebase base file loaded safely");
