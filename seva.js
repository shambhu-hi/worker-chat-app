// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyAE9QcgKPFGT7ahVpJb7QCkT7VZ5hCp80U",
    authDomain: "my-chat-app-9b8e3.firebaseapp.com",
    databaseURL: "https://my-chat-app-9b8e3-default-rtdb.firebaseio.com",
    projectId: "my-chat-app-9b8e3",
    storageBucket: "my-chat-app-9b8e3.appspot.com",
    messagingSenderId: "1032323686645",
    appId: "1:1032323686645:web:79d7b712b8d3e338ac65bc",
    measurementId: "G-F148SDPL2P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to apply for Seva
async function applyForSeva() {
    console.log("📢 applyForSeva() called!"); // Debug log

    const name = document.getElementById("name").value.trim();
    const sevaType = document.getElementById("seva-type").value;
    const sevaCategory = document.getElementById("seva-category").value.trim();
    const sevaState = document.getElementById("seva-state").value.trim();
    const district = document.getElementById("district").value.trim();
    const taluka = document.getElementById("taluka").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!name || !sevaCategory || !sevaState) {
        console.error("⚠️ Missing required fields!");
        alert("⚠️ Please fill in all required fields!");
        return;
    }

    console.log("✅ All fields filled. Submitting data...");

    try {
        const docRef = await addDoc(collection(db, "sevaApplications"), {
            name,
            sevaType,
            sevaCategory,
            sevaState,
            district,
            taluka,
            phone,
            address,
            timestamp: serverTimestamp()
        });

        console.log("✅ Seva application added! Document ID:", docRef.id);
        alert("✅ Seva application submitted successfully!");
        document.getElementById("seva-form").reset();
        showLeaderboard();
    } catch (error) {
        console.error("❌ Firestore error:", error);
        alert("❌ Error submitting Seva application. Check console.");
    }
}
