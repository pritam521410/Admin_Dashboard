// Dashboard JavaScript Functions

// Toggle submenu functions
function toggleSubmenu(dropdownId, chevronId) {
  var dropdown = document.getElementById(dropdownId);
  var chevron = document.getElementById(chevronId);
  if (!dropdown.classList.contains("open")) {
    dropdown.classList.add("open");
    chevron.style.transform = "rotate(180deg)";
  } else {
    dropdown.classList.remove("open");
    chevron.style.transform = "rotate(0deg)";
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

// Close sidebar on nav click (mobile only)
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll(".sidebar nav li, .sidebar nav button")
    .forEach((el) => {
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

  // Add any additional initialization code here
  // For example, loading dashboard data, setting up event listeners, etc.
});
