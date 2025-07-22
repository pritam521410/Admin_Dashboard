document.addEventListener("DOMContentLoaded", function () {
  const countryDropdown = document.getElementById("countryDropdown");
  const stateForm = document.getElementById("stateForm");
  const formDiv = document.getElementById("formDiv");
  const listDiv = document.getElementById("listDiv");

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

  function toggleSubmenu(dropdownId, chevronId) {
    var dropdown = document.getElementById(dropdownId);
    var chevron = document.getElementById(chevronId);
    if (!dropdown.classList.contains("open")) {
      dropdown.classList.add("open");
      chevron.style.transform = "rotate(180deg)";
      chevron.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    } else {
      dropdown.classList.remove("open");
      chevron.style.transform = "rotate(0deg)";
      chevron.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    }
  }

  function toggleLocationDirectory() {
    toggleSubmenu("locationDirectoryDropdown", "locationChevron");
  }

  function toggleMasterData() {
    toggleSubmenu("masterDataDropdown", "masterChevron");
  }

  function toggleCollegeMaster() {
    toggleSubmenu("collegeMasterDropdown", "collegeChevron");
  }

  function toggleExamMaster() {
    toggleSubmenu("examMasterDropdown", "examChevron");
  }

  function toggleAdvMaster() {
    toggleSubmenu("advMasterDropdown", "advChevron");
  }

  function toggleEnquiryData() {
    toggleSubmenu("enquiryDataDropdown", "enquiryChevron");
  }

  function toggleExtraPages() {
    toggleSubmenu("extraPagesDropdown", "extraPagesChevron");
  }

  // Keep submenu open when clicking on submenu items
  function keepSubmenuOpen(dropdownId, chevronId) {
    var dropdown = document.getElementById(dropdownId);
    var chevron = document.getElementById(chevronId);
    if (dropdown && !dropdown.classList.contains("open")) {
      dropdown.classList.add("open");
      if (chevron) {
        chevron.style.transform = "rotate(180deg)";
        chevron.style.transition =
          "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
      }
    }
  }

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

  // Highlight the State link in the sidebar as active
  const stateSidebarLink = document.querySelector('a[href="state.php"]');
  if (stateSidebarLink) {
    stateSidebarLink.classList.add("active");
    stateSidebarLink.style.background = "#2563eb";
    stateSidebarLink.style.color = "#fff";
    // Remove active from siblings
    const submenuLinks =
      stateSidebarLink.parentElement.parentElement.querySelectorAll("a");
    submenuLinks.forEach((link) => {
      if (link !== stateSidebarLink) {
        link.classList.remove("active");
        link.style.background = "";
        link.style.color = "";
      }
    });
  }

  // Auto-open Location Directory submenu if on state.php
  const locationDropdown = document.getElementById("locationDirectoryDropdown");
  const locationChevron = document.getElementById("locationChevron");
  if (locationDropdown && !locationDropdown.classList.contains("open")) {
    locationDropdown.classList.add("open");
    if (locationChevron) {
      locationChevron.style.transform = "rotate(180deg)";
    }
  }

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
      // Focus the State Name input
      const stateNameInput = stateForm
        ? stateForm.querySelector('input[name="code"]')
        : null;
      if (stateNameInput) {
        stateNameInput.focus();
      }
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
});
