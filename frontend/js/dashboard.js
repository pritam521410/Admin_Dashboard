document.addEventListener("DOMContentLoaded", function () {
  // Dashboard JavaScript Functions
  // Toggle submenu functions
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
      // Close all submenus inside this dropdown
      dropdown.querySelectorAll(".submenu").forEach(function (sub) {
        sub.classList.remove("open");
      });
    }
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

  function toggleLocationDirectory() {
    toggleSubmenu("locationDirectoryMenu", "locationChevron");
  }

  function toggleMasterData() {
    toggleSubmenu("masterDataDropdownMenu", "masterChevron");
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

  // REMOVE all sidebar logic (submenu open/close, chevron, toggle functions, keepSubmenuOpen, etc.) from this file. Only keep dashboard-specific logic. Sidebar logic will now be handled by script.js.
  async function countForDashboard() {
    try {
      const res = await fetch(`${baseUrl}/get-counts`);

      const data = await res.json();
      console.log(data.data.countryCount, data.data.stateCount);

      const countryCountForDashboard = document.getElementById(
        "countryCountForDashboard"
      );

      const StateCountForDashboard = document.getElementById(
        "StateCountForDashboard"
      );
      // console.log(data.data.country);
      if (countryCountForDashboard) {
        countryCountForDashboard.textContent = data.data.countryCount;
      }
      if (StateCountForDashboard) {
        StateCountForDashboard.textContent = data.data.stateCount;
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }
  // Close sidebar on nav click (mobile only)

  countForDashboard();

  // Initialize dashboard when DOM is loaded
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Dashboard initialized successfully");

    // Auto-open Location Directory submenu if on country or state page
    if (
      window.location.pathname.includes("country.php") ||
      window.location.pathname.includes("state.php")
    ) {
      const locationDropdown = document.getElementById(
        "locationDirectoryDropdown"
      );
      const locationChevron = document.getElementById("locationChevron");
      if (locationDropdown && !locationDropdown.classList.contains("open")) {
        locationDropdown.classList.add("open");
        if (locationChevron) {
          locationChevron.style.transform = "rotate(180deg)";
        }
      }
    }

    // Add any additional initialization code here
    // For example, loading dashboard data, setting up event listeners, etc.
  });
});

// Expose sidebar toggle functions globally for sidebar.php onclicks
