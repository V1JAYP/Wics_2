const inputBox = document.getElementById("input-box");
const resultBox = document.querySelector(".result-box");
const searchButton = document.getElementById("search-btn");
const CapiKey = "g7FEYfAu065Ae41ee7Zd1XMk8gCDJQVVqfF6z5hN"; // move later
let debounceTimer;

inputBox.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(fetchCollegeSuggestions, 500);
});

// Fetch suggestions as user types
async function fetchCollegeSuggestions() {
  const query = inputBox.value.trim();

  if (query.length < 3) {
    resultBox.innerHTML = "";
    return;
  }

  const encodedCollege = encodeURIComponent(query);
  const url = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${CapiKey}&school.name=${encodedCollege}&fields=school.name`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      resultBox.innerHTML = data.results
        .map(
          (school) =>
            `<p class="suggestion">${school["school.name"]}</p>`
        )
        .join("");
      document.querySelectorAll(".suggestion").forEach((item) => {
        item.addEventListener("click", () => {
          inputBox.value = item.innerText;
          resultBox.innerHTML = "";
        });
      });
    } else {
      resultBox.innerHTML = "<p>No results found</p>";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    resultBox.innerHTML = "<p>Error fetching data. Please try again later.</p>";
  }
}

searchButton.addEventListener("click", async () => {
  const query = inputBox.value.trim();
  if (!query) {
    alert("Please enter a college name before searching.");
    return;
  }

  const encodedCollege = encodeURIComponent(query);
  
  const url = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${CapiKey}&school.name=${encodedCollege}&fields=school.name,latest.cost.avg_net_price.public,latest.cost.avg_net_price.private,location.lat,location.lon,latest.cost.roomboard.oncampus,latest.cost.booksupply,latest.cost.otherexpense.oncampus`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const school = data.results[0];
      const cost = school["latest.cost.avg_net_price.public"] || school["latest.cost.avg_net_price.private"];
      const roomAndBoard = school["latest.cost.roomboard.oncampus"] || "No data";
      const booksAndSupplies = school["latest.cost.booksupply"] || "No data";
      const otherExpenses = school["latest.cost.otherexpense.oncampus"] || "No data";
      const lat = school["location.lat"];
      const long = school["location.lon"];

      // Save data to localStorage for later use (e.g., results page)
      localStorage.setItem("collegeName", school["school.name"]);
      localStorage.setItem("lat", lat);
      localStorage.setItem("long", long);
      localStorage.setItem("Cost", cost);
      localStorage.setItem("roomAndBoard", roomAndBoard);
      localStorage.setItem("booksAndSupplies", booksAndSupplies);
      localStorage.setItem("otherExpenses", otherExpenses);

      // Redirect to results page
      window.location.href = "results.html";
    } else {
      alert("No results found. Try another search.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("An error occurred while fetching data. Please try again later.");
  }
});