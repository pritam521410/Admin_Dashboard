<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Affiliation Management</title>
  <link href="../style.css" rel="stylesheet" />
  <link href="../css/affilication.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
  <?php include '../components/header.php'; ?>
  <?php include '../components/sidebar.php'; ?>
      <div class="main page-transition">
        <?php
        $pageTitle = 'Affiliation Management';
        $breadcrumb = ['Home', 'Master Data', 'Affiliation'];
        include '../components/breadcum.php';
        ?>
     
    <!-- Affiliation management content (form/list) -->
    <div class="main-container">
      <!-- Affiliation Form -->
      <div class="state-container" id="formDiv" style="display: none;">
        <h2 class="page-title">Add Affiliation</h2>
        <form id="affiliationForm" class="state-form" enctype="multipart/form-data">
          <div class="form-row">
            <div class="form-group" style="min-width: 200px;">
              <label>Affiliation Name:</label>
              <input type="text" name="affliciationName" required placeholder="Enter affiliation name" />
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="button" onclick="document.getElementById('showListBtn').click()" class="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>

      <!-- Affiliation List -->
      <div class="state-container" id="listDiv" style="display: block;">
        <div class="page-header">
          <h2 class="page-title">Affiliation List</h2>
          <div class="top-btns">
            <button id="showFormBtn" class="main-btn">
              <span>➕</span> Add Record
            </button>
            <button id="showListBtn" class="main-btn success">
              <span>📋</span> Record List
            </button>
          </div>
        </div>
        <div class="table-container">
          <table class="state-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Affiliation Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="affiliationTable"></tbody>
          </table>
        </div>
      </div>

      <!-- Edit Affiliation Modal -->
      <div id="editAffiliationModal" class="modal">
        <div class="modal-content">
          <span id="closeEditAffiliationModal" class="modal-close">&times;</span>
          <h2 class="modal-title">Edit Affiliation</h2>
          <form id="editAffiliationForm" class="modal-form" enctype="multipart/form-data">
            <input type="hidden" name="id" id="editAffiliationId" />
            <div class="form-group">
              <label>Affiliation Name:</label>
              <input type="text" name="affliciationName" id="editAffiliationName" required />
            </div>
            <div class="modal-actions">
              <button type="submit" class="btn btn-primary">Save</button>
              <button type="button" id="cancelEditAffiliationBtn" class="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <?php include '../components/footer.php'; ?>
    </div>
    <script src="../js/sidebar.js"></script>
    <script src="../js/script.js"></script>
    <script src="../js/dashboard.js"></script>
    <script src="../js/common.js"></script>
    <script src="../js/pagination.js"></script>
    <script src="../js/affilication.js"></script>
  </body>
</html> 