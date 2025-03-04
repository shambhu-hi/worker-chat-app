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

document.addEventListener("DOMContentLoaded", function () {
    loadLeaderboard();
});

// Function to Apply for Seva
function applyForSeva() {
    let name = document.getElementById("name").value;
    let sevaType = document.getElementById("seva-type").value;
    let sevaCategory = document.getElementById("seva-category").value;
    let sevaState = document.getElementById("seva-state").value;
    let district = document.getElementById("district").value;
    let taluka = document.getElementById("taluka").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;

    if (!name || !sevaCategory || !sevaState || !phone) {
        alert("Please fill all required fields!");
        return;
    }

    let sevaData = {
        name,
        sevaType,
        sevaCategory,
        sevaState,
        district,
        taluka,
        phone,
        address
    };

    // Save to localStorage (replace with Firebase later)
    let sevaList = JSON.parse(localStorage.getItem("sevaApplications")) || [];
    sevaList.push(sevaData);
    localStorage.setItem("sevaApplications", JSON.stringify(sevaList));

    alert("Seva Application Submitted Successfully!");

    // Refresh leaderboard
    loadLeaderboard();

    // Clear Form
    document.getElementById("name").value = "";
    document.getElementById("seva-category").value = "";
    document.getElementById("seva-state").value = "";
    document.getElementById("district").value = "";
    document.getElementById("taluka").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
}

// Function to Load Leaderboard
function loadLeaderboard() {
    let leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = "";

    let sevaList = JSON.parse(localStorage.getItem("sevaApplications")) || [];

    sevaList.forEach((seva, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${index + 1}. ${seva.name}</strong> - ${seva.sevaCategory} (${seva.sevaState})`;
        leaderboardList.appendChild(listItem);
    });
}
