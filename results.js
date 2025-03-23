const collegeName = localStorage.getItem("collegeName") || "Default College";
const collegeCost = localStorage.getItem("collegeCost") || "N/A";


const container = document.querySelector(".container");


const infoDiv = document.createElement("div");
infoDiv.classList.add("info");


const title = document.createElement("h2");
title.textContent = collegeName;
title.classList.add("college-title");


const cost = document.createElement("p");
cost.textContent = `Estimated Cost: $${collegeCost}`;
cost.classList.add("college-cost");

infoDiv.appendChild(title);
infoDiv.appendChild(cost);


container.insertBefore(infoDiv, container.firstChild);

