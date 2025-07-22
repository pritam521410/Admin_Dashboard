// Country Management JavaScript

document.addEventListener("DOMContentLoaded", function () {
  console.log("Country management JS loaded");

  // Country form/list functionality
  const showFormBtn = document.getElementById("showFormBtn");
  const showListBtn = document.getElementById("showListBtn");
  const formDiv = document.getElementById("formDiv");
  const listDiv = document.getElementById("listDiv");
  const countryForm = document.getElementById("countryForm");
  const countryTable = document.getElementById("countryTable");

  let countries = [];

  // Button event listeners
  if (showFormBtn) {
    showFormBtn.onclick = () => {
      console.log("Show form button clicked");
      formDiv.style.display = "";
      listDiv.style.display = "none";
      // Focus the Country Name input
      const nameInput = countryForm.querySelector('input[name="name"]');
      if (nameInput) {
        nameInput.focus();
      }
    };
  }

  if (showListBtn) {
    showListBtn.onclick = () => {
      console.log("Show list button clicked");
      formDiv.style.display = "none";
      listDiv.style.display = "";
      fetchCountries();
    };
  }

  // Form submission handler with API integration
  if (countryForm) {
    countryForm.onsubmit = async function (e) {
      e.preventDefault();
      console.log("Country form submitted");
      const formData = new FormData(countryForm);
      try {
        const response = await fetch(
          "http://localhost:4000/api/country/add-country",
          {
            method: "POST",
            body: formData,
          }
        );
        const result = await response.json();
        alert(result.message || "Country added!");
        countryForm.reset();
        formDiv.style.display = "none";
        listDiv.style.display = "block";
        fetchCountries();
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit country.");
      }
    };
  }

  // Fetch countries from API
  async function fetchCountries() {
    try {
      const res = await fetch(`${baseUrl}/country/all-countries`);
      const data = await res.json();
      countries = data;
      renderTable();
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  // Render table function with image support
  function renderTable() {
    if (countryTable) {
      countryTable.innerHTML = countries
        .map(
          (c, i) => `
        <tr style="border-bottom: 1px solid #f3f4f6; transition: background-color 0.2s;">
          <td style="padding: 16px 12px; font-weight: 500; color: #6b7280;">${
            i + 1
          }</td>
          <td style="padding: 16px 12px; font-weight: 600; color: #111827;">${
            c.name
          }</td>
          <td style="padding: 16px 12px; font-weight: 500; color: #374151; font-family: monospace; background: #f9fafb; border-radius: 4px;">${
            c.code
          }</td>
          <td style="padding: 16px 12px; color: #6b7280; max-width: 300px; word-wrap: break-word;">${
            c.description
          }</td>
          <td style="padding: 16px 12px; text-align: center;">
            ${
              c.logo
                ? `<img src="http://localhost:4000/${c.logo}" alt="logo" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px; border: 2px solid #e5e7eb;" />`
                : "<span style='color: #9ca3af; font-style: italic;'>N/A</span>"
            }
          </td>
          <td style="padding: 16px 12px; text-align: center;">
            ${
              c.flag
                ? `<img src="http://localhost:4000/${c.flag}" alt="flag" style="width: 50px; height: 35px; object-fit: cover; border-radius: 4px; border: 1px solid #e5e7eb;" />`
                : "<span style='color: #9ca3af; font-style: italic;'>N/A</span>"
            }
          </td>
        </tr>
      `
        )
        .join("");
    }
  }

  // Auto-open Location Directory submenu on country page
  const locationDropdown = document.getElementById("locationDirectoryDropdown");
  const locationChevron = document.getElementById("locationChevron");
  if (locationDropdown && !locationDropdown.classList.contains("open")) {
    locationDropdown.classList.add("open");
    if (locationChevron) {
      locationChevron.style.transform = "rotate(180deg)";
    }
  }

  // Highlight the Country link in the sidebar as active
  const countrySidebarLink = document.querySelector('a[href="country.php"]');
  if (countrySidebarLink) {
    countrySidebarLink.classList.add("active");
    countrySidebarLink.style.background = "#2563eb";
    countrySidebarLink.style.color = "#fff";
    // Remove active from siblings
    const submenuLinks =
      countrySidebarLink.parentElement.parentElement.querySelectorAll("a");
    submenuLinks.forEach((link) => {
      if (link !== countrySidebarLink) {
        link.classList.remove("active");
        link.style.background = "";
        link.style.color = "";
      }
    });
  }

  fetchCountries();
});
