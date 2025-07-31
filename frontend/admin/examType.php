<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Exam Type Management</title>
  <link href="../style.css" rel="stylesheet" />
  <link href="../css/examType.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
  <?php include '../components/header.php'; ?>
  <?php include '../components/sidebar.php'; ?>
      <div class="main page-transition">
        <?php
        $pageTitle = 'Exam Type Management';
        $breadcrumb = ['Home', 'Master Data', 'Exam Type'];
        include '../components/breadcum.php';
        ?>
     
    <!-- Exam Type management content (form/list) -->
    <div class="main-container">
      <!-- Exam Type Form -->
      <div class="state-container" id="formDiv" style="display: none;">
        <h2 class="page-title">Add Exam Type</h2>
        <form id="examTypeForm" class="state-form" enctype="multipart/form-data">
          <div class="form-row">
            <div class="form-group" style="min-width: 200px;">
              <label>Short Name:</label>
              <input type="text" name="shortName" required placeholder="Enter short name" />
            </div>
            <div class="form-group" style="min-width: 200px;">
              <label>Full Name:</label>
              <input type="text" name="fullName" required placeholder="Enter full name" />
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="button" onclick="document.getElementById('showListBtn').click()" class="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>

      <!-- Exam Type List -->
      <div class="state-container" id="listDiv" style="display: block;">
        <div class="page-header">
          <h2 class="page-title">Exam Type List</h2>
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
                <th>Exam Type Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="examTypeTable"></tbody>
          </table>
        </div>
      </div>

      <!-- Edit Exam Type Modal -->
      <div id="editExamTypeModal" class="modal">
        <div class="modal-content">
          <span id="closeEditExamTypeModal" class="modal-close">&times;</span>
          <h2 class="modal-title">Edit Exam Type</h2>
          <form id="editExamTypeForm" class="modal-form" enctype="multipart/form-data">
            <input type="hidden" name="id" id="editExamTypeId" />
            <div class="form-group">
              <label>Short Name:</label>
              <input type="text" name="shortName" id="editExamTypeShortName" required />
            </div>
            <div class="form-group">
              <label>Full Name:</label>
              <input type="text" name="fullName" id="editExamTypeFullName" required />
            </div>
            <div class="modal-actions">
              <button type="submit" class="btn btn-primary">Save</button>
              <button type="button" id="cancelEditExamTypeBtn" class="btn btn-secondary">Cancel</button>
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
    <script src="../js/examType.js"></script>
  </body>
</html> 