import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
getDocs,
query,
orderBy,
doc,
getDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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
const auth = getAuth(app);

console.log("Firebase Connected Successfully");


// حفظ إعلان السيارة وربطه بصاحب الحساب
const sellForm = document.getElementById("sellForm");

if(sellForm){

sellForm.addEventListener("submit", async function(e){

e.preventDefault();

const user = auth.currentUser;

if(!user){

alert("يجب تسجيل الدخول قبل نشر إعلان");

window.location.href = "login.html";

return;

}

const carData = {
name: document.getElementById("carName").value,
year: document.getElementById("carYear").value,
price: document.getElementById("carPrice").value,
city: document.getElementById("carCity").value,
mileage: document.getElementById("carMileage").value,
phone: document.getElementById("carPhone").value,
description: document.getElementById("carDescription").value,
ownerId: user.uid,
ownerEmail: user.email,
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

snapshot.forEach(function(document){

const car = document.data();

firebaseCars.innerHTML += `

<div class="card">
<a href="details.html?id=${document.id}">
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


// تفاصيل السيارة
const carDetails = document.getElementById("carDetails");

if(carDetails){

const params = new URLSearchParams(window.location.search);
const carId = params.get("id");

async function loadCarDetails(){

try{

if(!carId){
carDetails.innerHTML = "لا يوجد رقم إعلان";
return;
}

const docRef = doc(db,"cars",carId);
const docSnap = await getDoc(docRef);

if(docSnap.exists()){

const car = docSnap.data();

carDetails.innerHTML = `

<img
class="car-image"
src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
>

<div class="info">

<h1>${car.name}</h1>

<div class="spec">
السنة: ${car.year}
</div>

<div class="spec">
قراءة العداد: ${car.mileage}
</div>

<div class="spec">
المدينة: ${car.city}
</div>

<div class="spec">
رقم الهاتف: ${car.phone}
</div>

<div class="spec">
الوصف: ${car.description}
</div>

<div class="spec">
المعلن: ${car.ownerEmail || "غير محدد"}
</div>

<div class="price">
${car.price}
</div>

<div class="actions">

<a href="messages.html">
راسل البائع
</a>

<a href="requests.html">
اطلب سيارة مشابهة
</a>

</div>

</div>

`;

}else{

carDetails.innerHTML = "السيارة غير موجودة";

}

}catch(error){

console.log(error);
carDetails.innerHTML = "حدث خطأ أثناء تحميل تفاصيل السيارة";

}

}

loadCarDetails();

}


// إنشاء حساب جديد
const registerForm = document.getElementById("registerForm");

if(registerForm){

registerForm.addEventListener("submit", async function(e){

e.preventDefault();

const email = document.getElementById("registerEmail").value;
const password = document.getElementById("registerPassword").value;

try{

await createUserWithEmailAndPassword(auth,email,password);

alert("تم إنشاء الحساب بنجاح");

window.location.href = "index.html";

}catch(error){

console.log(error);

alert("حدث خطأ أثناء إنشاء الحساب");

}

});

}


// تسجيل الدخول
const loginForm = document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit", async function(e){

e.preventDefault();

const email = document.getElementById("loginEmail").value;
const password = document.getElementById("loginPassword").value;

try{

await signInWithEmailAndPassword(auth,email,password);

alert("تم تسجيل الدخول بنجاح");

window.location.href = "index.html";

}catch(error){

console.log(error);

alert("البريد الإلكتروني أو كلمة المرور غير صحيحة");

}

});

}
