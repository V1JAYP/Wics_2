document.addEventListener("DOMContentLoaded", function () {
    const collegeName = localStorage.getItem("collegeName") ?? "Unknown College";
    const collegeCost = localStorage.getItem("collegeCost") ?? "N/A";

    console.log("College Name:", collegeName);
    console.log("Estimated Cost:", collegeCost);

    document.body.insertAdjacentHTML("beforeend", `<h2 class="college1">${collegeName}</h2>`);
    document.body.insertAdjacentHTML("beforeend", `<p class="cost">Estimated Cost: $${collegeCost}</p>`);

    var map = L.map('map1', {
        minZoom: 3,
        maxZoom: 18,
        maxBounds: [[-90, -180], [90, 180]], // Restricts map panning
        maxBoundsViscosity: 1.0
    }).setView([27.169802, 17.89216], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);
});