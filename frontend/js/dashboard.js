// === Sidebar Submenu Toggle ===
if (typeof initSidebar === "function") initSidebar();

function toggleSubmenu(dropdownId, chevronId) {
  const dropdown = document.getElementById(dropdownId);
  const chevron = document.getElementById(chevronId);

  if (dropdown) {
    const isOpen = dropdown.classList.toggle("open");
    if (chevron) {
      chevron.style.transform = isOpen ? "rotate(180deg)" : "rotate(0deg)";
      chevron.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    }
  }
}

function keepSubmenuOpen(dropdownId, chevronId) {
  const dropdown = document.getElementById(dropdownId);
  const chevron = document.getElementById(chevronId);

  if (dropdown && !dropdown.classList.contains("open")) {
    dropdown.classList.add("open");
    if (chevron) {
      chevron.style.transform = "rotate(180deg)";
      chevron.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    }
  }
}

const submenuToggles = {
  locationDirectory: ["locationDirectoryDropdown", "locationChevron"],
  masterData: ["masterDataDropdown", "masterChevron"],
  collegeMaster: ["collegeMasterDropdown", "collegeChevron"],
  examMaster: ["examMasterDropdown", "examChevron"],
  advMaster: ["advMasterDropdown", "advChevron"],
  enquiryData: ["enquiryDataDropdown", "enquiryChevron"],
  extraPages: ["extraPagesDropdown", "extraPagesChevron"],
};

Object.entries(submenuToggles).forEach(([key, [dropdownId, chevronId]]) => {
  window[`toggle${key.charAt(0).toUpperCase() + key.slice(1)}`] = () =>
    toggleSubmenu(dropdownId, chevronId);
});

// === Sidebar (Mobile) ===
const sidebar = document.querySelector(".sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarOverlay = document.getElementById("sidebarOverlay");

function openSidebar() {
  sidebar?.classList.add("open");
  sidebarOverlay?.classList.remove("hide");
}

function closeSidebar() {
  sidebar?.classList.remove("open");
  sidebarOverlay?.classList.add("hide");
}

sidebarToggle?.addEventListener("click", openSidebar);
sidebarOverlay?.addEventListener("click", closeSidebar);

// === Fetch Dashboard Counts ===
async function countForDashboard() {
  try {
    const data = await apiRequest("http://localhost:4000/api/get-counts");
    document.getElementById("countryCountForDashboard").textContent =
      data.data?.countryCount ?? "-";
    document.getElementById("StateCountForDashboard").textContent =
      data.data?.stateCount ?? "-";
    document.getElementById("districtCountForDashboard").textContent =
      data.data?.districtCount ?? "-";
  } catch (err) {
    console.error("Dashboard count fetch failed:", err);
    [
      "countryCountForDashboard",
      "StateCountForDashboard",
      "districtCountForDashboard",
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = "-";
    });
  }
}

// === Stream & Degree Count ===
async function streamCountForDashboard() {
  try {
    const [streamData, degreeData] = await Promise.all([
      apiRequest("http://localhost:4000/api/stream/all").catch((err) => {
        if (err.message === "Not Found") return { data: [] };
        throw err;
      }),
      apiRequest("http://localhost:4000/api/degree/all").catch((err) => {
        if (err.message === "Not Found") return { degrees: [] };
        throw err;
      }),
    ]);

    document.getElementById("streamCountForDashboard").textContent =
      streamData.data?.length ?? "-";
    document.getElementById("degreeCountForDashboard").textContent =
      degreeData.degrees?.length ?? "-";
  } catch (err) {
    // Only log if not a 404 error
    if (err.message !== "Not Found") {
      console.error("Stream/Degree fetch failed:", err);
    }
    document.getElementById("streamCountForDashboard").textContent = "-";
    document.getElementById("degreeCountForDashboard").textContent = "-";
  }
}

// === Fullscreen Handling ===
const fullscreenToggle = document.getElementById("fullscreenToggle");

fullscreenToggle?.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

document.addEventListener("fullscreenchange", () => {
  document.body.classList.toggle(
    "fullscreen-active",
    !!document.fullscreenElement
  );
  if (!document.fullscreenElement) return;
  closeSidebar();
});

// === Init on DOMContentLoaded ===
document.addEventListener("DOMContentLoaded", () => {
  // Auto-expand Location Directory submenu on specific page
  if (window.location.pathname.includes("country.php")) {
    keepSubmenuOpen("locationDirectoryDropdown", "locationChevron");
  }

  countForDashboard();
  streamCountForDashboard();
});

// === Prevent Sidebar Close on Submenu Click ===
document.querySelectorAll(".sidebar nav .submenu li a").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (window.innerWidth <= 900) {
      e.stopPropagation(); // Allow navigation but don't close sidebar
    }
  });
});
