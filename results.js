const collegeName = localStorage.getItem("collegeName");
const collegeCost = localStorage.getItem("collegeCost");

console.log("College Name:", collegeName);
console.log("Estimated Cost:", collegeCost);

document.body.innerHTML += `<h2>${collegeName}</h2>`;
document.body.innerHTML += `<p>Estimated Cost: $${collegeCost}</p>`;


document.addEventListener("DOMContentLoaded", function () {
    var map = L.map('map', {
        minZoom: 3,
        maxZoom: 18,
        maxBounds: [[-90, -180], [90, 180]], // Restricts map panning
        maxBoundsViscosity: 1.0
    }).setView([27.169802, 17.89216], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);
});