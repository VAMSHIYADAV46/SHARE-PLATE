// Initialize Leaflet map
const map = L.map("map").setView([17.4065, 78.4772], 10);

// Add OpenStreetMap tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Function to perform search
async function performSearch() {
  const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
  const searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = "";

  try {
    const response = await fetch(`http://localhost:8888/fetchdonations?foodname=${searchInput}`);

    if (!response.ok) throw new Error("Network response was not ok");

    const filteredResults = await response.json();

    if (filteredResults.length > 0) {
      filteredResults.forEach((result) => {
        const listItem = document.createElement("div");
        listItem.textContent = result.Location;
        listItem.classList.add("searchResult");

        // Extract coordinates safely (assuming result.Location contains "lat,lng")
        let latLng;
        if (typeof result.Location === "string" && result.Location.includes(",")) {
          const [lat, lng] = result.Location.split(",").map(Number);
          latLng = [lat, lng];
        } else if (Array.isArray(result.Location)) {
          latLng = result.Location;
        }

        if (latLng) {
          const marker = L.marker(latLng).addTo(map);

          marker.on("click", () => {
            redirectToDetails(result);
          });

          listItem.addEventListener("click", () => {
            redirectToDetails(result);
          });
        }

        searchResults.appendChild(listItem);
      });
    } else {
      const noResultsMessage = document.createElement("div");
      noResultsMessage.textContent = "No results found.";
      searchResults.appendChild(noResultsMessage);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Helper function for redirecting
function redirectToDetails(result) {
  const params = new URLSearchParams({
    param1: result.Food_Name,
    param2: result.Quantity,
    param3: result.Fresh_Time,
    param4: result.Location,
    param5: result.Mobile_Number,
    param6: result.Other_Details,
  });
  window.location.href = `of.html?${params.toString()}`;
}

// Add event listener for search button
document.getElementById("searchButton").addEventListener("click", performSearch);
