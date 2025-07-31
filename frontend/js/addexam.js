document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = window.baseUrl || "http://localhost:4000/api";

  const addExamForm = document.getElementById("addExamForm");
  const formDiv = document.getElementById("examFormDiv");
  const listDiv = document.getElementById("examListDiv");
  const examTable = document.getElementById("examTable");
  let allExams = [];
  let pagination = null; // Added for pagination

  // Get dropdown elements
  const streamDropdown = document.querySelector('select[name="stream"]');
  const courseDropdown = document.querySelector('select[name="course"]');
  const examNameDropdown = document.querySelector('select[name="examName"]');
  const examLevelDropdown = document.querySelector('select[name="examLevel"]');
  const stateDropdown = document.querySelector('select[name="state"]');

  // Populate stream dropdown
  async function populateStreamDropdown(dropdown, selectedId) {
    try {
      console.log("Fetching streams...");
      const response = await apiRequest(`${baseUrl}/stream/all-streams`);
      const streams = response.data || response;
      console.log("Streams received:", streams);
      dropdown.innerHTML = '<option value="">-- Select Stream --</option>';
      streams.forEach((stream) => {
        const option = document.createElement("option");
        option.value = stream._id;
        option.textContent = stream.name;
        if (selectedId && stream._id === selectedId) option.selected = true;
        dropdown.appendChild(option);
      });
      console.log("Stream dropdown populated with", streams.length, "options");
    } catch (err) {
      console.error("Error loading streams:", err);
      dropdown.innerHTML = '<option value="">Failed to load streams</option>';
    }
  }

  // Populate course dropdown based on stream
  async function populateCourseDropdown(streamId, dropdown, selectedCourseId) {
    try {
      const response = await apiRequest(`${baseUrl}/course/all`);
      const courses = response.courses || response;
      dropdown.innerHTML = '<option value="">-- Select Course --</option>';

      // Filter courses by stream if streamId is provided
      const filteredCourses = streamId
        ? courses.filter(
            (course) =>
              course.stream === streamId ||
              (course.stream && course.stream._id === streamId)
          )
        : courses;

      filteredCourses.forEach((course) => {
        const option = document.createElement("option");
        option.value = course._id;
        option.textContent = course.name;
        if (selectedCourseId && course._id === selectedCourseId)
          option.selected = true;
        dropdown.appendChild(option);
      });
    } catch (err) {
      console.error("Error loading courses:", err);
      dropdown.innerHTML = '<option value="">Failed to load courses</option>';
    }
  }

  // Populate exam level dropdown
  async function populateExamLevelDropdown(dropdown, selectedId) {
    try {
      const examLevels = await apiRequest(
        `${baseUrl}/examlevel/all-examlevels`
      );
      dropdown.innerHTML = '<option value="">-- Select Exam Level --</option>';
      examLevels.forEach((level) => {
        const option = document.createElement("option");
        option.value = level._id;
        option.textContent = level.name;
        if (selectedId && level._id === selectedId) option.selected = true;
        dropdown.appendChild(option);
      });
    } catch (err) {
      console.error("Error loading exam levels:", err);
      dropdown.innerHTML =
        '<option value="">Failed to load exam levels</option>';
    }
  }

  // Populate state dropdown
  async function populateStateDropdown(dropdown, selectedId) {
    try {
      const states = await apiRequest(`${baseUrl}/state/all-states`);
      dropdown.innerHTML = '<option value="">-- Select State --</option>';
      states.forEach((state) => {
        const option = document.createElement("option");
        option.value = state._id;
        option.textContent = state.name;
        if (selectedId && state._id === selectedId) option.selected = true;
        dropdown.appendChild(option);
      });
    } catch (err) {
      console.error("Error loading states:", err);
      dropdown.innerHTML = '<option value="">Failed to load states</option>';
    }
  }

  // Populate exam name dropdown with exam types from master
  async function populateExamNameDropdown(dropdown, selectedName) {
    try {
      console.log("Fetching exam types for exam name dropdown...");
      const examTypes = await apiRequest(`${baseUrl}/exam-type/all-exam-type`);
      console.log("Exam types received:", examTypes);
      dropdown.innerHTML = '<option value="">-- Select Exam Name --</option>';
      examTypes.forEach((examType) => {
        const option = document.createElement("option");
        option.value =
          examType.examTypeName?.fullName ||
          examType.examTypeName?.shortName ||
          "Unknown";
        option.textContent =
          examType.examTypeName?.fullName ||
          examType.examTypeName?.shortName ||
          "Unknown";
        if (selectedName && option.value === selectedName)
          option.selected = true;
        dropdown.appendChild(option);
      });
      console.log(
        "Exam name dropdown populated with",
        examTypes.length,
        "options"
      );
    } catch (err) {
      console.error("Error loading exam types for exam name dropdown:", err);
      dropdown.innerHTML =
        '<option value="">Failed to load exam types</option>';
    }
  }

  // Custom render function for exams (for pagination)
  function renderExamTable(data, startIndex) {
    if (!examTable) return;

    examTable.innerHTML = data
      .map(
        (exam, i) => `
      <tr>
        <td>${startIndex + i + 1}</td>
        <td>${exam.stream?.name || exam.stream || "N/A"}</td>
        <td>${exam.course?.name || exam.course || "N/A"}</td>
        <td>${exam.examName || ""}</td>
        <td>${exam.title || ""}</td>
        <td class="action-buttons">
          <button class="edit-state-btn" data-id="${
            exam._id
          }"><i class="fa fa-edit"></i></button>
          <button class="delete-state-btn" data-id="${
            exam._id
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
    if (examTable) {
      // Remove existing listener to prevent duplicates
      examTable.removeEventListener("click", handleTableClick);
      examTable.addEventListener("click", handleTableClick);

      // Also add direct event listeners to buttons for better compatibility
      const editButtons = examTable.querySelectorAll(".edit-state-btn");
      const deleteButtons = examTable.querySelectorAll(".delete-state-btn");

      editButtons.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          const id = this.getAttribute("data-id");
          const exam = allExams.find((e) => e._id === id);
          if (exam) openEditExamModal(exam);
        });
      });

      deleteButtons.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          const id = this.getAttribute("data-id");
          if (confirm("Are you sure you want to delete this exam?")) {
            deleteExam(id);
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
      const exam = allExams.find((e) => e._id === id);
      if (exam) openEditExamModal(exam);
    }

    // Handle delete button clicks - check if clicked on button or icon inside button
    if (target.closest(".delete-state-btn")) {
      const btn = target.closest(".delete-state-btn");
      const id = btn.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this exam?")) {
        deleteExam(id);
      }
    }
  }

  // Fetch all exams
  async function fetchExams() {
    try {
      console.log("Fetching exams...");
      allExams = await apiRequest(`${baseUrl}/exam/all-exams`);
      console.log("Exams data received:", allExams);
      initPaginationForExams(); // Changed from renderExamTable(allExams)
    } catch (err) {
      console.error("Error fetching exams:", err);
      examTable.innerHTML =
        '<tr><td colspan="6" style="text-align:center; color:#ef4444;">Failed to load data</td></tr>';
    }
  }

  // Initialize pagination for exams
  function initPaginationForExams() {
    // Create pagination container if it doesn't exist
    let paginationContainer = document.getElementById("pagination-container");
    if (!paginationContainer) {
      paginationContainer = document.createElement("div");
      paginationContainer.id = "pagination-container";
      paginationContainer.className = "pagination-wrapper";
      // Insert after the table container
      const tableContainer = examTable.closest(".table-container");
      if (tableContainer) {
        tableContainer.parentNode.insertBefore(
          paginationContainer,
          tableContainer.nextSibling
        );
      } else {
        examTable.parentNode.appendChild(paginationContainer);
      }
    }

    // Initialize pagination
    pagination = initPagination({
      container: examTable,
      data: allExams,
      itemsPerPage: 10,
      renderFunction: renderExamTable,
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
  const cancelFormBtn = document.getElementById("cancelFormBtn");

  function showForm() {
    if (formDiv) formDiv.style.display = "block";
    if (listDiv) listDiv.style.display = "none";
    // Hide Add Record button, show Record List button
    if (showFormBtn) showFormBtn.style.display = "none";
    if (showListBtn) showListBtn.style.display = "inline-block";
  }

  function showList() {
    if (formDiv) formDiv.style.display = "none";
    if (listDiv) listDiv.style.display = "block";
    // Hide Record List button, show Add Record button
    if (showListBtn) showListBtn.style.display = "none";
    if (showFormBtn) showFormBtn.style.display = "inline-block";
  }

  function showBothButtons() {
    if (showFormBtn) showFormBtn.style.display = "inline-block";
    if (showListBtn) showListBtn.style.display = "inline-block";
  }

  if (showFormBtn) showFormBtn.addEventListener("click", showForm);
  if (showListBtn) showListBtn.addEventListener("click", showList);
  if (cancelFormBtn) cancelFormBtn.addEventListener("click", showList);

  // Show list by default on page load and show both buttons
  showList();
  showBothButtons();

  // Add exam using common form handler
  handleForm(addExamForm, async (formData) => {
    try {
      console.log("Form data being sent:", formData);
      const formDataObj = {};
      for (let [key, value] of formData.entries()) {
        formDataObj[key] = value;
      }
      console.log("Form data object:", formDataObj);
      console.log("Form data entries:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      // Validate required fields
      const stream = formData.get("stream");
      const examName = formData.get("examName");
      const examLevel = formData.get("examLevel");
      const state = formData.get("state");

      if (!stream || !examName || !examLevel || !state) {
        alert(
          "Please fill in all required fields: Stream, Exam Name, Exam Level, and State"
        );
        return;
      }

      // Log the selected stream and course IDs
      const streamSelect = document.querySelector('select[name="stream"]');
      const courseSelect = document.querySelector('select[name="course"]');
      console.log("Selected stream ID:", streamSelect?.value);
      console.log("Selected course ID:", courseSelect?.value);
      console.log(
        "Selected stream text:",
        streamSelect?.options[streamSelect?.selectedIndex]?.text
      );
      console.log(
        "Selected course text:",
        courseSelect?.options[courseSelect?.selectedIndex]?.text
      );

      // Ensure stream and course IDs are properly set in form data
      if (streamSelect?.value) {
        formData.set("stream", streamSelect.value);
      }
      if (courseSelect?.value) {
        formData.set("course", courseSelect.value);
      }

      await apiRequest(`${baseUrl}/exam/add-exam`, {
        method: "POST",
        body: formData,
      });
      alert("Exam added!");
      addExamForm.reset();
      showList();
      fetchExams();
    } catch (err) {
      console.error("Error adding exam:", err);
      alert("Failed to save.");
    }
  });

  // Delete exam using common API utility
  async function deleteExam(id) {
    try {
      await apiRequest(`${baseUrl}/exam/delete-exam/${id}`, {
        method: "DELETE",
      });
      alert("Exam deleted!");
      fetchExams();
    } catch (err) {
      alert("Failed to delete.");
    }
  }

  // Edit modal logic
  const editExamModal = document.getElementById("editExamModal");
  const closeEditExamModalBtn = document.getElementById("closeEditExamModal");
  const cancelEditExamBtn = document.getElementById("cancelEditExamBtn");
  let editExamId = null;

  function openEditExamModal(exam) {
    editExamId = exam._id;
    document.getElementById("editDepartment").value =
      exam.stream?.name || exam.stream || "";
    document.getElementById("editCourse").value =
      exam.course?.name || exam.course || "";
    document.getElementById("editExamName").value = exam.examName || "";
    document.getElementById("editExamTitle").value = exam.title || "";
    if (editExamModal) editExamModal.style.display = "flex";
  }
  function closeEditExamModal() {
    if (editExamModal) editExamModal.style.display = "none";
    editExamId = null;
  }
  if (closeEditExamModalBtn) closeEditExamModalBtn.onclick = closeEditExamModal;
  if (cancelEditExamBtn) cancelEditExamBtn.onclick = closeEditExamModal;
  window.onclick = function (event) {
    if (event.target === editExamModal) closeEditExamModal();
  };

  // Edit form submit using common form handler
  const editExamForm = document.getElementById("editExamForm");
  handleForm(editExamForm, async (formData) => {
    if (!editExamId) return;
    try {
      // For edit, we need to find the stream and course IDs based on the names
      const streamName = document.getElementById("editDepartment").value;
      const courseName = document.getElementById("editCourse").value;

      // Get stream ID from name
      let streamId = null;
      if (streamName) {
        const response = await apiRequest(`${baseUrl}/stream/all-streams`);
        const streams = response.data || response;
        const stream = streams.find((s) => s.name === streamName);
        streamId = stream?._id;
      }

      // Get course ID from name
      let courseId = null;
      if (courseName) {
        const response = await apiRequest(`${baseUrl}/course/all`);
        const courses = response.courses || response;
        const course = courses.find((c) => c.name === courseName);
        courseId = course?._id;
      }

      await apiRequest(`${baseUrl}/exam/edit-exam/${editExamId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stream: streamId,
          course: courseId,
          examName: document.getElementById("editExamName").value,
          title: document.getElementById("editExamTitle").value,
        }),
      });
      alert("Exam updated!");
      closeEditExamModal();
      fetchExams();
    } catch (err) {
      console.error("Error updating exam:", err);
      alert("Failed to update.");
    }
  });

  // On stream change, update course dropdown
  if (streamDropdown) {
    streamDropdown.addEventListener("change", function () {
      populateCourseDropdown(streamDropdown.value, courseDropdown);
    });
  }

  // Initialize all dropdowns
  async function initializeDropdowns() {
    console.log("Initializing dropdowns...");
    console.log("Stream dropdown element:", streamDropdown);
    console.log("Course dropdown element:", courseDropdown);
    console.log("Exam name dropdown element:", examNameDropdown);
    console.log("Exam level dropdown element:", examLevelDropdown);
    console.log("State dropdown element:", stateDropdown);

    try {
      if (streamDropdown) {
        console.log("Populating stream dropdown...");
        await populateStreamDropdown(streamDropdown);
      }
      if (courseDropdown) {
        console.log("Populating course dropdown...");
        await populateCourseDropdown(null, courseDropdown);
      }
      if (examNameDropdown) {
        console.log("Populating exam name dropdown...");
        await populateExamNameDropdown(examNameDropdown);
      }
      if (examLevelDropdown) {
        console.log("Populating exam level dropdown...");
        await populateExamLevelDropdown(examLevelDropdown);
      }
      if (stateDropdown) {
        console.log("Populating state dropdown...");
        await populateStateDropdown(stateDropdown);
      }
      console.log("All dropdowns initialized successfully");
    } catch (error) {
      console.error("Error initializing dropdowns:", error);
    }
  }

  // Initialize dropdowns and fetch exams
  initializeDropdowns();
  fetchExams();
});
