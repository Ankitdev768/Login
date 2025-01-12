// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";


const firebaseConfig = {
 apiKey: "AIzaSyDhJHtbtV8W_5Mvd2v8FQtLm-EtYEY46Ao",
  authDomain: "ankit-portfolio-6d9af.firebaseapp.com",
  databaseURL: "https://ankit-portfolio-6d9af-default-rtdb.firebaseio.com",
  projectId: "ankit-portfolio-6d9af",
  storageBucket: "ankit-portfolio-6d9af.firebasestorage.app",
  messagingSenderId: "716242981018",
  appId: "1:716242981018:web:1b49df81c33b275f570f23",
  measurementId: "G-JBDQPMG8FJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}

const signUp = document.getElementById("submitSignUp");
signUp.addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("rEmail").value;
  const password = document.getElementById("rPassword").value;
  const fullName = document.getElementById("fName").value;
  const branch = document.getElementById("branch").value;
  const rollNo = document.getElementById("rollNo").value;
  const session = document.getElementById("session").value;

  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        fullName: fullName,
        branch: branch, // Save branch
        rollNo: rollNo, // Save roll number
        session: session, // Save session
      };
      showMessage("Account Created Successfully", "signUpMessage");

      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          window.location.href = "index.html";
        })
        .catch((error) => {
          console.error("Error writing document", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode == "auth/email-already-in-use") {
        showMessage("Email Address Already Exists !!!", "signUpMessage");
      } else {
        showMessage("Unable to create User", "signUpMessage");
      }
    });
});

const signIn = document.getElementById("submitSignIn");
signIn.addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage("Login is successful", "signInMessage");
      const user = userCredential.user;
      localStorage.setItem("loggedInUserId", user.uid);
      window.location.href = "homepage.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/invalid-credential") {
        showMessage("Incorrect Email or Password", "signInMessage");
      } else {
        showMessage("Account does not Exist", "signInMessage");
      }
    });
});
