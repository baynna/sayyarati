import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
getDocs,
query,
orderBy
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyAF7HH6y4jx4DWeIR97nui09SQ46eHc6Iw",
authDomain: "sayyarati-cars.firebaseapp.com",
projectId: "sayyarati-cars",
storageBucket: "sayyarati-cars.firebasestorage.app",
messagingSenderId: "1023141775148",
appId: "1:1023141775148:web:76ac773a46f1f4daaf4e89",
measurementId: "G-ZKZZK90BEY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase Connected Successfully");


// حفظ إعلان السيارة
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

alert("حدث خطأ أثناء نشر الإعلان");

}

});

}


// عرض السيارات في الصفحة الرئيسية
const firebaseCars = document.getElementById("firebaseCars");

if(firebaseCars){

async function loadCars(){

try{

const carsQuery = query(collection(db,"cars"), orderBy("createdAt","desc"));

const snapshot = await getDocs(carsQuery);

firebaseCars.innerHTML = "";

snapshot.forEach(function(doc){

const car = doc.data();

firebaseCars.innerHTML += `

<div class="card">
<a href="details.html">
<img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70">
<h3>${car.name}</h3>
<p>${car.year} | ${car.city} | ${car.price}</p>
</a>
</div>

`;

});

console.log("Cars Loaded Successfully");

}catch(error){

console.log(error);

}

}

loadCars();

}
