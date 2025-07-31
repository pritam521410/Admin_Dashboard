document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = window.baseUrl || "http://localhost:4000/api";

  const streamForm = document.getElementById("streamForm");
  const formDiv = document.getElementById("formDiv");
  const listDiv = document.getElementById("listDiv");
  const streamTable = document.getElementById("streamTable");
  let allStreams = [];
  let pagination = null; // Added for pagination

  // Custom render function for streams (for pagination)
  function renderStreamTable(data, startIndex) {
    if (!streamTable) return;

    streamTable.innerHTML = data
      .map(
        (s, i) => `
      <tr>
        <td>${startIndex + i + 1}</td>
        <td>${s.name || ""}</td>
        <td class="image-cell">
          ${
            s.logo
              ? `<img src="http://localhost:4000/${s.logo}" alt="logo" class="stream-logo" style="width: 50px; height: 50px; object-fit: cover;" />`
              : "<span class='no-image'>N/A</span>"
          }
        </td>
        <td>${s.about || ""}</td>
        <td class="action-buttons">
          <button class="edit-state-btn" data-id="${
            s._id
          }"><i class="fa fa-edit"></i></button>
          <button class="delete-state-btn" data-id="${
            s._id
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
    if (streamTable) {
      // Remove existing listener to prevent duplicates
      streamTable.removeEventListener("click", handleTableClick);
      streamTable.addEventListener("click", handleTableClick);
    }
  }

  // Event handler function using event delegation
  function handleTableClick(event) {
    const target = event.target;

    // Handle edit button clicks
    if (target.closest(".edit-state-btn")) {
      const btn = target.closest(".edit-state-btn");
      const id = btn.getAttribute("data-id");
      const stream = allStreams.find((s) => s._id === id);
      if (stream) openEditStreamModal(stream);
    }

    // Handle delete button clicks
    if (target.closest(".delete-state-btn")) {
      const btn = target.closest(".delete-state-btn");
      const id = btn.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this stream?")) {
        deleteStream(id);
      }
    }
  }

  // Fetch all streams
  async function fetchStreams() {
    try {
      allStreams = await apiRequest(`${baseUrl}/stream/all-streams`);
      initPaginationForStreams(); // Changed from renderStreamTable(allStreams)
    } catch (err) {
      streamTable.innerHTML =
        '<tr><td colspan="5" style="text-align:center; color:#ef4444;">Failed to load data</td></tr>';
    }
  }

  // Initialize pagination for streams
  function initPaginationForStreams() {
    // Create pagination container if it doesn't exist
    let paginationContainer = document.getElementById("pagination-container");
    if (!paginationContainer) {
      paginationContainer = document.createElement("div");
      paginationContainer.id = "pagination-container";
      paginationContainer.className = "pagination-wrapper";
      // Insert after the table container
      const tableContainer = streamTable.closest(".table-container");
      if (tableContainer) {
        tableContainer.parentNode.insertBefore(
          paginationContainer,
          tableContainer.nextSibling
        );
      } else {
        streamTable.parentNode.appendChild(paginationContainer);
      }
    }

    // Initialize pagination
    pagination = initPagination({
      container: streamTable,
      data: allStreams,
      itemsPerPage: 10,
      renderFunction: renderStreamTable,
      onPageChange: (currentData, currentPage) => {
        // Re-add event listeners after page change
        setTimeout(() => {
          addEventListeners();
        }, 100);
      },
    });
  }

  // Button elements
  const showFormBtn = document.getElementById("showFormBtn");
  const showListBtn = document.getElementById("showListBtn");
  const cancelFormBtn = document.getElementById("cancelFormBtn");

  // Show/hide form and list with button toggle
  function showForm() {
    if (formDiv) formDiv.style.display = "block";
    if (listDiv) listDiv.style.display = "none";
    if (showFormBtn) showFormBtn.style.display = "none"; // Hide Add Record
    if (showListBtn) showListBtn.style.display = "inline-block"; // Show Record List
  }

  function showList() {
    if (formDiv) formDiv.style.display = "none";
    if (listDiv) listDiv.style.display = "block";
    if (showListBtn) showListBtn.style.display = "none"; // Hide Record List
    if (showFormBtn) showFormBtn.style.display = "inline-block"; // Show Add Record
  }

  // Show both buttons initially
  function showBothButtons() {
    if (showFormBtn) showFormBtn.style.display = "inline-block";
    if (showListBtn) showListBtn.style.display = "inline-block";
  }

  // Event listeners for buttons
  if (showFormBtn) showFormBtn.addEventListener("click", showForm);
  if (showListBtn) showListBtn.addEventListener("click", showList);
  if (cancelFormBtn) cancelFormBtn.addEventListener("click", showList); // Cancel button calls showList

  // Initial state
  showList(); // Show list by default
  showBothButtons(); // Show both buttons initially

  // Add stream using common form handler
  handleForm(streamForm, async (formData) => {
    try {
      await apiRequest(`${baseUrl}/stream/add-stream`, {
        method: "POST",
        body: formData,
      });
      alert("Stream added!");
      streamForm.reset();
      showList(); // Use showList function instead of manual display
      fetchStreams();
    } catch (error) {
      alert("Failed to submit stream.");
    }
  });

  // Delete stream using common API utility
  async function deleteStream(id) {
    try {
      await apiRequest(`${baseUrl}/stream/delete-stream/${id}`, {
        method: "DELETE",
      });
      alert("Stream deleted!");
      fetchStreams();
    } catch (error) {
      alert("Failed to delete stream.");
    }
  }

  // Edit modal logic
  const editStreamModal = document.getElementById("editStreamModal");
  const closeEditStreamModalBtn = document.getElementById(
    "closeEditStreamModal"
  );
  const cancelEditStreamBtn = document.getElementById("cancelEditStreamBtn");
  function openEditStreamModal(stream) {
    document.getElementById("editStreamId").value = stream._id;
    document.getElementById("editStreamName").value = stream.name;
    document.getElementById("editStreamAbout").value = stream.about;
    if (editStreamModal) editStreamModal.style.display = "flex";
  }
  function closeEditStreamModal() {
    if (editStreamModal) editStreamModal.style.display = "none";
  }
  if (closeEditStreamModalBtn)
    closeEditStreamModalBtn.onclick = closeEditStreamModal;
  if (cancelEditStreamBtn) cancelEditStreamBtn.onclick = closeEditStreamModal;
  window.onclick = function (event) {
    if (event.target === editStreamModal) closeEditStreamModal();
  };

  // Edit form submit using common form handler
  const editStreamForm = document.getElementById("editStreamForm");
  handleForm(editStreamForm, async (formData) => {
    const id = document.getElementById("editStreamId").value;
    try {
      await apiRequest(`${baseUrl}/stream/edit-stream/${id}`, {
        method: "PUT",
        body: formData,
      });
      alert("Stream updated!");
      closeEditStreamModal();
      fetchStreams();
    } catch (error) {
      alert("Failed to update stream.");
    }
  });

  // Initial population
  fetchStreams();
});
