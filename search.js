const inputBox = document.getElementById("input-box");
const resultBox = document.querySelector(".result-box");
const searchButton = document.getElementById("search-btn");
const apiKey = "g7FEYfAu065Ae41ee7Zd1XMk8gCDJQVVqfF6z5hN"; // move later
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
  const url = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${apiKey}&school.name=${encodedCollege}&fields=school.name`;

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
  if (!query) return;

  const encodedCollege = encodeURIComponent(query);
  const url = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${apiKey}&school.name=${encodedCollege}&fields=school.name,latest.cost.avg_net_price.public,latest.cost.avg_net_price.private`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const school = data.results[0];
      let cost = school["latest.cost.avg_net_price.public"] || school["latest.cost.avg_net_price.private"] || "No cost found";

      console.log(`Name: ${school["school.name"]}`);
      console.log(`Average Net Price: $${cost}`);
    } else {
      console.log("No results found");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
