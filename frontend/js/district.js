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
        <td style="text-align:center;">
          <button class="edit-district-btn" data-id="${
            d._id
          }" style="background:#fbbf24; color:#fff; border:none; border-radius:6px; padding:6px 14px; margin-right:6px; cursor:pointer; font-size:0.95rem;"><i class="fa fa-edit"></i> Edit</button>
          <button class="delete-district-btn" data-id="${
            d._id
          }" style="background:#ef4444; color:#fff; border:none; border-radius:6px; padding:6px 14px; cursor:pointer; font-size:0.95rem;"><i class="fa fa-trash"></i> Delete</button>
        </td>
      </tr>`
      )
      .join("");
    // Add event listeners for edit and delete buttons
    document.querySelectorAll(".edit-district-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        fetchDistrictById(id);
      });
    });
    document.querySelectorAll(".delete-district-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this district?")) {
          deleteDistrict(id);
        }
      });
    });
  }

  // Fetch district by ID for editing
  async function fetchDistrictById(id) {
    try {
      const res = await fetch(
        `http://localhost:4000/api/district/all-districts`
      );
      const data = await res.json();
      const district = data.find((d) => d._id === id);
      if (district) openEditDistrictModal(district);
    } catch (err) {
      alert("Failed to fetch district.");
    }
  }

  // Modal logic
  const editDistrictModal = document.getElementById("editDistrictModal");
  const closeEditDistrictModalBtn = document.getElementById(
    "closeEditDistrictModal"
  );
  const cancelEditDistrictBtn = document.getElementById(
    "cancelEditDistrictBtn"
  );
  function openEditDistrictModal(district) {
    document.getElementById("editDistrictId").value = district._id;
    document.getElementById("editDistrictName").value = district.districtName;
    // Populate country dropdown
    const countrySelect = document.getElementById("editDistrictCountry");
    fetch("http://localhost:4000/api/country/all-countries")
      .then((res) => res.json())
      .then((countries) => {
        countrySelect.innerHTML = "";
        countries.forEach((country) => {
          const option = document.createElement("option");
          option.value = country._id;
          option.textContent = country.name;
          if (
            district.country &&
            country._id === (district.country._id || district.country)
          ) {
            option.selected = true;
          }
          countrySelect.appendChild(option);
        });
        // Populate state dropdown after country
        populateEditDistrictStateDropdown(
          district.country?._id || district.country,
          district.state?._id || district.state
        );
      });
    if (editDistrictModal) editDistrictModal.style.display = "flex";
  }
  function closeEditDistrictModal() {
    if (editDistrictModal) editDistrictModal.style.display = "none";
  }
  if (closeEditDistrictModalBtn)
    closeEditDistrictModalBtn.onclick = closeEditDistrictModal;
  if (cancelEditDistrictBtn)
    cancelEditDistrictBtn.onclick = closeEditDistrictModal;
  window.onclick = function (event) {
    if (event.target === editDistrictModal) closeEditDistrictModal();
  };

  // Populate state dropdown for edit modal
  function populateEditDistrictStateDropdown(countryId, selectedStateId) {
    const stateSelect = document.getElementById("editDistrictState");
    fetch("http://localhost:4000/api/state/all-states")
      .then((res) => res.json())
      .then((states) => {
        stateSelect.innerHTML = "";
        states
          .filter(
            (s) => s.country && (s.country._id || s.country) === countryId
          )
          .forEach((state) => {
            const option = document.createElement("option");
            option.value = state._id;
            option.textContent = state.name;
            if (state._id === selectedStateId) option.selected = true;
            stateSelect.appendChild(option);
          });
      });
  }
  // On country change in edit modal, update state dropdown
  document
    .getElementById("editDistrictCountry")
    .addEventListener("change", function () {
      populateEditDistrictStateDropdown(this.value, null);
    });

  // Edit form submit
  const editDistrictForm = document.getElementById("editDistrictForm");
  if (editDistrictForm) {
    editDistrictForm.onsubmit = async function (e) {
      e.preventDefault();
      const id = document.getElementById("editDistrictId").value;
      const formData = new FormData(editDistrictForm);
      try {
        const response = await fetch(
          `http://localhost:4000/api/district/edit-district/${id}`,
          {
            method: "PUT",
            body: formData,
          }
        );
        const result = await response.json();
        alert(result.message || "District updated!");
        closeEditDistrictModal();
        fetchAndRenderDistricts();
      } catch (error) {
        alert("Failed to update district.");
      }
    };
  }

  // Delete district
  async function deleteDistrict(id) {
    try {
      const response = await fetch(
        `http://localhost:4000/api/district/delete-district/${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      alert(result.message || "District deleted!");
      fetchAndRenderDistricts();
    } catch (error) {
      alert("Failed to delete district.");
    }
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
