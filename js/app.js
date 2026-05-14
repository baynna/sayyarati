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



// SELL FORM

const sellForm = document.getElementById("sellForm");

if(sellForm){

sellForm.addEventListener("submit", async function(e){

e.preventDefault();

const carData = {

name: document.getElementById("carName").value,

year: document.getElementById("carYear").value,

price: document.getElementById("carPrice").value,

city: document.getElementById("carCity").value,

mileage: document.getElementById("carMileage").value,

phone: document.getElementById("carPhone").value,

description: document.getElementById("carDescription").value,

createdAt: new Date()

};



try{

await addDoc(collection(db,"cars"),carData);

alert("تم نشر السيارة بنجاح");

sellForm.reset();

console.log("Car Added Successfully");

}catch(error){

console.log(error);

alert("حدث خطأ");

}

});

}
