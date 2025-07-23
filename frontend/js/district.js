document.addEventListener("DOMContentLoaded", function () {
  const countryDropdown = document.getElementById("districtCountryDropdown");
  const stateDropdown = document.getElementById("districtStateDropdown");
  const districtForm = document.getElementById("districtForm");

  // On page load, close all submenus and remove all active classes
  document.querySelectorAll(".sidebar .submenu").forEach(function (submenu) {
    submenu.classList.remove("open");
  });
  document.querySelectorAll(".submenu li a").forEach(function (link) {
    link.classList.remove("active");
    link.blur();
    link.style.background = "";
    link.style.color = "";
  });
  document
    .querySelectorAll(".sidebar .fa-chevron-down")
    .forEach(function (chevron) {
      chevron.style.transform = "rotate(0deg)";
      chevron.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    });

  // 1. Load countries
  fetch("http://localhost:4000/api/country/all-countries")
    .then((res) => res.json())
    .then((countries) => {
      if (!Array.isArray(countries)) return;
      countries.forEach((country) => {
        const option = document.createElement("option");
        option.value = country._id;
        option.textContent = country.name;
        countryDropdown.appendChild(option);
      });
    })
    .catch((err) => {
      console.error("Error loading countries:", err);
    });

  // 2. On country change, fetch states and populate state dropdown
  fetch("http://localhost:4000/api/state/all-states")
    .then((res) => res.json())
    .then((states) => {
      if (!Array.isArray(states)) return;
      states.forEach((state) => {
        const option = document.createElement("option");
        option.value = state._id;
        option.textContent = state.name;
        stateDropdown.appendChild(option);
      });
    })
    .catch((err) => {
      console.error("Error loading countries:", err);
    });

  // 3. Render district table
  function renderDistrictTable(districts) {
    const districtTable = document.getElementById("districtTable");
    if (!districtTable) return;
    districtTable.innerHTML = districts
      .map(
        (d, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${d.districtName}</td>
        <td>${d.stateName}</td>
        <td>${d.countryName}</td>
      </tr>`
      )
      .join("");
  }

  // 4. Fetch district list from API
  async function fetchAndRenderDistricts() {
    try {
      const res = await fetch(
        "http://localhost:4000/api/district/all-districts"
      );
      const data = await res.json();
      renderDistrictTable(
        data.map((d) => ({
          districtName: d.districtName,
          stateName: d.state?.name || "",
          countryName: d.country?.name || "",
        }))
      );
    } catch (err) {
      console.error("Failed to fetch districts:", err);
      renderDistrictTable([]); // Show empty table
    }
  }

  // 5. On page load, fetch districts
  fetchAndRenderDistricts();

  // 6. Form submission handler
  if (districtForm) {
    districtForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const country = countryDropdown.value;
      const state = stateDropdown.value;
      const districtName = districtForm.districtName.value.trim();
      if (!country || !state || !districtName) {
        alert("Please fill all required fields.");
        return;
      }
      try {
        const res = await fetch(
          "http://localhost:4000/api/district/add-district",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country, state, districtName }),
          }
        );
        const result = await res.json();
        if (res.ok) {
          alert(result.message || "District added successfully!");
          districtForm.reset();
          fetchAndRenderDistricts();
          // Show list, hide form
          const formDiv = document.getElementById("districtFormDiv");
          const listDiv = document.getElementById("districtListDiv");
          if (formDiv && listDiv) {
            formDiv.style.display = "none";
            listDiv.style.display = "block";
          }
        } else {
          alert(result.message || "Failed to add district.");
        }
      } catch (err) {
        console.error("Error submitting district:", err);
        alert("Error submitting district.");
      }
    });
  }
});
