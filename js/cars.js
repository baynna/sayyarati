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

const carImage = car.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70";

carsBox.innerHTML += `

<div style="
background:#141414;
border-radius:30px;
overflow:hidden;
margin-bottom:35px;
box-shadow:0 0 25px rgba(212,175,55,.12);
">

<img
src="${carImage}"
style="
width:100%;
height:260px;
object-fit:cover;
display:block;
"
>

<div style="padding:25px;">

<h2 style="
font-size:32px;
margin-bottom:15px;
color:white;
">

${car.name || "سيارة بدون اسم"}

</h2>

<div style="
display:flex;
gap:15px;
flex-wrap:wrap;
margin-bottom:20px;
">

<span style="
background:#222;
padding:10px 18px;
border-radius:15px;
color:#d4af37;
font-size:18px;
">

${car.year || "السنة غير محددة"}

</span>

<span style="
background:#222;
padding:10px 18px;
border-radius:15px;
color:#d4af37;
font-size:18px;
">

${car.city || "المدينة غير محددة"}

</span>

</div>

<div style="
font-size:34px;
font-weight:bold;
margin-bottom:25px;
color:#d4af37;
">

${car.price || "السعر غير محدد"}

</div>

<a
href="details.html?id=${doc.id}"
style="
display:inline-block;
background:#d4af37;
color:#111;
padding:14px 28px;
border-radius:18px;
text-decoration:none;
font-size:20px;
font-weight:bold;
"
>

عرض التفاصيل

</a>

</div>

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
