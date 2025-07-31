document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = window.baseUrl || "http://localhost:4000/api";

  const collegeFacilityForm = document.getElementById("collegeFacilityForm");
  const formDiv = document.getElementById("formDiv");
  const listDiv = document.getElementById("listDiv");
  const collegeFacilityTable = document.getElementById("collegeFacilityTable");
  let allCollegeFacilities = [];
  let pagination = null; // Added for pagination

  // Custom render function for college facilities (for pagination)
  function renderCollegeFacilityTable(data, startIndex) {
    if (!collegeFacilityTable) return;

    collegeFacilityTable.innerHTML = data
      .map(
        (f, i) => `
      <tr>
        <td>${startIndex + i + 1}</td>
        <td>${f.name || ""}</td>
        <td class="image-cell">
          ${
            f.logo
              ? `<img src="http://localhost:4000/${f.logo}" alt="facility logo" class="facility-logo" style="width: 50px; height: 50px; object-fit: cover;" />`
              : "<span class='no-image'>N/A</span>"
          }
        </td>
        <td class="action-buttons">
          <button class="edit-state-btn" data-id="${
            f._id
          }"><i class="fa fa-edit"></i></button>
          <button class="delete-state-btn" data-id="${
            f._id
          }"><i class="fa fa-trash"></i></button>
        </td>
      </tr>
    `
      )
      .join("");

    // Add event listeners for edit and delete buttons
    addEventListeners();
  }

  // Add event listeners for edit and delete buttons (separate function)
  function addEventListeners() {
    // Use event delegation for better reliability
    if (collegeFacilityTable) {
      // Remove existing listener to prevent duplicates
      collegeFacilityTable.removeEventListener("click", handleTableClick);
      collegeFacilityTable.addEventListener("click", handleTableClick);

      // Also add direct event listeners to buttons for better compatibility
      const editButtons =
        collegeFacilityTable.querySelectorAll(".edit-state-btn");
      const deleteButtons =
        collegeFacilityTable.querySelectorAll(".delete-state-btn");

      editButtons.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          const id = this.getAttribute("data-id");
          const facility = allCollegeFacilities.find((f) => f._id === id);
          if (facility) openEditCollegeFacilityModal(facility);
        });
      });

      deleteButtons.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          const id = this.getAttribute("data-id");
          if (confirm("Are you sure you want to delete this facility?")) {
            deleteCollegeFacility(id);
          }
        });
      });
    }
  }

  // Event handler function using event delegation
  function handleTableClick(event) {
    const target = event.target;

    // Handle edit button clicks - check if clicked on button or icon inside button
    if (target.closest(".edit-state-btn")) {
      const btn = target.closest(".edit-state-btn");
      const id = btn.getAttribute("data-id");
      const facility = allCollegeFacilities.find((f) => f._id === id);
      if (facility) openEditCollegeFacilityModal(facility);
    }

    // Handle delete button clicks - check if clicked on button or icon inside button
    if (target.closest(".delete-state-btn")) {
      const btn = target.closest(".delete-state-btn");
      const id = btn.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this facility?")) {
        deleteCollegeFacility(id);
      }
    }
  }

  // Fetch all college facilities
  async function fetchCollegeFacilities() {
    try {
      allCollegeFacilities = await apiRequest(
        `${baseUrl}/college-facility/all-college-facility`
      );
      initPaginationForCollegeFacilities(); // Changed from renderCollegeFacilityTable(allCollegeFacilities)
    } catch (err) {
      collegeFacilityTable.innerHTML =
        '<tr><td colspan="4" style="text-align:center; color:#ef4444;">Failed to load data</td></tr>';
    }
  }

  // Initialize pagination for college facilities
  function initPaginationForCollegeFacilities() {
    // Create pagination container if it doesn't exist
    let paginationContainer = document.getElementById("pagination-container");
    if (!paginationContainer) {
      paginationContainer = document.createElement("div");
      paginationContainer.id = "pagination-container";
      paginationContainer.className = "pagination-wrapper";
      // Insert after the table container
      const tableContainer = collegeFacilityTable.closest(".table-container");
      if (tableContainer) {
        tableContainer.parentNode.insertBefore(
          paginationContainer,
          tableContainer.nextSibling
        );
      } else {
        collegeFacilityTable.parentNode.appendChild(paginationContainer);
      }
    }

    // Initialize pagination
    pagination = initPagination({
      container: collegeFacilityTable,
      data: allCollegeFacilities,
      itemsPerPage: 10,
      renderFunction: renderCollegeFacilityTable,
      onPageChange: (currentData, currentPage) => {
        // Re-add event listeners after page change
        setTimeout(() => {
          addEventListeners();
        }, 100);
      },
    });
  }

  // Show/hide form and list with button toggle
  const showFormBtn = document.getElementById("showFormBtn");
  const showListBtn = document.getElementById("showListBtn");
  if (showFormBtn && showListBtn && formDiv && listDiv) {
    showFormBtn.addEventListener("click", function () {
      formDiv.style.display = "block";
      listDiv.style.display = "none";
      // Show both buttons
      showFormBtn.style.display = "inline-block";
      showListBtn.style.display = "inline-block";
    });
    showListBtn.addEventListener("click", function () {
      formDiv.style.display = "none";
      listDiv.style.display = "block";
      // Show both buttons
      showFormBtn.style.display = "inline-block";
      showListBtn.style.display = "inline-block";
    });
  }

  // Add college facility using common form handler
  handleForm(collegeFacilityForm, async (formData) => {
    try {
      const name = formData.get("name");
      if (!name) {
        alert("Please enter facility name.");
        return;
      }
      await apiRequest(`${baseUrl}/college-facility/add-college-facility`, {
        method: "POST",
        body: formData,
      });
      alert("College Facility added!");
      collegeFacilityForm.reset();
      formDiv.style.display = "none";
      listDiv.style.display = "block";
      // Show both buttons
      showFormBtn.style.display = "inline-block";
      showListBtn.style.display = "inline-block";
      fetchCollegeFacilities();
    } catch (error) {
      alert("Failed to submit college facility.");
    }
  });

  // Delete college facility using common API utility
  async function deleteCollegeFacility(id) {
    try {
      await apiRequest(
        `${baseUrl}/college-facility/delete-college-facility/${id}`,
        {
          method: "DELETE",
        }
      );
      alert("College Facility deleted!");
      fetchCollegeFacilities();
    } catch (error) {
      alert("Failed to delete college facility.");
    }
  }

  // Edit modal logic
  const editCollegeFacilityModal = document.getElementById(
    "editCollegeFacilityModal"
  );
  const closeEditCollegeFacilityModalBtn = document.getElementById(
    "closeEditCollegeFacilityModal"
  );
  const cancelEditCollegeFacilityBtn = document.getElementById(
    "cancelEditCollegeFacilityBtn"
  );
  function openEditCollegeFacilityModal(facility) {
    document.getElementById("editCollegeFacilityId").value = facility._id;
    document.getElementById("editCollegeFacilityName").value = facility.name;
    if (editCollegeFacilityModal)
      editCollegeFacilityModal.style.display = "flex";
  }
  function closeEditCollegeFacilityModal() {
    if (editCollegeFacilityModal)
      editCollegeFacilityModal.style.display = "none";
  }
  if (closeEditCollegeFacilityModalBtn)
    closeEditCollegeFacilityModalBtn.onclick = closeEditCollegeFacilityModal;
  if (cancelEditCollegeFacilityBtn)
    cancelEditCollegeFacilityBtn.onclick = closeEditCollegeFacilityModal;
  window.onclick = function (event) {
    if (event.target === editCollegeFacilityModal)
      closeEditCollegeFacilityModal();
  };

  // Edit form submit using common form handler
  const editCollegeFacilityForm = document.getElementById(
    "editCollegeFacilityForm"
  );
  handleForm(editCollegeFacilityForm, async (formData) => {
    const id = document.getElementById("editCollegeFacilityId").value;
    try {
      const name = formData.get("name");
      if (!name) {
        alert("Please enter facility name.");
        return;
      }
      await apiRequest(
        `${baseUrl}/college-facility/update-college-facility/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      alert("College Facility updated!");
      closeEditCollegeFacilityModal();
      fetchCollegeFacilities();
    } catch (error) {
      alert("Failed to update college facility.");
    }
  });

  // Initial population
  fetchCollegeFacilities();
});
