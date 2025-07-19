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
      chevron.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    }
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

// Sidebar toggle for mobile
const sidebar = document.querySelector(".sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarOverlay = document.getElementById("sidebarOverlay");

function openSidebar() {
  sidebar.classList.add("open");
  sidebarOverlay.classList.remove("hide");
}

function closeSidebar() {
  sidebar.classList.remove("open");
  sidebarOverlay.classList.add("hide");
}

// Event listeners for sidebar functionality
if (sidebarToggle) {
  sidebarToggle.addEventListener("click", openSidebar);
}

if (sidebarOverlay) {
  sidebarOverlay.addEventListener("click", closeSidebar);
}
async function countForDashboard() {
  try {
    const res = await fetch("http://localhost:4000/api/get-counts");
    const data = await res.json();
    const countryCountForDashboard = document.getElementById(
      "countryCountForDashboard"
    );
    // console.log(data.data.country);
    countryCountForDashboard.textContent = data.data.country;
  } catch (err) {
    console.error("Fetch error:", err);
  }
}
// Close sidebar on nav click (mobile only)

countForDashboard();
document.addEventListener("DOMContentLoaded", function () {
  // Handle main menu items (not submenu items)
  document.querySelectorAll(".sidebar nav > ul > li").forEach((el) => {
    let a = el.querySelector("a");
    if (a) {
      a.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
          if (el.classList.contains("has-submenu")) {
            const menuId = el.id;
            const chevronId = menuId + "Chevron";
            toggleSubmenu(menuId, chevronId);
          } else {
            closeSidebar();
          }
        }
      });
    }
  });

  // Handle submenu items separately - don't close sidebar when clicking on them
  document.querySelectorAll(".sidebar nav .submenu li a").forEach((a) => {
    a.addEventListener("click", (e) => {
      // Prevent the click from bubbling up to parent elements
      e.stopPropagation();

      if (window.innerWidth <= 900) {
        // Don't close sidebar when clicking on submenu items
        // The navigation will happen naturally
      }
    });
  });
});

// Fullscreen logic
const fullscreenToggle = document.getElementById("fullscreenToggle");

if (fullscreenToggle) {
  fullscreenToggle.addEventListener("click", function () {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });
}

document.addEventListener("fullscreenchange", function () {
  if (document.fullscreenElement) {
    document.body.classList.add("fullscreen-active");
    // Also close sidebar if open
    closeSidebar();
  } else {
    document.body.classList.remove("fullscreen-active");
  }
});

// Initialize dashboard when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("Dashboard initialized successfully");

  // Auto-open Location Directory submenu if on country page
  if (window.location.pathname.includes("country.php")) {
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
