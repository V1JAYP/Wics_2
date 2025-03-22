const inputBox = document.getElementById("input-box");
const resultBox = document.querySelector(".result-box");
const apiKey = "g7FEYfAu065Ae41ee7Zd1XMk8gCDJQVVqfF6z5hN"; // move somewhere later

inputBox.addEventListener("input", async () => {
  const query = inputBox.value.trim();

  if (query.length < 3) {
    resultBox.innerHTML = ""; // Clear results if query is too short
    return;
  }

  const encodedCollege = encodeURIComponent(query);
  const url = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${apiKey}&school.name=${encodedCollege}&fields=school.name,latest.cost.avg_net_price.public,latest.cost.avg_net_price.private`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const school = data.results[0];
      let cost = school['latest.cost.avg_net_price.public'];

      if (cost === null) {
        cost = school['latest.cost.avg_net_price.private'];
      }

      if (cost === null) {
        cost = "No cost found";
      }

      resultBox.innerHTML = `<p>College: ${school['school.name']}</p>`;
    } else {
      resultBox.innerHTML = "<p>No results found</p>";
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    resultBox.innerHTML = "<p>Error fetching data. Please try again later.</p>";
  }
});
