document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = window.baseUrl || "http://localhost:4000/api";
  if (typeof initSidebar === "function") initSidebar();

  const courseForm = document.getElementById("courseForm");
  const formDiv = document.getElementById("formDiv");
  const listDiv = document.getElementById("listDiv");
  const courseTable = document.getElementById("courseTable");
  let allCourses = [];
  let pagination = null; // Added for pagination

  // Helper function to populate dropdowns
  async function populateDropdown(url, selectId, valueKey, textKey) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(`populateDropdown for #${selectId} got:`, data);
      const select = document.getElementById(selectId);
      select.innerHTML = '<option value="">-- Select --</option>'; // Reset options

      let items = [];
      // Handle different API response structures
      if (data.success && Array.isArray(data.data)) {
        items = data.data; // For streams
      } else if (Array.isArray(data.degrees)) {
        items = data.degrees; // For degrees
      } else if (Array.isArray(data)) {
        items = data; // Direct array
      } else if (data.streams && Array.isArray(data.streams)) {
        items = data.streams; // Alternative stream structure
      }

      if (items.length === 0) {
        console.warn(`No items found for #${selectId}. Data:`, data);
      }

      items.forEach((item) => {
        const option = document.createElement("option");
        option.value = item[valueKey];
        option.textContent = item[textKey];
        select.appendChild(option);
      });
    } catch (error) {
      console.error(`Failed to load ${selectId}:`, error);
    }
  }

  // Custom render function for courses (for pagination)
  function renderCourseTable(data, startIndex) {
    if (!courseTable) return;

    courseTable.innerHTML = data
      .map(
        (c, i) => `
      <tr>
        <td>${startIndex + i + 1}</td>
        <td>${c.name || ""}</td>
        <td>${c.degree?.name || ""}</td>
        <td>${c.stream?.name || ""}</td>
        <td class="action-buttons">
          <button class="edit-state-btn" data-id="${
            c._id
          }"><i class="fa fa-edit"></i></button>
          <button class="delete-state-btn" data-id="${
            c._id
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
    if (courseTable) {
      // Remove existing listener to prevent duplicates
      courseTable.removeEventListener("click", handleTableClick);
      courseTable.addEventListener("click", handleTableClick);
    }
  }

  // Event handler function using event delegation
  function handleTableClick(event) {
    const target = event.target;

    // Handle edit button clicks
    if (target.closest(".edit-state-btn")) {
      const btn = target.closest(".edit-state-btn");
      const id = btn.getAttribute("data-id");
      const course = allCourses.find((c) => c._id === id);
      if (course) openEditCourseModal(course);
    }

    // Handle delete button clicks
    if (target.closest(".delete-state-btn")) {
      const btn = target.closest(".delete-state-btn");
      const id = btn.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this course?")) {
        deleteCourse(id);
      }
    }
  }

  // Fetch all courses
  async function fetchCourses() {
    try {
      const response = await fetch(`${baseUrl}/course/all`);
      if (!response.ok) throw new Error("Failed to fetch courses");
      const data = await response.json();
      allCourses = data.courses || [];
      initPaginationForCourses(); // Changed from renderCourseTable(allCourses)
    } catch (err) {
      courseTable.innerHTML =
        '<tr><td colspan="5" style="text-align:center; color:#ef4444;">Failed to load data</td></tr>';
    }
  }

  // Initialize pagination for courses
  function initPaginationForCourses() {
    // Create pagination container if it doesn't exist
    let paginationContainer = document.getElementById("pagination-container");
    if (!paginationContainer) {
      paginationContainer = document.createElement("div");
      paginationContainer.id = "pagination-container";
      paginationContainer.className = "pagination-wrapper";
      // Insert after the table container
      const tableContainer = courseTable.closest(".table-container");
      if (tableContainer) {
        tableContainer.parentNode.insertBefore(
          paginationContainer,
          tableContainer.nextSibling
        );
      } else {
        courseTable.parentNode.appendChild(paginationContainer);
      }
    }

    // Initialize pagination
    pagination = initPagination({
      container: courseTable,
      data: allCourses,
      itemsPerPage: 10,
      renderFunction: renderCourseTable,
      onPageChange: (currentData, currentPage) => {
        // Re-add event listeners after page change
        setTimeout(() => {
          addEventListeners();
        }, 50);
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
      // Populate dropdowns when form is shown
      populateDropdown(`${baseUrl}/stream/all`, "streamName", "_id", "name");
      populateDropdown(`${baseUrl}/degree/all`, "degreeType", "_id", "name");
    });
    showListBtn.addEventListener("click", function () {
      formDiv.style.display = "none";
      listDiv.style.display = "block";
      // Show both buttons
      showFormBtn.style.display = "inline-block";
      showListBtn.style.display = "inline-block";
    });
  }

  // Add course using common form handler
  handleForm(courseForm, async (formData) => {
    try {
      // Use FormData directly for file uploads
      await fetch(`${baseUrl}/course/add`, {
        method: "POST",
        body: formData, // Send FormData directly for file uploads
      });
      alert("Course added!");
      courseForm.reset();
      formDiv.style.display = "none";
      listDiv.style.display = "block";
      // Show both buttons
      showFormBtn.style.display = "inline-block";
      showListBtn.style.display = "inline-block";
      fetchCourses();
    } catch (error) {
      alert("Failed to submit course.");
    }
  });

  // Delete course using common API utility
  async function deleteCourse(id) {
    try {
      await fetch(`${baseUrl}/course/delete?id=${id}`, {
        method: "DELETE",
      });
      alert("Course deleted!");
      fetchCourses();
    } catch (error) {
      alert("Failed to delete course.");
    }
  }

  // Edit modal logic
  const editCourseModal = document.getElementById("editCourseModal");
  const closeEditCourseModalBtn = document.getElementById(
    "closeEditCourseModal"
  );
  const cancelEditCourseBtn = document.getElementById("cancelEditCourseBtn");
  function openEditCourseModal(course) {
    document.getElementById("editCourseId").value = course._id;
    document.getElementById("editCourseName").value = course.name;
    document.getElementById("editCourseFee").value = course.averageFee;
    document.getElementById("editCourseDescription").value = course.description;

    // Populate dropdowns for edit modal
    populateDropdown(
      `${baseUrl}/stream/all`,
      "editCourseStream",
      "_id",
      "name"
    );
    populateDropdown(
      `${baseUrl}/degree/all`,
      "editCourseDegree",
      "_id",
      "name"
    );

    // Set selected values after a short delay to ensure dropdowns are populated
    setTimeout(() => {
      if (course.stream?._id) {
        document.getElementById("editCourseStream").value = course.stream._id;
      }
      if (course.degree?._id) {
        document.getElementById("editCourseDegree").value = course.degree._id;
      }
    }, 100);

    if (editCourseModal) editCourseModal.style.display = "flex";
  }
  function closeEditCourseModal() {
    if (editCourseModal) editCourseModal.style.display = "none";
  }
  if (closeEditCourseModalBtn)
    closeEditCourseModalBtn.onclick = closeEditCourseModal;
  if (cancelEditCourseBtn) cancelEditCourseBtn.onclick = closeEditCourseModal;
  window.onclick = function (event) {
    if (event.target === editCourseModal) closeEditCourseModal();
  };

  // Edit form submit using common form handler
  const editCourseForm = document.getElementById("editCourseForm");
  handleForm(editCourseForm, async (formData) => {
    const id = document.getElementById("editCourseId").value;
    try {
      const courseData = {
        name: formData.get("name"),
        stream: formData.get("stream"),
        degree: formData.get("degree"),
        averageFee: formData.get("averageFee"),
        description: formData.get("description"),
      };

      await fetch(`${baseUrl}/course/update?id=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });
      alert("Course updated!");
      closeEditCourseModal();
      fetchCourses();
    } catch (error) {
      alert("Failed to update course.");
    }
  });

  // Initial population
  fetchCourses();
});
