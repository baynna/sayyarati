import { auth, db } from "./firebase.js";

import {
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
doc,
getDoc,
deleteDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const deleteBox = document.getElementById("deleteBox");

if(deleteBox){

const params = new URLSearchParams(window.location.search);

const carId = params.get("id");

onAuthStateChanged(auth, async function(user){

if(!user || !carId){
return;
}

try{

const docRef = doc(db,"cars",carId);

const docSnap = await getDoc(docRef);

if(!docSnap.exists()){
return;
}

const car = docSnap.data();

if(car.ownerId === user.uid){

deleteBox.innerHTML = `

<button class="delete-btn" id="deleteBtn">
حذف الإعلان
</button>

`;

const deleteBtn = document.getElementById("deleteBtn");

deleteBtn.addEventListener("click", async function(){

const confirmDelete = confirm("هل تريد حذف الإعلان؟");

if(!confirmDelete){
return;
}

try{

await deleteDoc(doc(db,"cars",carId));

alert("تم حذف الإعلان");

window.location.href = "account.html";

}catch(error){

console.log(error);

alert("حدث خطأ أثناء الحذف");

}

});

}

}catch(error){

console.log(error);

}

});

}
