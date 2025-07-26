"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = "http://localhost:4000/api";
  window.baseUrl = baseUrl;

  // Close all submenus and remove all active classes
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

  function getFileName(url) {
    if (!url) return "";
    return url.split("/").pop().split("?")[0].split("#")[0];
  }

  const lastActiveSubmenu = localStorage.getItem("lastActiveSubmenu");
  if (lastActiveSubmenu) {
    document.querySelectorAll(".submenu li a").forEach(function (link) {
      if (
        getFileName(link.getAttribute("href")) ===
        getFileName(lastActiveSubmenu)
      ) {
        link.classList.add("active");
        link.style.background = "#2563eb";
        link.style.color = "#fff";
        // Always open the parent submenu
        var parentSubmenu = link.closest(".submenu");
        if (parentSubmenu) {
          parentSubmenu.classList.add("open");
          parentSubmenu.style.maxHeight = "1000px"; // force open
          parentSubmenu.style.opacity = "1";
          parentSubmenu.style.transform = "translateY(0)";
          var chevron =
            parentSubmenu.parentElement.querySelector(".fa-chevron-down");
          if (chevron) {
            chevron.style.transform = "rotate(180deg)";
          }
        }
        // Force sidebar open (for mobile)
        var sidebar = document.querySelector(".sidebar");
        if (sidebar) {
          sidebar.classList.add("open");
        }
        // Remove overlay if present (for mobile)
        var overlay = document.querySelector(".sidebar-overlay");
        if (overlay) {
          overlay.classList.remove("hide");
          overlay.style.display = "none";
        }
      }
    });
  }

  // On click of any submenu link
  document.querySelectorAll(".submenu li a").forEach(function (link) {
    link.addEventListener("click", function (e) {
      // Remove active from all
      document.querySelectorAll(".submenu li a").forEach(function (l) {
        l.classList.remove("active");
        l.style.background = "";
        l.style.color = "";
      });
      // Add active to clicked
      link.classList.add("active");
      link.style.background = "#2563eb";
      link.style.color = "#fff";
      // Store only the filename in localStorage
      localStorage.setItem(
        "lastActiveSubmenu",
        getFileName(link.getAttribute("href"))
      );
      // Keep the parent submenu open
      var parentSubmenu = link.closest(".submenu");
      if (parentSubmenu) {
        parentSubmenu.classList.add("open");
        // Rotate only the parent chevron
        var chevron =
          parentSubmenu.parentElement.querySelector(".fa-chevron-down");
        if (chevron) {
          chevron.style.transform = "rotate(180deg)";
        }
      }
      // Force sidebar open (for mobile)
      var sidebar = document.querySelector(".sidebar");
      if (sidebar) {
        sidebar.classList.add("open");
      }
      // Remove overlay if present (for mobile)
      var overlay = document.querySelector(".sidebar-overlay");
      if (overlay) {
        overlay.classList.remove("hide");
        overlay.style.display = "none";
      }
      // Reset all other chevrons
      document
        .querySelectorAll(".sidebar .fa-chevron-down")
        .forEach(function (chevron) {
          if (
            !parentSubmenu ||
            chevron !==
              parentSubmenu.parentElement.querySelector(".fa-chevron-down")
          ) {
            chevron.style.transform = "rotate(0deg)";
          }
        });
      // --- PATCH: Show open effect before navigation ---
      e.preventDefault();
      setTimeout(function () {
        window.location.href = link.getAttribute("href");
      }, 120); // 120ms for visual feedback
    });
  });

  // Ensure all submenus close when clicking Dashboard main menu item
  var dashboardLink = document.querySelector(
    '.sidebar a[href="dashboard.php"]'
  );
  if (dashboardLink) {
    dashboardLink.addEventListener("click", function () {
      document
        .querySelectorAll(".sidebar .submenu")
        .forEach(function (submenu) {
          submenu.classList.remove("open");
        });
      document
        .querySelectorAll(".sidebar .fa-chevron-down")
        .forEach(function (chevron) {
          chevron.style.transform = "rotate(0deg)";
        });
    });
  }

  // Sidebar dropdown toggle functions for sidebar.php
  window.toggleLocationDirectory = function () {
    var dropdown = document.getElementById("locationDirectoryDropdown");
    var chevron = document.getElementById("locationChevron");
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
  };
  window.toggleMasterData = function (event) {
    if (event) event.stopPropagation();
    var dropdown = document.getElementById("masterDataDropdown");
    var chevron = document.getElementById("masterChevron");
    if (!dropdown.classList.contains("open")) {
      dropdown.classList.add("open");
      chevron.style.transform = "rotate(180deg)";
      chevron.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    } else {
      dropdown.classList.remove("open");
      chevron.style.transform = "rotate(0deg)";
      chevron.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
      dropdown.querySelectorAll(".submenu").forEach(function (sub) {
        sub.classList.remove("open");
      });
    }
  };
  window.toggleCollegeMaster = function () {
    var dropdown = document.getElementById("collegeMasterDropdown");
    var chevron = document.getElementById("collegeChevron");
    if (!dropdown.classList.contains("open")) {
      dropdown.classList.add("open");
      chevron.style.transform = "rotate(180deg)";
      chevron.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    } else {
      dropdown.classList.remove("open");
      chevron.style.transform = "rotate(0deg)";
      chevron.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
      dropdown.querySelectorAll(".submenu").forEach(function (sub) {
        sub.classList.remove("open");
      });
    }
  };
  window.toggleExamMaster = function () {
    var dropdown = document.getElementById("examMasterDropdown");
    var chevron = document.getElementById("examChevron");
    if (!dropdown.classList.contains("open")) {
      dropdown.classList.add("open");
      chevron.style.transform = "rotate(180deg)";
      chevron.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    } else {
      dropdown.classList.remove("open");
      chevron.style.transform = "rotate(0deg)";
      chevron.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
      dropdown.querySelectorAll(".submenu").forEach(function (sub) {
        sub.classList.remove("open");
      });
    }
  };
  window.toggleAdvMaster = function () {
    var dropdown = document.getElementById("advMasterDropdown");
    var chevron = document.getElementById("advChevron");
    if (!dropdown.classList.contains("open")) {
      dropdown.classList.add("open");
      chevron.style.transform = "rotate(180deg)";
      chevron.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    } else {
      dropdown.classList.remove("open");
      chevron.style.transform = "rotate(0deg)";
      chevron.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
      dropdown.querySelectorAll(".submenu").forEach(function (sub) {
        sub.classList.remove("open");
      });
    }
  };
  window.toggleEnquiryData = function () {
    var dropdown = document.getElementById("enquiryDataDropdown");
    var chevron = document.getElementById("enquiryChevron");
    if (!dropdown.classList.contains("open")) {
      dropdown.classList.add("open");
      chevron.style.transform = "rotate(180deg)";
      chevron.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    } else {
      dropdown.classList.remove("open");
      chevron.style.transform = "rotate(0deg)";
      chevron.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
      dropdown.querySelectorAll(".submenu").forEach(function (sub) {
        sub.classList.remove("open");
      });
    }
  };
  window.toggleExtraPages = function () {
    var dropdown = document.getElementById("extraPagesDropdown");
    var chevron = document.getElementById("extraPagesChevron");
    if (!dropdown.classList.contains("open")) {
      dropdown.classList.add("open");
      chevron.style.transform = "rotate(180deg)";
      chevron.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    } else {
      dropdown.classList.remove("open");
      chevron.style.transform = "rotate(0deg)";
      chevron.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
      dropdown.querySelectorAll(".submenu").forEach(function (sub) {
        sub.classList.remove("open");
      });
    }
  };
  window.keepSubmenuOpen = function (dropdownId, chevronId) {
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
  };

  if (
    window.location.pathname.includes("country.php") ||
    window.location.pathname.includes("state.php") ||
    window.location.pathname.includes("district.php")
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
});
