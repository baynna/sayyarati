// Firebase Scripts

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
collection,
addDoc
}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



// Firebase Config

const firebaseConfig = {

apiKey: "AIzaSyAF7HH6y4jx4DWeIR97nui09SQ46eHc6Iw",

authDomain: "sayyarati-cars.firebaseapp.com",

projectId: "sayyarati-cars",

storageBucket: "sayyarati-cars.firebasestorage.app",

messagingSenderId: "1023141775148",

appId: "1:1023141775148:web:76ac773a46f1f4daaf4e89",

measurementId: "G-ZKZZK90BEY"

};



// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);



console.log("Firebase Connected Successfully");



// تجربة إضافة سيارة

async function testCar(){

try{

await addDoc(collection(db,"cars"),{

name:"BMW X7",

price:"57000",

city:"Baghdad"

});

console.log("Car Added");

}catch(error){

console.log(error);

}

}


testCar();
