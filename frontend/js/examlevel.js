document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = window.baseUrl || "http://localhost:4000/api";

  const examLevelForm = document.getElementById("examLevelForm");
  const formDiv = document.getElementById("formDiv");
  const listDiv = document.getElementById("listDiv");
  const examLevelTable = document.getElementById("examLevelTable");
  let allExamLevels = [];
  let pagination = null; // Added for pagination

  // Custom render function for exam levels (for pagination)
  function renderExamLevelTable(data, startIndex) {
    if (!examLevelTable) return;

    examLevelTable.innerHTML = data
      .map(
        (level, i) => `
      <tr>
        <td>${startIndex + i + 1}</td>
        <td>${level.name || ""}</td>
        <td class="action-buttons">
          <button class="edit-state-btn" data-id="${
            level._id
          }"><i class="fa fa-edit"></i></button>
          <button class="delete-state-btn" data-id="${
            level._id
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
    if (examLevelTable) {
      // Remove existing listener to prevent duplicates
      examLevelTable.removeEventListener("click", handleTableClick);
      examLevelTable.addEventListener("click", handleTableClick);

      // Also add direct event listeners to buttons for better compatibility
      const editButtons = examLevelTable.querySelectorAll(".edit-state-btn");
      const deleteButtons =
        examLevelTable.querySelectorAll(".delete-state-btn");

      editButtons.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          const id = this.getAttribute("data-id");
          const level = allExamLevels.find((l) => l._id === id);
          if (level) openEditExamLevelModal(level);
        });
      });

      deleteButtons.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          const id = this.getAttribute("data-id");
          if (confirm("Are you sure you want to delete this exam level?")) {
            deleteExamLevel(id);
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
      const level = allExamLevels.find((l) => l._id === id);
      if (level) openEditExamLevelModal(level);
    }

    // Handle delete button clicks - check if clicked on button or icon inside button
    if (target.closest(".delete-state-btn")) {
      const btn = target.closest(".delete-state-btn");
      const id = btn.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this exam level?")) {
        deleteExamLevel(id);
      }
    }
  }

  // Fetch all exam levels
  async function fetchExamLevels() {
    try {
      allExamLevels = await apiRequest(`${baseUrl}/examlevel/all-examlevels`);
      initPaginationForExamLevels(); // Changed from renderExamLevelTable(allExamLevels)
    } catch (err) {
      examLevelTable.innerHTML =
        '<tr><td colspan="3" style="text-align:center; color:#ef4444;">Failed to load data</td></tr>';
    }
  }

  // Initialize pagination for exam levels
  function initPaginationForExamLevels() {
    // Create pagination container if it doesn't exist
    let paginationContainer = document.getElementById("pagination-container");
    if (!paginationContainer) {
      paginationContainer = document.createElement("div");
      paginationContainer.id = "pagination-container";
      paginationContainer.className = "pagination-wrapper";
      // Insert after the table container
      const tableContainer = examLevelTable.closest(".table-container");
      if (tableContainer) {
        tableContainer.parentNode.insertBefore(
          paginationContainer,
          tableContainer.nextSibling
        );
      } else {
        examLevelTable.parentNode.appendChild(paginationContainer);
      }
    }

    // Initialize pagination
    pagination = initPagination({
      container: examLevelTable,
      data: allExamLevels,
      itemsPerPage: 10,
      renderFunction: renderExamLevelTable,
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

  // Add exam level using common form handler
  handleForm(examLevelForm, async (formData) => {
    try {
      const name = formData.get("name");
      if (!name) {
        alert("Please enter level name.");
        return;
      }
      await apiRequest(`${baseUrl}/examlevel/add-examlevel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      alert("Exam Level added!");
      examLevelForm.reset();
      formDiv.style.display = "none";
      listDiv.style.display = "block";
      // Show both buttons
      showFormBtn.style.display = "inline-block";
      showListBtn.style.display = "inline-block";
      fetchExamLevels();
    } catch (error) {
      alert("Failed to submit exam level.");
    }
  });

  // Delete exam level using common API utility
  async function deleteExamLevel(id) {
    try {
      await apiRequest(`${baseUrl}/examlevel/delete-examlevel/${id}`, {
        method: "DELETE",
      });
      alert("Exam Level deleted!");
      fetchExamLevels();
    } catch (error) {
      alert("Failed to delete exam level.");
    }
  }

  // Edit modal logic
  const editExamLevelModal = document.getElementById("editExamLevelModal");
  const closeEditExamLevelModalBtn = document.getElementById(
    "closeEditExamLevelModal"
  );
  const cancelEditExamLevelBtn = document.getElementById(
    "cancelEditExamLevelBtn"
  );
  function openEditExamLevelModal(level) {
    document.getElementById("editExamLevelId").value = level._id;
    document.getElementById("editExamLevelName").value = level.name;
    if (editExamLevelModal) editExamLevelModal.style.display = "flex";
  }
  function closeEditExamLevelModal() {
    if (editExamLevelModal) editExamLevelModal.style.display = "none";
  }
  if (closeEditExamLevelModalBtn)
    closeEditExamLevelModalBtn.onclick = closeEditExamLevelModal;
  if (cancelEditExamLevelBtn)
    cancelEditExamLevelBtn.onclick = closeEditExamLevelModal;
  window.onclick = function (event) {
    if (event.target === editExamLevelModal) closeEditExamLevelModal();
  };

  // Edit form submit using common form handler
  const editExamLevelForm = document.getElementById("editExamLevelForm");
  handleForm(editExamLevelForm, async (formData) => {
    const id = document.getElementById("editExamLevelId").value;
    try {
      const name = formData.get("name");
      if (!name) {
        alert("Please enter level name.");
        return;
      }
      await apiRequest(`${baseUrl}/examlevel/edit-examlevel/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      alert("Exam Level updated!");
      closeEditExamLevelModal();
      fetchExamLevels();
    } catch (error) {
      alert("Failed to update exam level.");
    }
  });

  // Initial population
  fetchExamLevels();
});
