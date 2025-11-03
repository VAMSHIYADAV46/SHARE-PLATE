// Initialize Leaflet map
const map = L.map("map").setView([17.4065, 78.4772], 10);

// Add OpenStreetMap tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Create a layer group to manage markers
let markerGroup = L.layerGroup().addTo(map);

// Function to perform search
async function performSearch() {
  const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
  const searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = "";

  // Clear old markers from map before showing new ones
  markerGroup.clearLayers();

  try {
    const response = await fetch(`http://localhost:8888/fetchdonations?foodname=${searchInput}`);

    if (!response.ok) throw new Error("Network response was not ok");

    const filteredResults = await response.json();

    if (filteredResults.length > 0) {
      const bounds = []; // to fit all markers in view

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

        if (latLng && !isNaN(latLng[0]) && !isNaN(latLng[1])) {
          const marker = L.marker(latLng).addTo(markerGroup);

          marker.on("click", () => {
            redirectToDetails(result);
          });

          listItem.addEventListener("click", () => {
            redirectToDetails(result);
          });

          bounds.push(latLng);
        }

        searchResults.appendChild(listItem);
      });

      // Fit map view to show all markers nicely
      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
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



// Load all donations when page loads
document.addEventListener('DOMContentLoaded', fetchAllDonations);

document.getElementById("searchButton").onclick = search;
