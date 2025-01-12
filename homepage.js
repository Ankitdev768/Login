import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById('loggedUserFName').innerText = userData.fullName;
                document.getElementById('loggedUserEmail').innerText = userData.email;
                document.getElementById('loggedUserBranch').innerText = userData.branch || "N/A";  // Display branch
                document.getElementById('loggedUserRollNo').innerText = userData.rollNo || "N/A"; // Display roll number
                document.getElementById('loggedUserSession').innerText = userData.session || "N/A"; // Display session
            } else {
                console.log("No document found matching id");
            }
        })
        .catch((error) => {
            console.log("Error getting document", error);
        });
    } else {
        console.log("User Id not Found in Local Storage");
    }
});

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(() => {
        window.location.href = 'index.html';
    })
    .catch((error) => {
        console.error('Error Signing out:', error);
    });
});
