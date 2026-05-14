import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
onAuthStateChanged,
signOut
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

const auth = getAuth(app);

const accountBox = document.getElementById("accountBox");

onAuthStateChanged(auth,function(user){

if(user){

accountBox.innerHTML = `

<h1>حسابي</h1>

<div class="user-email">
${user.email}
</div>

<button id="logoutBtn" class="logout-btn">
تسجيل الخروج
</button>

`;

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click",async function(){

await signOut(auth);

alert("تم تسجيل الخروج");

window.location.href = "login.html";

});

}else{

window.location.href = "login.html";

}

});
