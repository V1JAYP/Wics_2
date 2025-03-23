let collegeName = localStorage.getItem("collegeName");
let collegeCost = parseFloat(localStorage.getItem("collegeCost"));
let roomAndBoards = parseFloat(localStorage.getItem("roomAndBoard"));
let booksAndSupplie = parseFloat(localStorage.getItem("booksAndSupplies"));
let otherExpense = parseFloat(localStorage.getItem("otherExpenses"));
let lats = parseFloat(localStorage.getItem("lat"));
let longs = parseFloat(localStorage.getItem("long"));
let scholarshipAmount = collegeCost * 0.1;
let inflationRate = 0.028;
let loanInterestRate = 0.0653;
let savingsInterestRate = 0.0492;
let geoapi = `7c6035dcefde4bac9fbcd7ac67ee375d`

console.log("College Name:", collegeName);
console.log("Estimated Cost:", collegeCost);
console.log("Room and Boards:", roomAndBoards);
console.log("Books and Supplies:", booksAndSupplie);
console.log("Other Expenses:", otherExpense);
console.log("Latitude:", lats);
console.log("Longitude:", longs);

let salary = parseFloat(prompt("salary"));
let savings = parseFloat(prompt("savings"));

//document.getElementById("myElement").innerHTML = "<h1>This is a Heading</h1><p>This is a paragraph of text.</p>";
// Function to calculate compound interest
function calculateCompoundInterest(principal, rate, years) {
    return principal * Math.pow(1 + rate, years) - principal;
}

// Function to calculate yearly costs considering inflation and scholarship
function calculateYearlyCost(year) {
    let inflatedBooks = booksAndSupplie * Math.pow(1 + inflationRate, year -1);
    let inflatedOther = otherExpense * Math.pow(1 + inflationRate, year -1);
    let totalYearlyCost = collegeCost + roomAndBoards + inflatedBooks + inflatedOther;
    return totalYearlyCost - scholarshipAmount;
}

// Variable to keep track of total loan amount
let totalLoanAmount = 0;

// Process each year
for (let year = 1; year <= 4; year++) {
    console.log(`\nYear ${year}:`);

    let inflatedBooks = booksAndSupplie * Math.pow(1 + inflationRate, year -1);
    let inflatedOther = otherExpense * Math.pow(1 + inflationRate, year -1);
    let adjustedCost = calculateYearlyCost(year);
    let availableFunds = savings + salary;

    adjustedCost -= availableFunds;

    if (adjustedCost > 0) {
        let loanForYear = adjustedCost;
        totalLoanAmount += loanForYear;

        document.body.innerHTML += `<p>You need to borrow ${loanForYear.toFixed(2)} for Year ${year}.`
        document.body.innerHTML +=`<h2>Year ${year} Cost Breakdown:</h2>`
        document.body.innerHTML +=`<p>  Tuition: $${collegeCost.toFixed(2)}</p>`
        document.body.innerHTML +=`<p>  Room and Board: $${roomAndBoards.toFixed(2)}</p>`
        document.body.innerHTML +=`<p>  Books and Supplies: $${inflatedBooks.toFixed(2)}</p>`
        document.body.innerHTML +=`<p>  Other Expenses: $${inflatedOther.toFixed(2)}</p>`
        document.body.innerHTML +=`<p>  Scholarship: $${scholarshipAmount.toFixed(2)}</p>`
        document.body.innerHTML +=`<p>  Total Cost: $${(collegeCost + roomAndBoards + inflatedBooks + inflatedOther - scholarshipAmount).toFixed(2)}</p>`
        document.body.innerHTML +=`<p>  Available Funds: $${availableFunds.toFixed(2)}</p>`
        document.body.innerHTML +=`<p>  Loan Amount: $${loanForYear.toFixed(2)}</p>`

        savings += calculateCompoundInterest(savings, savingsInterestRate, 1);
    } else {
        document.body.innerHTML += `<p>No loan needed for Year ${year}. Your funds cover the cost.</p>`;
        document.body.innerHTML += `<h2>Year ${year} Cost Breakdown:</h2>`;
        document.body.innerHTML += `<p>  Tuition: $${collegeCost.toFixed(2)}</p>`;
        document.body.innerHTML += `<p>  Room and Board: $${roomAndBoards.toFixed(2)}</p>`;
        document.body.innerHTML += `<p>  Books and Supplies: $${inflatedBooks.toFixed(2)}</p>`;
        document.body.innerHTML += `<p>  Other Expenses: $${inflatedOther.toFixed(2)}</p>`;
        document.body.innerHTML += `<p>  Scholarship: $${scholarshipAmount.toFixed(2)}</p>`;
        document.body.innerHTML += `<p>  Total Cost: $${(collegeCost + roomAndBoards + inflatedBooks + inflatedOther - scholarshipAmount).toFixed(2)}</p>`;
        document.body.innerHTML += `<p>  Available Funds: $${availableFunds.toFixed(2)}</p>`;
        document.body.innerHTML += `<p>  Loan Amount: $0.00</p>`;        

        savings += calculateCompoundInterest(savings, savingsInterestRate, 1);
    }
}

// Total loan and interest after 4 years
document.body.innerHTML += `<p>Total loan to pay over 4 years: $${totalLoanAmount.toFixed(2)}</p>`;
let totalAmountToRepay = totalLoanAmount * Math.pow(1 + loanInterestRate, 4);
document.body.innerHTML += `<p>Total amount to repay with interest: $${totalAmountToRepay.toFixed(2)}</p>`;

collegeNameElement = document.getElementById('college-name')
//console.log(collegeNameElement)
collegeNameElement.innerHTML = `<p>${collegeName}<p>`;

document.addEventListener("DOMContentLoaded", function () {
    var greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
    if (lats && longs) {
        var map = L.map('map', {
            minZoom: 3,
            maxZoom: 18,
            maxBounds: [[-90, -180], [90, 180]],
            maxBoundsViscosity: 1.0,
        }).setView([lats, longs], 12);
        fetch(`https://api.geoapify.com/v2/places?categories=accommodation.apartment,accommodation.hotel&filter=circle:${longs},${lats},5000&bias=proximity:${longs},${lats}&limit=20&apiKey=${geoapi}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            console.log("Geoapify API Result:", result);
            if (result.features && result.features.length > 0) {
                result.features.forEach(feature => {
                    const lontt = feature.geometry.coordinates[0];
                    const lattt = feature.geometry.coordinates[1];
                    const name = feature.properties.name || 'Place';
                    const formattedAddress = feature.properties.formatted;
    
                    console.log("Name:", name);
                    console.log("Latitude:", lattt); 
                    console.log("Longitude:", lontt); 
                    console.log("Formatted Address:", formattedAddress);
                    if (typeof L !== 'undefined' && map) {
                        L.marker([lattt, lontt], {icon: greenIcon})
                        .addTo(map)
                        .bindPopup(`<h3>${name}</h3><p>${formattedAddress}</p>`);
                    }
                });
            }else{
                console.log("Geoapify API returned no results.");
            }
    
        })
        .catch(error => {
            console.error("Geoapify API Error:", error);
        });
        var uni = L.marker([lats, longs]).addTo(map);
        uni.bindPopup(`<h2>${collegeName}</h2>`);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Â© OpenStreetMap',
        }).addTo(map);
    } else {
        console.error("Latitude and Longitude are not available.");
    }
});