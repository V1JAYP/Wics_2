let collegeName = localStorage.getItem("collegeName");
let collegeCost = parseFloat(localStorage.getItem("collegeCost"));
let lats = parseFloat(localStorage.getItem("lat"));
let longs = parseFloat(localStorage.getItem("long"));
let geoapi = `7c6035dcefde4bac9fbcd7ac67ee375d`

document.body.innerHTML += `<h2 class="c2">${collegeName}</h2>`;
document.body.innerHTML += `<p>Estimated Cost: $${collegeCost}</p>`;

document.addEventListener("DOMContentLoaded", function () {
    if (lats && longs) {
        var map = L.map('map', {
            minZoom: 3,
            maxZoom: 18,
            maxBounds: [[-90, -180], [90, 180]],
            maxBoundsViscosity: 1.0,
        }).setView([lats, longs], 12);
        fetch(`https://api.geoapify.com/v2/places?categories=accommodation.apartment,accommodation.hotel&filter=circle:${lats},${longs},5000&bias=proximity:${lats},${longs}&limit=20&apiKey=${geoapi}`)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        var uni = L.marker([lats, longs]).addTo(map);
        uni.bindPopup(`<h2>${collegeName}</h2>`);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap',
        }).addTo(map);
    } else {
        console.error("Latitude and Longitude are not available.");
    }
});