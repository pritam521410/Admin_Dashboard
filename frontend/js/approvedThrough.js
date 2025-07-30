document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = window.baseUrl || "http://localhost:4000/api";
  if (typeof initSidebar === "function") initSidebar();

  const approvedThroughForm = document.getElementById("approvedThroughForm");
  const formDiv = document.getElementById("formDiv");
  const listDiv = document.getElementById("listDiv");
  const approvedThroughTable = document.getElementById("approvedThroughTable");
  let allApprovedThrough = [];
  let pagination = null; // Added for pagination

  // Custom render function for approved through (for pagination)
  function renderApprovedThroughTable(data, startIndex) {
    if (!approvedThroughTable) return;

    approvedThroughTable.innerHTML = data
      .map(
        (a, i) => `
      <tr>
        <td>${startIndex + i + 1}</td>
        <td>${a.approvesThroughName || ""}</td>
        <td class="action-buttons">
          <button class="edit-state-btn" data-id="${
            a._id
          }"><i class="fa fa-edit"></i></button>
          <button class="delete-state-btn" data-id="${
            a._id
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
    if (approvedThroughTable) {
      // Remove existing listener to prevent duplicates
      approvedThroughTable.removeEventListener("click", handleTableClick);
      approvedThroughTable.addEventListener("click", handleTableClick);

      // Also add direct event listeners to buttons for better compatibility
      const editButtons =
        approvedThroughTable.querySelectorAll(".edit-state-btn");
      const deleteButtons =
        approvedThroughTable.querySelectorAll(".delete-state-btn");

      editButtons.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          const id = this.getAttribute("data-id");
          const approvedThrough = allApprovedThrough.find((a) => a._id === id);
          if (approvedThrough) openEditApprovedThroughModal(approvedThrough);
        });
      });

      deleteButtons.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          const id = this.getAttribute("data-id");
          if (
            confirm("Are you sure you want to delete this approved through?")
          ) {
            deleteApprovedThrough(id);
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
      const approvedThrough = allApprovedThrough.find((a) => a._id === id);
      if (approvedThrough) openEditApprovedThroughModal(approvedThrough);
    }

    // Handle delete button clicks - check if clicked on button or icon inside button
    if (target.closest(".delete-state-btn")) {
      const btn = target.closest(".delete-state-btn");
      const id = btn.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this approved through?")) {
        deleteApprovedThrough(id);
      }
    }
  }

  // Fetch all approved through
  async function fetchApprovedThrough() {
    try {
      allApprovedThrough = await apiRequest(
        `${baseUrl}/approved-through/all-approved-through`
      );
      initPaginationForApprovedThrough(); // Changed from renderApprovedThroughTable(allApprovedThrough)
    } catch (err) {
      approvedThroughTable.innerHTML =
        '<tr><td colspan="3" style="text-align:center; color:#ef4444;">Failed to load data</td></tr>';
    }
  }

  // Initialize pagination for approved through
  function initPaginationForApprovedThrough() {
    // Create pagination container if it doesn't exist
    let paginationContainer = document.getElementById("pagination-container");
    if (!paginationContainer) {
      paginationContainer = document.createElement("div");
      paginationContainer.id = "pagination-container";
      paginationContainer.className = "pagination-wrapper";
      // Insert after the table container
      const tableContainer = approvedThroughTable.closest(".table-container");
      if (tableContainer) {
        tableContainer.parentNode.insertBefore(
          paginationContainer,
          tableContainer.nextSibling
        );
      } else {
        approvedThroughTable.parentNode.appendChild(paginationContainer);
      }
    }

    // Initialize pagination
    pagination = initPagination({
      container: approvedThroughTable,
      data: allApprovedThrough,
      itemsPerPage: 10,
      renderFunction: renderApprovedThroughTable,
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

  // Add approved through using common form handler
  handleForm(approvedThroughForm, async (formData) => {
    try {
      const approvesThroughName = formData.get("approvesThroughName");
      await apiRequest(`${baseUrl}/approved-through/add-approved-through`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ approvesThroughName }),
      });
      alert("Approved Through added!");
      approvedThroughForm.reset();
      formDiv.style.display = "none";
      listDiv.style.display = "block";
      // Show both buttons
      showFormBtn.style.display = "inline-block";
      showListBtn.style.display = "inline-block";
      fetchApprovedThrough();
    } catch (error) {
      alert("Failed to submit approved through.");
    }
  });

  // Delete approved through using common API utility
  async function deleteApprovedThrough(id) {
    try {
      await apiRequest(
        `${baseUrl}/approved-through/delete-approved-through/${id}`,
        {
          method: "DELETE",
        }
      );
      alert("Approved Through deleted!");
      fetchApprovedThrough();
    } catch (error) {
      alert("Failed to delete approved through.");
    }
  }

  // Edit modal logic
  const editApprovedThroughModal = document.getElementById(
    "editApprovedThroughModal"
  );
  const closeEditApprovedThroughModalBtn = document.getElementById(
    "closeEditApprovedThroughModal"
  );
  const cancelEditApprovedThroughBtn = document.getElementById(
    "cancelEditApprovedThroughBtn"
  );
  function openEditApprovedThroughModal(approvedThrough) {
    document.getElementById("editApprovedThroughId").value =
      approvedThrough._id;
    document.getElementById("editApprovedThroughName").value =
      approvedThrough.approvesThroughName;
    if (editApprovedThroughModal)
      editApprovedThroughModal.style.display = "flex";
  }
  function closeEditApprovedThroughModal() {
    if (editApprovedThroughModal)
      editApprovedThroughModal.style.display = "none";
  }
  if (closeEditApprovedThroughModalBtn)
    closeEditApprovedThroughModalBtn.onclick = closeEditApprovedThroughModal;
  if (cancelEditApprovedThroughBtn)
    cancelEditApprovedThroughBtn.onclick = closeEditApprovedThroughModal;
  window.onclick = function (event) {
    if (event.target === editApprovedThroughModal)
      closeEditApprovedThroughModal();
  };

  // Edit form submit using common form handler
  const editApprovedThroughForm = document.getElementById(
    "editApprovedThroughForm"
  );
  handleForm(editApprovedThroughForm, async (formData) => {
    const id = document.getElementById("editApprovedThroughId").value;
    try {
      const approvesThroughName = formData.get("approvesThroughName");
      await apiRequest(
        `${baseUrl}/approved-through/update-approved-through/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ approvesThroughName }),
        }
      );
      alert("Approved Through updated!");
      closeEditApprovedThroughModal();
      fetchApprovedThrough();
    } catch (error) {
      alert("Failed to update approved through.");
    }
  });

  // Initial population
  fetchApprovedThrough();
});
