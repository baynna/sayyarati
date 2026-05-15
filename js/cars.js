import { db } from "./firebase.js";

import {
collection,
getDocs
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

console.log("cars.js loaded successfully");

const carsBox = document.getElementById("carsBox");

async function loadCars(){

try{

const snapshot = await getDocs(
collection(db,"cars")
);

carsBox.innerHTML = "";

if(snapshot.empty){

carsBox.innerHTML = `

<p style="color:white;text-align:center;font-size:24px;">

لا توجد سيارات منشورة

</p>

`;

return;

}

snapshot.forEach(function(doc){

const car = doc.data();

carsBox.innerHTML += `

<div style="
background:#1a1a1a;
padding:25px;
border-radius:25px;
margin-bottom:20px;
color:white;
box-shadow:0 0 15px rgba(212,175,55,.15);
">

<h2 style="margin-bottom:10px;">

${car.name}

</h2>

<p>

${car.year} | ${car.city}

</p>

<p style="margin-top:10px;">

${car.price}

</p>

<a
href="details.html?id=${doc.id}"
style="
display:inline-block;
margin-top:15px;
background:#d4af37;
color:#111;
padding:10px 20px;
border-radius:15px;
text-decoration:none;
font-weight:bold;
"
>

عرض التفاصيل

</a>

</div>

`;

});

console.log("Cars loaded successfully");

}catch(error){

console.log(error);

carsBox.innerHTML = `

<p style="color:red;text-align:center;font-size:22px;">

حدث خطأ أثناء تحميل السيارات

</p>

`;

}

}

loadCars();
