import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from
"https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9Fg_iYZVeZEjP78RJaKhR-Tk8QDKWsdI",
    authDomain: "contact-book-7e9f5.firebaseapp.com",
    projectId: "contact-book-7e9f5",
    storageBucket: "contact-book-7e9f5.firebasestorage.app",
    messagingSenderId: "75278465397",
    appId: "1:75278465397:web:48000d846265b0a936bb3c",
    measurementId: "G-645YGVQQD1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Add Contact Button
document.getElementById("addBtn").addEventListener("click", addContact);

// Add Contact
async function addContact() {
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    if (name === "" || phone === "") {
        alert("Please fill all fields");
        return;
    }
    try {

        await addDoc(collection(db, "contacts"), {
            name: name,
            phone: phone
        });
        alert("Contact added successfully!");
        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";
        loadContacts();
    } catch (error) {
        console.error("Error adding contact:", error);
        alert("Error adding contact: " + error.message);
    }
}

// Display Contacts
async function loadContacts() {
    let table = document.getElementById("contactList");
    table.innerHTML = "";
    try {
        const querySnapshot =
            await getDocs(collection(db, "contacts"));
        querySnapshot.forEach((contact) => {
            let data = contact.data();
            let row = table.insertRow();

            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);

            cell1.innerHTML = data.name;
            cell2.innerHTML = data.phone;

            cell3.innerHTML =
                "<button onclick=\"deleteContact('" +
                contact.id +
                "')\">Delete</button>";

        });

    } catch (error) {

        console.error("Error loading contacts:", error);

        alert("Error loading contacts: " + error.message);
    }
}

// Delete Contact
window.deleteContact = async function(id) {

    try {

        await deleteDoc(doc(db, "contacts", id));

        alert("Contact deleted!");

        loadContacts();

    } catch (error) {

        console.error("Error deleting contact:", error);

        alert("Error deleting contact: " + error.message);
    }
};

// Load contacts when page opens
loadContacts();