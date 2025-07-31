// Course Duration Management JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Sidebar is automatically initialized by sidebar.js

  // Base URL for API
  const baseUrl = window.baseUrl || "http://localhost:4000/api";

  // DOM elements
  const courseDurationForm = document.getElementById("courseDurationForm");
  const formDiv = document.getElementById("formDiv");
  const listDiv = document.getElementById("listDiv");
  const courseDurationTable = document.getElementById("courseDurationTable");
  const showFormBtn = document.getElementById("showFormBtn");
  const showListBtn = document.getElementById("showListBtn");

  // Data storage
  let allCourseDurations = [];
  let pagination = null;

  // Custom render function for course durations (for pagination)
  function renderCourseDurationTable(data, startIndex) {
    if (!courseDurationTable) return;

    courseDurationTable.innerHTML = data
      .map(
        (duration, i) => `
      <tr>
        <td>${startIndex + i + 1}</td>
        <td>${duration.courseDuration || ""}</td>
        <td class="action-buttons">
          <button class="edit-state-btn" data-id="${
            duration._id
          }"><i class="fa fa-edit"></i></button>
          <button class="delete-state-btn" data-id="${
            duration._id
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
    if (courseDurationTable) {
      // Remove existing listener to prevent duplicates
      courseDurationTable.removeEventListener("click", handleTableClick);
      courseDurationTable.addEventListener("click", handleTableClick);

      // Also add direct event listeners to buttons for better compatibility
      const editButtons =
        courseDurationTable.querySelectorAll(".edit-state-btn");
      const deleteButtons =
        courseDurationTable.querySelectorAll(".delete-state-btn");

      editButtons.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          const id = this.getAttribute("data-id");
          const duration = allCourseDurations.find((d) => d._id === id);
          if (duration) openEditCourseDurationModal(duration);
        });
      });

      deleteButtons.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          const id = this.getAttribute("data-id");
          if (
            confirm("Are you sure you want to delete this course duration?")
          ) {
            deleteCourseDuration(id);
          }
        });
      });
    }
  }

  // Event handler function using event delegation
  function handleTableClick(event) {
    const target = event.target;

    // Handle edit button clicks
    if (target.closest(".edit-state-btn")) {
      const btn = target.closest(".edit-state-btn");
      const id = btn.getAttribute("data-id");
      const duration = allCourseDurations.find((d) => d._id === id);
      if (duration) openEditCourseDurationModal(duration);
    }

    // Handle delete button clicks
    if (target.closest(".delete-state-btn")) {
      const btn = target.closest(".delete-state-btn");
      const id = btn.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this course duration?")) {
        deleteCourseDuration(id);
      }
    }
  }

  // Fetch all course durations
  async function fetchCourseDurations() {
    try {
      allCourseDurations = await apiRequest(
        `${baseUrl}/course-duration/all-course-duration`
      );
      initPaginationForCourseDurations();
    } catch (err) {
      console.error("Error fetching course durations:", err);
      if (courseDurationTable) {
        courseDurationTable.innerHTML =
          '<tr><td colspan="3" style="text-align:center; color:#ef4444;">Failed to load data</td></tr>';
      }
    }
  }

  // Initialize pagination for course durations
  function initPaginationForCourseDurations() {
    // Create pagination container if it doesn't exist
    let paginationContainer = document.getElementById("pagination-container");
    if (!paginationContainer) {
      paginationContainer = document.createElement("div");
      paginationContainer.id = "pagination-container";
      paginationContainer.className = "pagination-wrapper";
      // Insert after the table container
      const tableContainer = courseDurationTable.closest(".table-container");
      if (tableContainer) {
        tableContainer.parentNode.insertBefore(
          paginationContainer,
          tableContainer.nextSibling
        );
      } else {
        courseDurationTable.parentNode.appendChild(paginationContainer);
      }
    }

    // Initialize pagination
    pagination = initPagination({
      container: courseDurationTable,
      data: allCourseDurations,
      itemsPerPage: 10,
      renderFunction: renderCourseDurationTable,
      onPageChange: (currentData, currentPage) => {
        // Re-add event listeners after page change
        setTimeout(() => {
          addEventListeners();
        }, 100);
      },
    });
  }

  // Button toggle functionality
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

  // Add course duration using common form handler
  if (courseDurationForm) {
    handleForm(courseDurationForm, async (formData) => {
      try {
        const courseDuration = formData.get("courseDuration");
        if (!courseDuration) {
          alert("Please enter course duration.");
          return;
        }

        await apiRequest(`${baseUrl}/course-duration/create-course-duration`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseDuration }),
        });

        alert("Course duration added successfully!");
        courseDurationForm.reset();
        formDiv.style.display = "none";
        listDiv.style.display = "block";
        // Show both buttons
        showFormBtn.style.display = "inline-block";
        showListBtn.style.display = "inline-block";

        // Force refresh the data
        await fetchCourseDurations();
      } catch (error) {
        console.error("Error adding course duration:", error);
        alert("Failed to submit course duration: " + error.message);
      }
    });
  }

  // Delete course duration using common API utility
  async function deleteCourseDuration(id) {
    try {
      await apiRequest(
        `${baseUrl}/course-duration/delete-course-duration/${id}`,
        {
          method: "DELETE",
        }
      );
      alert("Course duration deleted successfully!");
      fetchCourseDurations();
    } catch (error) {
      console.error("Error deleting course duration:", error);
      alert("Failed to delete course duration: " + error.message);
    }
  }

  // Edit modal logic
  const editCourseDurationModal = document.getElementById(
    "editCourseDurationModal"
  );
  const closeEditCourseDurationModalBtn = document.getElementById(
    "closeEditCourseDurationModal"
  );
  const cancelEditCourseDurationBtn = document.getElementById(
    "cancelEditCourseDurationBtn"
  );

  function openEditCourseDurationModal(duration) {
    document.getElementById("editCourseDurationId").value = duration._id;
    document.getElementById("editCourseDurationName").value =
      duration.courseDuration;

    editCourseDurationModal.style.display = "flex";
  }

  function closeEditCourseDurationModal() {
    editCourseDurationModal.style.display = "none";
    document.getElementById("editCourseDurationForm").reset();
  }

  // Close modal when clicking on X or Cancel
  if (closeEditCourseDurationModalBtn) {
    closeEditCourseDurationModalBtn.addEventListener(
      "click",
      closeEditCourseDurationModal
    );
  }
  if (cancelEditCourseDurationBtn) {
    cancelEditCourseDurationBtn.addEventListener(
      "click",
      closeEditCourseDurationModal
    );
  }

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === editCourseDurationModal) {
      closeEditCourseDurationModal();
    }
  });

  // Handle edit form submission
  const editCourseDurationForm = document.getElementById(
    "editCourseDurationForm"
  );
  if (editCourseDurationForm) {
    handleForm(editCourseDurationForm, async (formData) => {
      try {
        const id = formData.get("id");
        const courseDuration = formData.get("courseDuration");

        if (!courseDuration) {
          alert("Please enter course duration.");
          return;
        }

        await apiRequest(
          `${baseUrl}/course-duration/update-course-duration/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ courseDuration }),
          }
        );

        alert("Course duration updated successfully!");
        closeEditCourseDurationModal();
        fetchCourseDurations();
      } catch (error) {
        console.error("Error updating course duration:", error);
        alert("Failed to update course duration: " + error.message);
      }
    });
  }

  // Initial fetch
  fetchCourseDurations();
});
