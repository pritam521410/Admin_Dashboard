<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Approved Through Management</title>
  <link href="../style.css" rel="stylesheet" />
  <link href="../css/approvedThrough.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
  <?php include '../components/header.php'; ?>
  <?php include '../components/sidebar.php'; ?>
      <div class="main page-transition">
        <?php
        $pageTitle = 'Approved Through Management';
        $breadcrumb = ['Home', 'Master Data', 'Approved Through'];
        include '../components/breadcum.php';
        ?>
     
    <!-- Approved Through management content (form/list) -->
    <div class="main-container">
      <!-- Approved Through Form -->
      <div class="state-container" id="formDiv" style="display: none;">
        <h2 class="page-title">Add Approved Through</h2>
        <form id="approvedThroughForm" class="state-form" enctype="multipart/form-data">
          <div class="form-row">
            <div class="form-group" style="min-width: 200px;">
              <label>Approved Through Name:</label>
              <input type="text" name="approvesThroughName" required placeholder="Enter approved through name" />
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="button" onclick="document.getElementById('showListBtn').click()" class="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>

      <!-- Approved Through List -->
      <div class="state-container" id="listDiv" style="display: block;">
        <div class="page-header">
          <h2 class="page-title">Approved Through List</h2>
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
                <th>Approved Through Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="approvedThroughTable"></tbody>
          </table>
        </div>
      </div>

      <!-- Edit Approved Through Modal -->
      <div id="editApprovedThroughModal" class="modal">
        <div class="modal-content">
          <span id="closeEditApprovedThroughModal" class="modal-close">&times;</span>
          <h2 class="modal-title">Edit Approved Through</h2>
          <form id="editApprovedThroughForm" class="modal-form" enctype="multipart/form-data">
            <input type="hidden" name="id" id="editApprovedThroughId" />
            <div class="form-group">
              <label>Approved Through Name:</label>
              <input type="text" name="approvesThroughName" id="editApprovedThroughName" required />
            </div>
            <div class="modal-actions">
              <button type="submit" class="btn btn-primary">Save</button>
              <button type="button" id="cancelEditApprovedThroughBtn" class="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <?php include '../components/footer.php'; ?>
    </div>
    <script src="../js/script.js"></script>
    <script src="../js/dashboard.js"></script>
    <script src="../js/common.js"></script>
    <script src="../js/pagination.js"></script>
    <script src="../js/approvedThrough.js"></script>
  </body>
</html> 