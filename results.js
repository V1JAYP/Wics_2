
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

console.log("College Name:", collegeName);
console.log("Estimated Cost:", collegeCost);
console.log("Room and Boards:", roomAndBoards);
console.log("Books and Supplies:", booksAndSupplie);
console.log("Other Expenses:", otherExpense);
console.log("Latitude:", lats);
console.log("Longitude:", longs);

// Input from user
//let salary = parseFloat(prompt("Enter your yearly salary after taxes:"));
//let savings = parseFloat(prompt("Enter your savings for college:"));

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

        console.log(`You need to borrow ${loanForYear.toFixed(2)} for Year ${year}.`);
        console.log(`Year ${year} Cost Breakdown:`);
        console.log(`  Tuition: $${collegeCost.toFixed(2)}`);
        console.log(`  Room and Board: $${roomAndBoards.toFixed(2)}`);
        console.log(`  Books and Supplies: $${inflatedBooks.toFixed(2)}`);
        console.log(`  Other Expenses: $${inflatedOther.toFixed(2)}`);
        console.log(`  Scholarship: $${scholarshipAmount.toFixed(2)}`);
        console.log(`  Total Cost: $${(collegeCost + roomAndBoards + inflatedBooks + inflatedOther - scholarshipAmount).toFixed(2)}`);
        console.log(`  Available Funds: $${availableFunds.toFixed(2)}`);
        console.log(`  Loan Amount: $${loanForYear.toFixed(2)}`);

        savings += calculateCompoundInterest(savings, savingsInterestRate, 1);
    } else {
        console.log(`No loan needed for Year ${year}. Your funds cover the cost.`);
        console.log(`Year ${year} Cost Breakdown:`);
        console.log(`  Tuition: $${collegeCost.toFixed(2)}`);
        console.log(`  Room and Board: $${roomAndBoards.toFixed(2)}`);
        console.log(`  Books and Supplies: $${inflatedBooks.toFixed(2)}`);
        console.log(`  Other Expenses: $${inflatedOther.toFixed(2)}`);
        console.log(`  Scholarship: $${scholarshipAmount.toFixed(2)}`);
        console.log(`  Total Cost: $${(collegeCost + roomAndBoards + inflatedBooks + inflatedOther - scholarshipAmount).toFixed(2)}`);
        console.log(`  Available Funds: $${availableFunds.toFixed(2)}`);
        console.log(`  Loan Amount: $0.00`);

        savings += calculateCompoundInterest(savings, savingsInterestRate, 1);
    }
}

// Total loan and interest after 4 years
console.log("\nTotal loan to pay over 4 years:", totalLoanAmount.toFixed(2));
let totalAmountToRepay = totalLoanAmount * Math.pow(1 + loanInterestRate, 4);
console.log("Total amount to repay with interest:", totalAmountToRepay.toFixed(2));

document.body.innerHTML += `<h2>${collegeName}</h2>`;
document.body.innerHTML += `<p>Estimated Cost: $${collegeCost}</p>`;

document.addEventListener("DOMContentLoaded", function () {
    if (lats && longs) {
        var map = L.map('map', {
            minZoom: 3,
            maxZoom: 18,
            maxBounds: [[-90, -180], [90, 180]],
            maxBoundsViscosity: 1.0,
        }).setView([lats, longs], 12);
        var uni = L.marker([lats, longs]).addTo(map);
        uni.bindPopup(`<h2>${collegeName}</h2>`);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Â© OpenStreetMap',
        }).addTo(map);
    } else {
        console.error("Latitude and Longitude are not available.");
    }
});
