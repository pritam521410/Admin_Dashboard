document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = window.baseUrl || "http://localhost:4000/api";
  if (typeof initSidebar === "function") initSidebar();

  const examTypeForm = document.getElementById("examTypeForm");
  const formDiv = document.getElementById("formDiv");
  const listDiv = document.getElementById("listDiv");
  const examTypeTable = document.getElementById("examTypeTable");
  let allExamTypes = [];
  let pagination = null; // Added for pagination

  // Custom render function for exam types (for pagination)
  function renderExamTypeTable(data, startIndex) {
    if (!examTypeTable) return;

    examTypeTable.innerHTML = data
      .map((e, i) => {
        let shortName = "";
        let fullName = "";
        if (typeof e.examTypeName === "object" && e.examTypeName !== null) {
          shortName = e.examTypeName.shortName || "";
          fullName = e.examTypeName.fullName || "";
        } else if (typeof e.examTypeName === "string") {
          // fallback for old data
          fullName = e.examTypeName;
        }

        return `
            <tr>
              <td>${startIndex + i + 1}</td>
              <td><b>${shortName}</b>${
          shortName && fullName ? " - " : ""
        }${fullName}</td>
              <td class="action-buttons">
                <button class="edit-state-btn" data-id="${
                  e._id
                }"><i class="fa fa-edit"></i></button>
                <button class="delete-state-btn" data-id="${
                  e._id
                }"><i class="fa fa-trash"></i></button>
              </td>
            </tr>
          `;
      })
      .join("");

    // Add event listeners for edit and delete buttons
    addEventListeners();
  }

  // Add event listeners for edit and delete buttons (separate function)
  function addEventListeners() {
    // Use event delegation for better reliability
    if (examTypeTable) {
      // Remove existing listener to prevent duplicates
      examTypeTable.removeEventListener("click", handleTableClick);
      examTypeTable.addEventListener("click", handleTableClick);

      // Also add direct event listeners to buttons for better compatibility
      const editButtons = examTypeTable.querySelectorAll(".edit-state-btn");
      const deleteButtons = examTypeTable.querySelectorAll(".delete-state-btn");

      editButtons.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          const id = this.getAttribute("data-id");
          const examType = allExamTypes.find((e) => e._id === id);
          if (examType) openEditExamTypeModal(examType);
        });
      });

      deleteButtons.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          const id = this.getAttribute("data-id");
          if (confirm("Are you sure you want to delete this exam type?")) {
            deleteExamType(id);
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
      const examType = allExamTypes.find((e) => e._id === id);
      if (examType) openEditExamTypeModal(examType);
    }

    // Handle delete button clicks - check if clicked on button or icon inside button
    if (target.closest(".delete-state-btn")) {
      const btn = target.closest(".delete-state-btn");
      const id = btn.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this exam type?")) {
        deleteExamType(id);
      }
    }
  }

  // Fetch all exam types
  async function fetchExamTypes() {
    try {
      allExamTypes = await apiRequest(`${baseUrl}/exam-type/all-exam-type`);
      initPaginationForExamTypes(); // Changed from renderExamTypeTable(allExamTypes)
    } catch (err) {
      examTypeTable.innerHTML =
        '<tr><td colspan="3" style="text-align:center; color:#ef4444;">Failed to load data</td></tr>';
    }
  }

  // Initialize pagination for exam types
  function initPaginationForExamTypes() {
    // Create pagination container if it doesn't exist
    let paginationContainer = document.getElementById("pagination-container");
    if (!paginationContainer) {
      paginationContainer = document.createElement("div");
      paginationContainer.id = "pagination-container";
      paginationContainer.className = "pagination-wrapper";
      // Insert after the table container
      const tableContainer = examTypeTable.closest(".table-container");
      if (tableContainer) {
        tableContainer.parentNode.insertBefore(
          paginationContainer,
          tableContainer.nextSibling
        );
      } else {
        examTypeTable.parentNode.appendChild(paginationContainer);
      }
    }

    // Initialize pagination
    pagination = initPagination({
      container: examTypeTable,
      data: allExamTypes,
      itemsPerPage: 10,
      renderFunction: renderExamTypeTable,
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

  // Add exam type using common form handler
  handleForm(examTypeForm, async (formData) => {
    try {
      const shortName = formData.get("shortName");
      const fullName = formData.get("fullName");
      if (!shortName && !fullName) {
        alert("Please enter at least one name.");
        return;
      }
      await apiRequest(`${baseUrl}/exam-type/add-exam-type`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shortName, fullName }),
      });
      alert("Exam Type added!");
      examTypeForm.reset();
      formDiv.style.display = "none";
      listDiv.style.display = "block";
      // Show both buttons
      showFormBtn.style.display = "inline-block";
      showListBtn.style.display = "inline-block";
      fetchExamTypes();
    } catch (error) {
      alert("Failed to submit exam type.");
    }
  });

  // Delete exam type using common API utility
  async function deleteExamType(id) {
    try {
      await apiRequest(`${baseUrl}/exam-type/delete-exam-type/${id}`, {
        method: "DELETE",
      });
      alert("Exam Type deleted!");
      fetchExamTypes();
    } catch (error) {
      alert("Failed to delete exam type.");
    }
  }

  // Edit modal logic
  const editExamTypeModal = document.getElementById("editExamTypeModal");
  const closeEditExamTypeModalBtn = document.getElementById(
    "closeEditExamTypeModal"
  );
  const cancelEditExamTypeBtn = document.getElementById(
    "cancelEditExamTypeBtn"
  );
  function openEditExamTypeModal(examType) {
    document.getElementById("editExamTypeId").value = examType._id;

    let shortName = "";
    let fullName = "";
    if (
      typeof examType.examTypeName === "object" &&
      examType.examTypeName !== null
    ) {
      shortName = examType.examTypeName.shortName || "";
      fullName = examType.examTypeName.fullName || "";
    } else if (typeof examType.examTypeName === "string") {
      // fallback for old data
      fullName = examType.examTypeName;
    }

    document.getElementById("editExamTypeShortName").value = shortName;
    document.getElementById("editExamTypeFullName").value = fullName;
    if (editExamTypeModal) editExamTypeModal.style.display = "flex";
  }
  function closeEditExamTypeModal() {
    if (editExamTypeModal) editExamTypeModal.style.display = "none";
  }
  if (closeEditExamTypeModalBtn)
    closeEditExamTypeModalBtn.onclick = closeEditExamTypeModal;
  if (cancelEditExamTypeBtn)
    cancelEditExamTypeBtn.onclick = closeEditExamTypeModal;
  window.onclick = function (event) {
    if (event.target === editExamTypeModal) closeEditExamTypeModal();
  };

  // Edit form submit using common form handler
  const editExamTypeForm = document.getElementById("editExamTypeForm");
  handleForm(editExamTypeForm, async (formData) => {
    const id = document.getElementById("editExamTypeId").value;
    try {
      const shortName = formData.get("shortName");
      const fullName = formData.get("fullName");
      if (!shortName && !fullName) {
        alert("Please enter at least one name.");
        return;
      }
      await apiRequest(`${baseUrl}/exam-type/update-exam-type/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ examTypeName: { shortName, fullName } }),
      });
      alert("Exam Type updated!");
      closeEditExamTypeModal();
      fetchExamTypes();
    } catch (error) {
      alert("Failed to update exam type.");
    }
  });

  // Initial population
  fetchExamTypes();
});
