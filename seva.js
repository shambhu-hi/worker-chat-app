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
    const name = document.getElementById("name").value.trim();
    const sevaType = document.getElementById("seva-type").value;
    const sevaCategory = document.getElementById("seva-category").value.trim();
    const sevaState = document.getElementById("seva-state").value.trim();
    const district = document.getElementById("district").value.trim();
    const taluka = document.getElementById("taluka").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!name || !sevaCategory || !sevaState) {
        alert("⚠️ Please fill in all required fields!");
        return;
    }

    try {
        // Store application in Firestore
        await addDoc(collection(db, "sevaApplications"), {
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

        alert("✅ Seva application submitted successfully!");
        document.getElementById("apply-for-seva").reset(); // Clear form after submission
        showLeaderboard(); // Refresh leaderboard after submission
    } catch (error) {
        console.error("Error applying for Seva:", error);
        alert("❌ Error submitting Seva application. Please try again.");
    }
}

// Function to display applications in the leaderboard
async function showLeaderboard() {
    document.getElementById("chat-section").classList.add("hidden");
    document.getElementById("apply-for-seva").classList.add("hidden");
    document.getElementById("leaderboard").classList.remove("hidden");

    const leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = "";

    try {
        const querySnapshot = await getDocs(collection(db, "sevaApplications"));

        querySnapshot.forEach((doc, index) => {
            let data = doc.data();
            let listItem = document.createElement("li");
            listItem.innerHTML = `<b>${index + 1}. ${data.name}</b> - ${data.sevaCategory} (${data.sevaState}) <br>📅 ${new Date(data.timestamp?.toDate()).toLocaleString()}`;
            leaderboardList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        alert("❌ Error loading leaderboard.");
    }
}

// ✅ Attach event listener since `type="module"` doesn't allow inline JS
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("apply-btn").addEventListener("click", applyForSeva);
});
