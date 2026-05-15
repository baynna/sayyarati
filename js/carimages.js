import { storage } from "./firebase.js";

import {
ref,
uploadBytes,
getDownloadURL
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

console.log("carimages.js loaded successfully");

const imageInput = document.getElementById("carImages");

let uploadedImageUrl = "";

if(imageInput){

imageInput.addEventListener("change", async function(){

const file = imageInput.files[0];

if(!file){
return;
}

try{

console.log("تم اختيار صورة:", file.name);

const imageRef = ref(storage, "car-images/" + Date.now() + "-" + file.name);

await uploadBytes(imageRef, file);

uploadedImageUrl = await getDownloadURL(imageRef);

window.carImageUrl = uploadedImageUrl;

console.log("تم رفع الصورة بنجاح:", uploadedImageUrl);

alert("تم رفع الصورة بنجاح");

}catch(error){

console.log(error);

alert("حدث خطأ أثناء رفع الصورة");

}

});

}
