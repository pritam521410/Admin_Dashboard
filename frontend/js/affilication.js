document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = window.baseUrl || "http://localhost:4000/api";
  if (typeof initSidebar === "function") initSidebar();

  const affiliationForm = document.getElementById("affiliationForm");
  const formDiv = document.getElementById("formDiv");
  const listDiv = document.getElementById("listDiv");
  const affiliationTable = document.getElementById("affiliationTable");
  let allAffiliations = [];
  let pagination = null; // Added for pagination

  // Custom render function for affiliations (for pagination)
  function renderAffiliationTable(data, startIndex) {
    if (!affiliationTable) return;

    affiliationTable.innerHTML = data
      .map(
        (a, i) => `
      <tr>
        <td>${startIndex + i + 1}</td>
        <td>${a.affliciationName || ""}</td>
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
    if (affiliationTable) {
      // Remove existing listener to prevent duplicates
      affiliationTable.removeEventListener("click", handleTableClick);
      affiliationTable.addEventListener("click", handleTableClick);

      // Also add direct event listeners to buttons for better compatibility
      const editButtons = affiliationTable.querySelectorAll(".edit-state-btn");
      const deleteButtons =
        affiliationTable.querySelectorAll(".delete-state-btn");

      editButtons.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          const id = this.getAttribute("data-id");
          const affiliation = allAffiliations.find((a) => a._id === id);
          if (affiliation) openEditAffiliationModal(affiliation);
        });
      });

      deleteButtons.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          const id = this.getAttribute("data-id");
          if (confirm("Are you sure you want to delete this affiliation?")) {
            deleteAffiliation(id);
          }
        });
      });
    }
  }

  // Event handler function using event delegation
  function handleTableClick(event) {
    const target = event.target;
    console.log("Table click event:", target);

    // Handle edit button clicks - check if clicked on button or icon inside button
    if (target.closest(".edit-state-btn")) {
      const btn = target.closest(".edit-state-btn");
      const id = btn.getAttribute("data-id");
      console.log("Edit button clicked, ID:", id);
      const affiliation = allAffiliations.find((a) => a._id === id);
      if (affiliation) {
        console.log("Found affiliation:", affiliation);
        openEditAffiliationModal(affiliation);
      } else {
        console.log("Affiliation not found for ID:", id);
      }
    }

    // Handle delete button clicks - check if clicked on button or icon inside button
    if (target.closest(".delete-state-btn")) {
      const btn = target.closest(".delete-state-btn");
      const id = btn.getAttribute("data-id");
      console.log("Delete button clicked, ID:", id);
      if (confirm("Are you sure you want to delete this affiliation?")) {
        deleteAffiliation(id);
      }
    }
  }

  // Fetch all affiliations
  async function fetchAffiliations() {
    try {
      console.log(
        "Fetching affiliations from:",
        `${baseUrl}/affilication/all-affilication`
      );
      allAffiliations = await apiRequest(
        `${baseUrl}/affilication/all-affilication`
      );
      console.log("Fetched affiliations:", allAffiliations);
      initPaginationForAffiliations(); // Changed from renderAffiliationTable(allAffiliations)
    } catch (err) {
      console.error("Fetch error:", err);
      affiliationTable.innerHTML =
        '<tr><td colspan="3" style="text-align:center; color:#ef4444;">Failed to load data</td></tr>';
    }
  }

  // Initialize pagination for affiliations
  function initPaginationForAffiliations() {
    // Create pagination container if it doesn't exist
    let paginationContainer = document.getElementById("pagination-container");
    if (!paginationContainer) {
      paginationContainer = document.createElement("div");
      paginationContainer.id = "pagination-container";
      paginationContainer.className = "pagination-wrapper";
      // Insert after the table container
      const tableContainer = affiliationTable.closest(".table-container");
      if (tableContainer) {
        tableContainer.parentNode.insertBefore(
          paginationContainer,
          tableContainer.nextSibling
        );
      } else {
        affiliationTable.parentNode.appendChild(paginationContainer);
      }
    }

    // Initialize pagination
    pagination = initPagination({
      container: affiliationTable,
      data: allAffiliations,
      itemsPerPage: 10,
      renderFunction: renderAffiliationTable,
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

  // Add affiliation using common form handler
  handleForm(affiliationForm, async (formData) => {
    try {
      const affliciationName = formData.get("affliciationName");
      await apiRequest(`${baseUrl}/affilication/add-affilication`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ affliciationName }),
      });
      alert("Affiliation added!");
      affiliationForm.reset();
      formDiv.style.display = "none";
      listDiv.style.display = "block";
      // Show both buttons
      showFormBtn.style.display = "inline-block";
      showListBtn.style.display = "inline-block";
      fetchAffiliations();
    } catch (error) {
      alert("Failed to submit affiliation.");
    }
  });

  // Delete affiliation using common API utility
  async function deleteAffiliation(id) {
    try {
      console.log("Deleting affiliation with ID:", id);
      const result = await apiRequest(
        `${baseUrl}/affilication/delete-affilication/${id}`,
        {
          method: "DELETE",
        }
      );
      console.log("Delete result:", result);
      alert("Affiliation deleted!");
      fetchAffiliations();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete affiliation: " + error.message);
    }
  }

  // Edit modal logic
  const editAffiliationModal = document.getElementById("editAffiliationModal");
  const closeEditAffiliationModalBtn = document.getElementById(
    "closeEditAffiliationModal"
  );
  const cancelEditAffiliationBtn = document.getElementById(
    "cancelEditAffiliationBtn"
  );
  function openEditAffiliationModal(affiliation) {
    console.log("Opening edit modal for affiliation:", affiliation);
    document.getElementById("editAffiliationId").value = affiliation._id;
    document.getElementById("editAffiliationName").value =
      affiliation.affliciationName;
    if (editAffiliationModal) editAffiliationModal.style.display = "flex";
  }
  function closeEditAffiliationModal() {
    if (editAffiliationModal) editAffiliationModal.style.display = "none";
  }
  if (closeEditAffiliationModalBtn)
    closeEditAffiliationModalBtn.onclick = closeEditAffiliationModal;
  if (cancelEditAffiliationBtn)
    cancelEditAffiliationBtn.onclick = closeEditAffiliationModal;
  window.onclick = function (event) {
    if (event.target === editAffiliationModal) closeEditAffiliationModal();
  };

  // Edit form submit using common form handler
  const editAffiliationForm = document.getElementById("editAffiliationForm");
  handleForm(editAffiliationForm, async (formData) => {
    const id = document.getElementById("editAffiliationId").value;
    try {
      const affliciationName = formData.get("affliciationName");
      console.log(
        "Updating affiliation with ID:",
        id,
        "Name:",
        affliciationName
      );
      const result = await apiRequest(
        `${baseUrl}/affilication/update-affilication/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ affliciationName }),
        }
      );
      console.log("Update result:", result);
      alert("Affiliation updated!");
      closeEditAffiliationModal();
      fetchAffiliations();
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update affiliation: " + error.message);
    }
  });

  // Initial population
  fetchAffiliations();
});
