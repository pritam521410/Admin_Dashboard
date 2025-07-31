document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = window.baseUrl || "http://localhost:4000/api";

  const rankingForm = document.getElementById("rankingForm");
  const formDiv = document.getElementById("formDiv");
  const listDiv = document.getElementById("listDiv");
  const rankingTable = document.getElementById("rankingTable");
  let allRankings = [];
  let pagination = null; // Added for pagination

  // Custom render function for rankings (for pagination)
  function renderRankingTable(data, startIndex) {
    if (!rankingTable) return;

    rankingTable.innerHTML = data
      .map(
        (r, i) => `
      <tr>
        <td>${startIndex + i + 1}</td>
        <td>${r.name || ""}</td>
        <td>${r.RankValue || ""}</td>
        <td class="action-buttons">
          <button class="edit-state-btn" data-id="${
            r._id
          }"><i class="fa fa-edit"></i></button>
          <button class="delete-state-btn" data-id="${
            r._id
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
    if (rankingTable) {
      // Remove existing listener to prevent duplicates
      rankingTable.removeEventListener("click", handleTableClick);
      rankingTable.addEventListener("click", handleTableClick);

      // Also add direct event listeners to buttons for better compatibility
      const editButtons = rankingTable.querySelectorAll(".edit-state-btn");
      const deleteButtons = rankingTable.querySelectorAll(".delete-state-btn");

      editButtons.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          const id = this.getAttribute("data-id");
          const ranking = allRankings.find((r) => r._id === id);
          if (ranking) openEditRankingModal(ranking);
        });
      });

      deleteButtons.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          const id = this.getAttribute("data-id");
          if (confirm("Are you sure you want to delete this ranking?")) {
            deleteRanking(id);
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
      const ranking = allRankings.find((r) => r._id === id);
      if (ranking) openEditRankingModal(ranking);
    }

    // Handle delete button clicks - check if clicked on button or icon inside button
    if (target.closest(".delete-state-btn")) {
      const btn = target.closest(".delete-state-btn");
      const id = btn.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this ranking?")) {
        deleteRanking(id);
      }
    }
  }

  // Fetch all rankings
  async function fetchRankings() {
    try {
      allRankings = await apiRequest(`${baseUrl}/ranking/all-ranking`);
      initPaginationForRankings(); // Changed from renderRankingTable(allRankings)
    } catch (err) {
      rankingTable.innerHTML =
        '<tr><td colspan="4" style="text-align:center; color:#ef4444;">Failed to load data</td></tr>';
    }
  }

  // Initialize pagination for rankings
  function initPaginationForRankings() {
    // Create pagination container if it doesn't exist
    let paginationContainer = document.getElementById("pagination-container");
    if (!paginationContainer) {
      paginationContainer = document.createElement("div");
      paginationContainer.id = "pagination-container";
      paginationContainer.className = "pagination-wrapper";
      // Insert after the table container
      const tableContainer = rankingTable.closest(".table-container");
      if (tableContainer) {
        tableContainer.parentNode.insertBefore(
          paginationContainer,
          tableContainer.nextSibling
        );
      } else {
        rankingTable.parentNode.appendChild(paginationContainer);
      }
    }

    // Initialize pagination
    pagination = initPagination({
      container: rankingTable,
      data: allRankings,
      itemsPerPage: 10,
      renderFunction: renderRankingTable,
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

  // Add ranking using common form handler
  handleForm(rankingForm, async (formData) => {
    try {
      const name = formData.get("name");
      const RankValue = formData.get("RankValue");
      if (!name || !RankValue) {
        alert("Please enter both body name and rank value.");
        return;
      }
      await apiRequest(`${baseUrl}/ranking/create-ranking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, RankValue }),
      });
      alert("Ranking added!");
      rankingForm.reset();
      formDiv.style.display = "none";
      listDiv.style.display = "block";
      // Show both buttons
      showFormBtn.style.display = "inline-block";
      showListBtn.style.display = "inline-block";
      fetchRankings();
    } catch (error) {
      alert("Failed to submit ranking.");
    }
  });

  // Delete ranking using common API utility
  async function deleteRanking(id) {
    try {
      await apiRequest(`${baseUrl}/ranking/delete-ranking/${id}`, {
        method: "DELETE",
      });
      alert("Ranking deleted!");
      fetchRankings();
    } catch (error) {
      alert("Failed to delete ranking.");
    }
  }

  // Edit modal logic
  const editRankingModal = document.getElementById("editRankingModal");
  const closeEditRankingModalBtn = document.getElementById(
    "closeEditRankingModal"
  );
  const cancelEditRankingBtn = document.getElementById("cancelEditRankingBtn");
  function openEditRankingModal(ranking) {
    document.getElementById("editRankingId").value = ranking._id;
    document.getElementById("editRankingName").value = ranking.name;
    document.getElementById("editRankingValue").value = ranking.RankValue;
    if (editRankingModal) editRankingModal.style.display = "flex";
  }
  function closeEditRankingModal() {
    if (editRankingModal) editRankingModal.style.display = "none";
  }
  if (closeEditRankingModalBtn)
    closeEditRankingModalBtn.onclick = closeEditRankingModal;
  if (cancelEditRankingBtn)
    cancelEditRankingBtn.onclick = closeEditRankingModal;
  window.onclick = function (event) {
    if (event.target === editRankingModal) closeEditRankingModal();
  };

  // Edit form submit using common form handler
  const editRankingForm = document.getElementById("editRankingForm");
  handleForm(editRankingForm, async (formData) => {
    const id = document.getElementById("editRankingId").value;
    try {
      const name = formData.get("name");
      const RankValue = formData.get("RankValue");
      if (!name || !RankValue) {
        alert("Please enter both body name and rank value.");
        return;
      }
      await apiRequest(`${baseUrl}/ranking/update-ranking/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, RankValue }),
      });
      alert("Ranking updated!");
      closeEditRankingModal();
      fetchRankings();
    } catch (error) {
      alert("Failed to update ranking.");
    }
  });

  // Initial population
  fetchRankings();
});
