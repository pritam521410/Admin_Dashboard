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

// Stream count for dashboard

async function streamCountForDashboard() {
  try {
    const res = await fetch("http://localhost:4000/api/stream/all");
    const res2 = await fetch("http://localhost:4000/api/degree/all");
    const res3 = await fetch(
      "http://localhost:4000/api/course-duration/all-course-duration"
    );
    const res4 = await fetch("http://localhost:4000/api/course/all");

    const res5 = await fetch(
      "http://localhost:4000/api/affilication/all-affilication"
    );

    const res6 = await fetch(
      "http://localhost:4000/api/exam-type/all-exam-type"
    );

    const res7 = await fetch("http://localhost:4000/api/ranking/all-ranking");

    const res8 = await fetch(
      "http://localhost:4000/api/ownership/all-ownership"
    );

    const res9 = await fetch(
      "http://localhost:4000/api/college-facility/all-college-facility"
    );
    const data = await res.json();
    const data2 = await res2.json();
    const data3 = await res3.json();
    const data4 = await res4.json();
    const data5 = await res5.json();
    const data6 = await res6.json();
    const data7 = await res7.json();
    const data8 = await res8.json();
    const data9 = await res9.json();

    console.log(data9.length);
    const streamCountForDashboard = document.getElementById(
      "streamCountForDashboard"
    );
    const degreeCountForDashboard = document.getElementById(
      "degreeCountForDashboard"
    );

    const collegeFacilityCountForDashboard = document.getElementById(
      "collegeFacilityCountForDashboard"
    );
    streamCountForDashboard.textContent = data.data.length;
    degreeCountForDashboard.textContent = data2.degrees.length;
    courseDurationCountForDashboard.textContent = data3.length;
    courseCountForDashboard.textContent = data4.courses.length;
    affiliationCountForDashboard.textContent = data5.length;
    examTypeCountForDashboard.textContent = data6.length;
    rankingCountForDashboard.textContent = data7.length;
    ownershipCountForDashboard.textContent = data8.length;
    collegeFacilityCountForDashboard.textContent = data9.length;
  } catch (err) {
    console.error("Fetch error:", err);
  }
}
streamCountForDashboard();
