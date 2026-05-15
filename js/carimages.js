import { auth, db } from "./firebase.js";

import {
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

console.log("carimages.js loaded successfully");

// ملف صور السيارات

const imageInput = document.getElementById("carImage");

if(imageInput){

imageInput.addEventListener("change", function(){

const file = imageInput.files[0];

if(file){

console.log("تم اختيار صورة:", file.name);

}

});

}
