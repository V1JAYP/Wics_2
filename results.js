const collegeName = localStorage.getItem("collegeName");
const collegeCost = localStorage.getItem("collegeCost");
const roomAndBoards = localStorage.getItem("roomAndBoard");
const booksAndSupplie = localStorage.getItem("booksAndSupplies");
const otherExpense = localStorage.getItem("otherExpenses");

const lats = localStorage.getItem("lat");
const longs = localStorage.getItem("long");

console.log("College Name:", collegeName);
console.log("Estimated Cost:", collegeCost);
console.log(roomAndBoards);
console.log(booksAndSupplie);
console.log(otherExpense);
console.log(lats);
console.log(longs);

document.body.innerHTML += `<h2>${collegeName}</h2>`;
document.body.innerHTML += `<p>Estimated Cost: $${collegeCost}</p>`;


document.addEventListener("DOMContentLoaded", function () {
    var map = L.map('map', {
        minZoom: 3,
        maxZoom: 18,
        maxBounds: [[-90, -180], [90, 180]], 
        maxBoundsViscosity: 1.0
    }).setView([lats, longs], 12);
    var uni = L.marker([lats, longs]).addTo(map);
    uni.bindPopup(`<h2>${collegeName}</h2>`)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);
});