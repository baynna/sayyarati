import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
doc,
getDoc,
updateDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyAF7HH6y4jx4DWeIR97nui09SQ46eHc6Iw",
authDomain: "sayyarati-cars.firebaseapp.com",
projectId: "sayyarati-cars",
storageBucket: "sayyarati-cars.appspot.com",
messagingSenderId: "1023141775148",
appId: "1:1023141775148:web:76ac773a46f1f4daaf4e89",
measurementId: "G-ZKZZK90BEY"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const params = new URLSearchParams(window.location.search);

const carId = params.get("id");

const editForm = document.getElementById("editForm");


// تحميل بيانات السيارة
async function loadCar(){

try{

const docRef = doc(db,"cars",carId);

const docSnap = await getDoc(docRef);

if(docSnap.exists()){

const car = docSnap.data();

document.getElementById("editName").value = car.name || "";

document.getElementById("editYear").value = car.year || "";

document.getElementById("editPrice").value = car.price || "";

document.getElementById("editCity").value = car.city || "";

document.getElementById("editMileage").value = car.mileage || "";

document.getElementById("editPhone").value = car.phone || "";

document.getElementById("editDescription").value = car.description || "";

}

}catch(error){

console.log(error);

alert("حدث خطأ أثناء تحميل البيانات");

}

}

loadCar();


// حفظ التعديلات
if(editForm){

editForm.addEventListener("submit", async function(e){

e.preventDefault();

try{

const docRef = doc(db,"cars",carId);

await updateDoc(docRef,{

name: document.getElementById("editName").value,

year: document.getElementById("editYear").value,

price: document.getElementById("editPrice").value,

city: document.getElementById("editCity").value,

mileage: document.getElementById("editMileage").value,

phone: document.getElementById("editPhone").value,

description: document.getElementById("editDescription").value

});

alert("تم حفظ التعديلات بنجاح");

window.location.href = "details.html?id=" + carId;

}catch(error){

console.log(error);

alert("حدث خطأ أثناء حفظ التعديلات");

}

});

}
