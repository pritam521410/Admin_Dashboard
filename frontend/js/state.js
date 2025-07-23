document.addEventListener("DOMContentLoaded", function () {
  const countryDropdown = document.getElementById("countryDropdown");
  const stateForm = document.getElementById("stateForm");
  const formDiv = document.getElementById("formDiv");
  const listDiv = document.getElementById("listDiv");
  const stateDropdown = document.getElementById("stateDropdown");
  let allStates = [];

  // Populate country dropdown
  fetch("http://localhost:4000/api/country/all-countries")
    .then((response) => response.json())
    .then((countries) => {
      if (!Array.isArray(countries)) return;
      countries.forEach((country) => {
        const option = document.createElement("option");
        option.value = country._id;
        option.textContent = country.name;
        countryDropdown.appendChild(option);
      });
    });

  // Fetch all states on page load and store
  fetch("http://localhost:4000/api/state/all-states")
    .then((response) => response.json())
    .then((states) => {
      if (!Array.isArray(states)) return;
      allStates = states;
    });

  // On country change, filter states from allStates
  countryDropdown.addEventListener("change", function () {
    const selectedCountryId = countryDropdown.value;
    if (!stateDropdown) return;
    stateDropdown.innerHTML = '<option value="">-- Select State --</option>';
    if (!selectedCountryId) return;
    allStates
      .filter(
        (state) =>
          state.country &&
          String(state.country._id) === String(selectedCountryId)
      )
      .forEach((state) => {
        const option = document.createElement("option");
        option.value = state._id;
        option.textContent = state.name;
        stateDropdown.appendChild(option);
      });
  });

  // Render state table
  function renderStateTable(states) {
    const stateTable = document.getElementById("stateTable");
    if (!stateTable) return;
    stateTable.innerHTML = states
      .map(
        (s, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${s.name}</td>
        <td>${s.code}</td>
        <td>${s.country?.name || ""}</td>
        <td>${s.description}</td>
        <td style="text-align:center;">
          ${
            s.logo
              ? `<img src="http://localhost:4000/${s.logo}" alt="logo" style="width:40px;height:40px;object-fit:cover;border-radius:6px;border:1px solid #e5e7eb;" />`
              : "<span class='na'>N/A</span>"
          }
        </td>
        <td style="text-align:center;">
          ${
            s.flag
              ? `<img src="http://localhost:4000/${s.flag}" alt="map" style="width:40px;height:30px;object-fit:cover;border-radius:4px;border:1px solid #e5e7eb;" />`
              : "<span class='na'>N/A</span>"
          }
        </td>
      </tr>
    `
      )
      .join("");
  }

  // Fetch states from backend
  async function fetchStates() {
    try {
      const res = await fetch("http://localhost:4000/api/state/all-states");
      const data = await res.json();
      renderStateTable(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  // On page load, show state list
  fetchStates();

  // On page load, close all sidebar submenus and reset chevrons
  // document.querySelectorAll(".sidebar .submenu").forEach(function (submenu) {
  //   submenu.classList.remove("open");
  // });
  // document
  //   .querySelectorAll(".sidebar .fa-chevron-down")
  //   .forEach(function (chevron) {
  //     chevron.style.transform = "rotate(0deg)";
  //     chevron.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
  //   });

  // Prevent sidebar from closing on submenu item click (for mobile)
  document.querySelectorAll(".sidebar nav .submenu li a").forEach((a) => {
    a.addEventListener("click", function (e) {
      e.stopPropagation();
      // Navigation will happen naturally, sidebar stays open
    });
  });

  // Show/hide form and list on button clicks
  const showFormBtn = document.getElementById("showFormBtn");
  const showListBtn = document.getElementById("showListBtn");

  if (showFormBtn && showListBtn && formDiv && listDiv) {
    showFormBtn.addEventListener("click", function () {
      formDiv.style.display = "block";
      listDiv.style.display = "none";
      // Remove auto-focus from State Name input
      // const stateNameInput = stateForm ? stateForm.querySelector('input[name="code"]') : null;
      // if (stateNameInput) {
      //   stateNameInput.focus();
      // }
    });
    showListBtn.addEventListener("click", function () {
      formDiv.style.display = "none";
      listDiv.style.display = "block";
    });
  }

  // Form submit handler
  if (stateForm) {
    stateForm.onsubmit = async function (e) {
      e.preventDefault();
      // Validate country selection
      if (!countryDropdown.value) {
        alert("Please select a country.");
        countryDropdown.focus();
        return;
      }
      const formData = new FormData(stateForm);
      try {
        const response = await fetch(
          "http://localhost:4000/api/state/add-state",
          {
            method: "POST",
            body: formData,
          }
        );
        const result = await response.json();
        alert(result.message || "State added!");
        stateForm.reset();
        formDiv.style.display = "none";
        listDiv.style.display = "block";
        fetchStates(); // Refresh list after add
      } catch (error) {
        alert("Failed to submit state.");
      }
    };
  }

  // On page load, force remove .active class, blur, and reset background/color for all submenu links
  // document.querySelectorAll(".submenu li a").forEach(function (link) {
  //   link.classList.remove("active");
  //   link.blur();
  //   link.style.background = "";
  //   link.style.color = "";
  // });
});

// Force all chevrons to 0deg after all scripts and DOM are loaded
window.onload = function () {
  document
    .querySelectorAll(".sidebar .fa-chevron-down")
    .forEach(function (chevron) {
      chevron.style.transform = "rotate(0deg)";
      chevron.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    });
};
