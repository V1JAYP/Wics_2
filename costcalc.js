collegeName = localStorage.getItem("collegeName");
collegeCost = parseFloat(localStorage.getItem("collegeCost"));
let roomAndBoards = parseFloat(localStorage.getItem("roomAndBoard"));
let booksAndSupplie = parseFloat(localStorage.getItem("booksAndSupplies"));
let otherExpense = parseFloat(localStorage.getItem("otherExpenses"));
lats = parseFloat(localStorage.getItem("lat"));
longs = parseFloat(localStorage.getItem("long"));
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
let salary = parseFloat(prompt("Enter your yearly salary after taxes:"));
let savings = parseFloat(prompt("Enter your savings for college:"));

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
