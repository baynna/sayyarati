import { auth, db } from "./firebase.js";

import {
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
collection,
query,
where,
getDocs
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

console.log("mycars.js loaded successfully");

const myCarsBox = document.getElementById("myCarsBox");

if(myCarsBox){

onAuthStateChanged(auth, async function(user){

if(!user){

myCarsBox.innerHTML = "يجب تسجيل الدخول لعرض إعلاناتك";

return;

}

try{

const q = query(
collection(db,"cars"),
where("ownerId","==",user.uid)
);

const snapshot = await getDocs(q);

myCarsBox.innerHTML = "";

if(snapshot.empty){

myCarsBox.innerHTML = "لا توجد إعلانات منشورة حتى الآن";

return;

}

snapshot.forEach(function(document){

const car = document.data();

myCarsBox.innerHTML += `

<div class="my-car">

<h3>${car.name}</h3>

<p>${car.year} | ${car.city} | ${car.price}</p>

<a href="details.html?id=${document.id}">
عرض التفاصيل
</a>

</div>

`;

});

console.log("My cars loaded successfully");

}catch(error){

console.log(error);

myCarsBox.innerHTML = "حدث خطأ أثناء تحميل إعلاناتك";

}

});

}
