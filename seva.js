// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyAE9QcgKPFGT7ahVpJb7QCkT7VZ5hCp80U",
    authDomain: "my-chat-app-9b8e3.firebaseapp.com",
    databaseURL: "https://my-chat-app-9b8e3-default-rtdb.firebaseio.com",
    projectId: "my-chat-app-9b8e3",
    storageBucket: "my-chat-app-9b8e3.firebasestorage.app",
    messagingSenderId: "1032323686645",
    appId: "1:1032323686645:web:79d7b712b8d3e338ac65bc",
    measurementId: "G-F148SDPL2P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to apply for Seva
// Function to apply for Seva
function applyForSeva() {
    const name = document.getElementById("name").value;
    const sevaType = document.getElementById("seva-type").value;
    const sevaCategory = document.getElementById("seva-category").value;
    const sevaState = document.getElementById("seva-state").value;
    const district = document.getElementById("district").value;
    const taluka = document.getElementById("taluka").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    if (!name || !sevaCategory || !sevaState) {
        alert("Please fill in all required fields!");
        return;
    }

    // Create a new seva application object
    const sevaApplication = {
        name,
        sevaType,
        sevaCategory,
        sevaState,
        district,
        taluka,
        phone,
        address,
        date: new Date().toLocaleString()
    };

    // Get existing applications from localStorage
    let applications = JSON.parse(localStorage.getItem("sevaApplications")) || [];
    applications.push(sevaApplication);

    // Save back to localStorage
    localStorage.setItem("sevaApplications", JSON.stringify(applications));

    // Refresh leaderboard
    showLeaderboard();

    alert("✅ Seva application submitted successfully!");
}

// Function to display applications in the leaderboard
function showLeaderboard() {
    document.getElementById("chat-section").classList.add("hidden");
    document.getElementById("apply-for-seva").classList.add("hidden");
    document.getElementById("leaderboard").classList.remove("hidden");

    const leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = "";

    let applications = JSON.parse(localStorage.getItem("sevaApplications")) || [];

    applications.forEach((app, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `<b>${index + 1}. ${app.name}</b> - ${app.sevaCategory} (${app.sevaState}) <br>📅 ${app.date}`;
        leaderboardList.appendChild(listItem);
    });
}
