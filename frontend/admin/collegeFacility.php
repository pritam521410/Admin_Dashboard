<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>College Facility Management</title>
  <link href="../style.css" rel="stylesheet" />
  <link href="../css/collegeFacility.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
  <?php include '../components/header.php'; ?>
  <?php include '../components/sidebar.php'; ?>
      <div class="main page-transition">
        <?php
        $pageTitle = 'College Facility Management';
        $breadcrumb = ['Home', 'Master Data', 'College Facility'];
        include '../components/breadcum.php';
        ?>
     
    <!-- College Facility management content (form/list) -->
    <div class="main-container">
      <!-- College Facility Form -->
      <div class="state-container" id="formDiv" style="display: none;">
        <h2 class="page-title">Add College Facility</h2>
        <form id="collegeFacilityForm" class="state-form" enctype="multipart/form-data">
          <div class="form-row">
            <div class="form-group" style="min-width: 200px;">
              <label>Facility Name:</label>
              <input type="text" name="name" required placeholder="Enter facility name" />
            </div>
            <div class="form-group" style="min-width: 200px;">
              <label>Photo:</label>
              <input type="file" name="logo" accept="image/*" />
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="button" onclick="document.getElementById('showListBtn').click()" class="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>

      <!-- College Facility List -->
      <div class="state-container" id="listDiv" style="display: block;">
        <div class="page-header">
          <h2 class="page-title">College Facility List</h2>
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
                <th>Facility Name</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="collegeFacilityTable"></tbody>
          </table>
        </div>
      </div>

      <!-- Edit College Facility Modal -->
      <div id="editCollegeFacilityModal" class="modal">
        <div class="modal-content">
          <span id="closeEditCollegeFacilityModal" class="modal-close">&times;</span>
          <h2 class="modal-title">Edit College Facility</h2>
          <form id="editCollegeFacilityForm" class="modal-form" enctype="multipart/form-data">
            <input type="hidden" name="id" id="editCollegeFacilityId" />
            <div class="form-group">
              <label>Facility Name:</label>
              <input type="text" name="name" id="editCollegeFacilityName" required />
            </div>
            <div class="form-group">
              <label>Photo:</label>
              <input type="file" name="logo" accept="image/*" />
            </div>
            <div class="modal-actions">
              <button type="submit" class="btn btn-primary">Save</button>
              <button type="button" id="cancelEditCollegeFacilityBtn" class="btn btn-secondary">Cancel</button>
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
    <script src="../js/collegeFacility.js"></script>
  </body>
</html> 