document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = window.baseUrl || "http://localhost:4000/api";
  if (typeof initSidebar === "function") initSidebar();

  const ownershipForm = document.getElementById("ownershipForm");
  const formDiv = document.getElementById("formDiv");
  const listDiv = document.getElementById("listDiv");
  const ownershipTable = document.getElementById("ownershipTable");
  let allOwnerships = [];
  let pagination = null; // Added for pagination

  // Custom render function for ownerships (for pagination)
  function renderOwnershipTable(data, startIndex) {
    if (!ownershipTable) return;

    ownershipTable.innerHTML = data
      .map(
        (o, i) => `
      <tr>
        <td>${startIndex + i + 1}</td>
        <td>${o.name || ""}</td>
        <td class="action-buttons">
          <button class="edit-state-btn" data-id="${
            o._id
          }"><i class="fa fa-edit"></i></button>
          <button class="delete-state-btn" data-id="${
            o._id
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
    if (ownershipTable) {
      // Remove existing listener to prevent duplicates
      ownershipTable.removeEventListener("click", handleTableClick);
      ownershipTable.addEventListener("click", handleTableClick);

      // Also add direct event listeners to buttons for better compatibility
      const editButtons = ownershipTable.querySelectorAll(".edit-state-btn");
      const deleteButtons =
        ownershipTable.querySelectorAll(".delete-state-btn");

      editButtons.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          const id = this.getAttribute("data-id");
          const ownership = allOwnerships.find((o) => o._id === id);
          if (ownership) openEditOwnershipModal(ownership);
        });
      });

      deleteButtons.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          const id = this.getAttribute("data-id");
          if (confirm("Are you sure you want to delete this ownership?")) {
            deleteOwnership(id);
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
      const ownership = allOwnerships.find((o) => o._id === id);
      if (ownership) openEditOwnershipModal(ownership);
    }

    // Handle delete button clicks - check if clicked on button or icon inside button
    if (target.closest(".delete-state-btn")) {
      const btn = target.closest(".delete-state-btn");
      const id = btn.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this ownership?")) {
        deleteOwnership(id);
      }
    }
  }

  // Fetch all ownerships
  async function fetchOwnerships() {
    try {
      allOwnerships = await apiRequest(`${baseUrl}/ownership/all-ownership`);
      initPaginationForOwnerships(); // Changed from renderOwnershipTable(allOwnerships)
    } catch (err) {
      ownershipTable.innerHTML =
        '<tr><td colspan="3" style="text-align:center; color:#ef4444;">Failed to load data</td></tr>';
    }
  }

  // Initialize pagination for ownerships
  function initPaginationForOwnerships() {
    // Create pagination container if it doesn't exist
    let paginationContainer = document.getElementById("pagination-container");
    if (!paginationContainer) {
      paginationContainer = document.createElement("div");
      paginationContainer.id = "pagination-container";
      paginationContainer.className = "pagination-wrapper";
      // Insert after the table container
      const tableContainer = ownershipTable.closest(".table-container");
      if (tableContainer) {
        tableContainer.parentNode.insertBefore(
          paginationContainer,
          tableContainer.nextSibling
        );
      } else {
        ownershipTable.parentNode.appendChild(paginationContainer);
      }
    }

    // Initialize pagination
    pagination = initPagination({
      container: ownershipTable,
      data: allOwnerships,
      itemsPerPage: 10,
      renderFunction: renderOwnershipTable,
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

  // Add ownership using common form handler
  handleForm(ownershipForm, async (formData) => {
    try {
      const name = formData.get("name");
      if (!name) {
        alert("Please enter ownership name.");
        return;
      }
      await apiRequest(`${baseUrl}/ownership/create-ownership`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      alert("Ownership added!");
      ownershipForm.reset();
      formDiv.style.display = "none";
      listDiv.style.display = "block";
      // Show both buttons
      showFormBtn.style.display = "inline-block";
      showListBtn.style.display = "inline-block";
      fetchOwnerships();
    } catch (error) {
      alert("Failed to submit ownership.");
    }
  });

  // Delete ownership using common API utility
  async function deleteOwnership(id) {
    try {
      await apiRequest(`${baseUrl}/ownership/delete-ownership/${id}`, {
        method: "DELETE",
      });
      alert("Ownership deleted!");
      fetchOwnerships();
    } catch (error) {
      alert("Failed to delete ownership.");
    }
  }

  // Edit modal logic
  const editOwnershipModal = document.getElementById("editOwnershipModal");
  const closeEditOwnershipModalBtn = document.getElementById(
    "closeEditOwnershipModal"
  );
  const cancelEditOwnershipBtn = document.getElementById(
    "cancelEditOwnershipBtn"
  );
  function openEditOwnershipModal(ownership) {
    document.getElementById("editOwnershipId").value = ownership._id;
    document.getElementById("editOwnershipName").value = ownership.name;
    if (editOwnershipModal) editOwnershipModal.style.display = "flex";
  }
  function closeEditOwnershipModal() {
    if (editOwnershipModal) editOwnershipModal.style.display = "none";
  }
  if (closeEditOwnershipModalBtn)
    closeEditOwnershipModalBtn.onclick = closeEditOwnershipModal;
  if (cancelEditOwnershipBtn)
    cancelEditOwnershipBtn.onclick = closeEditOwnershipModal;
  window.onclick = function (event) {
    if (event.target === editOwnershipModal) closeEditOwnershipModal();
  };

  // Edit form submit using common form handler
  const editOwnershipForm = document.getElementById("editOwnershipForm");
  handleForm(editOwnershipForm, async (formData) => {
    const id = document.getElementById("editOwnershipId").value;
    try {
      const name = formData.get("name");
      if (!name) {
        alert("Please enter ownership name.");
        return;
      }
      await apiRequest(`${baseUrl}/ownership/update-ownership/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      alert("Ownership updated!");
      closeEditOwnershipModal();
      fetchOwnerships();
    } catch (error) {
      alert("Failed to update ownership.");
    }
  });

  // Initial population
  fetchOwnerships();
});
